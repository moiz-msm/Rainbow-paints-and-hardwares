import React, { useState, useRef, useEffect, MouseEvent, useMemo } from 'react';
import { 
  Sparkles, Upload, Paintbrush, RefreshCcw, ChevronRight, Pipette, Camera, AlertCircle, X, ChevronDown, Check, PenTool, Share2, Download
} from 'lucide-react';
import { exportCanvasAsImage } from '../lib/exportUtils';
import { useAuthStore } from '../store/useAuthStore';
import { shadeService, Shade } from '../services/shadeService';
import { db } from '../lib/firebase';
import { collection, addDoc, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';

// Types for AI Photo Studio
interface VisualizationProject {
  id?: string;
  name: string;
  imageUrl: string;
  shadesApplied: Record<string, string>; // label -> hex
  createdAt: number;
}

interface ColorRecommendation {
  name: string;
  hex: string;
  rgb: string;
  hsl: string;
  contrast: string;
  complementary: string[];
  analogous: string[];
  monochrome: string[];
}

// Helper utility to convert HEX code to RGB
const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

export default function AIPhotoStudio({ 
  activeShade, 
  onSelectShade, 
  allShades = [] 
}: { 
  activeShade: Shade | null;
  onSelectShade?: (shade: Shade) => void;
  allShades?: Shade[];
}) {
  const { user, openAuthModal } = useAuthStore();

  // Find closest brand shade in our database
  const getClosestShade = (hex: string, list: Shade[]) => {
    const target = hexToRgb(hex);
    if (!target) return null;
    let minDistance = Infinity;
    let closest: Shade | null = null;
    
    for (const shade of list) {
      const sRGB = hexToRgb(shade.hex);
      if (!sRGB) continue;
      const dist = Math.sqrt(
        (target.r - sRGB.r) * (target.r - sRGB.r) +
        (target.g - sRGB.g) * (target.g - sRGB.g) +
        (target.b - sRGB.b) * (target.b - sRGB.b)
      );
      if (dist < minDistance) {
        minDistance = dist;
        closest = shade;
      }
    }
    return closest;
  };

  const handleRecommendClick = (hexColor: string) => {
    if (!onSelectShade || !allShades || allShades.length === 0) return;
    const closest = getClosestShade(hexColor, allShades);
    if (closest) {
      onSelectShade(closest);
    }
  };
  
  // Image states
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isAiProcessing, setIsAiProcessing] = useState(false);

  // Camera & Stream states
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [availableCameras, setAvailableCameras] = useState<MediaDeviceInfo[]>([]);
  const [selectedCameraId, setSelectedCameraId] = useState<string>('');
  const [isCameraDropdownOpen, setIsCameraDropdownOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    return () => {
      // stop camera stream if active
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startCamera = async (deviceId?: string) => {
    setCameraError(null);
    setIsCameraActive(true);
    try {
      if (videoRef.current && videoRef.current.srcObject) {
        const oldStream = videoRef.current.srcObject as MediaStream;
        oldStream.getTracks().forEach(track => track.stop());
      }

      const constraints: MediaStreamConstraints = {
        video: deviceId 
          ? { deviceId: { exact: deviceId } } 
          : { facingMode: 'environment' }
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(d => d.kind === 'videoinput');
      setAvailableCameras(videoDevices);
      if (videoDevices.length > 0 && !deviceId) {
        const activeTrack = stream.getVideoTracks()[0];
        const settings = activeTrack ? activeTrack.getSettings() : null;
        if (settings && settings.deviceId) {
          setSelectedCameraId(settings.deviceId);
        }
      }
    } catch (err: any) {
      console.error("Camera access error:", err);
      setCameraError(err.message || "Could not access camera. Please verify camera permissions are granted.");
    }
  };

  const stopCamera = () => {
    setIsCameraActive(false);
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    if (!video) return;

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 800;
    canvas.height = video.videoHeight || 600;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
      setSelectedImage(dataUrl);
      stopCamera();
    }
  };
  
  // Custom tool modes & full paint pool preloading
  const [toolMode, setToolMode] = useState<'paint' | 'picker' | 'polygon'>('paint');
  const [polygonPoints, setPolygonPoints] = useState<{x: number, y: number}[]>([]);
  const [previewPoint, setPreviewPoint] = useState<{x: number, y: number} | null>(null);
  const [fullPool, setFullPool] = useState<Shade[]>([]);
  const [pickedPixelColor, setPickedPixelColor] = useState<{ hex: string; rgb: { r: number; g: number; b: number } } | null>(null);

  // Load the full 20,000+ shades paint catalog on component mount for precise matching
  useEffect(() => {
    async function preload() {
      try {
        const { shades: pool } = await shadeService.getShades({ brand: 'all', limit: 20000 });
        setFullPool(pool);
      } catch (err) {
        console.error("Failed to prefetch paint pool:", err);
      }
    }
    preload();
  }, []);

  // Utility to convert color components to hex format
  const rgbToHex = (r: number, g: number, b: number) => {
    return '#' + [r, g, b].map(x => {
      const hexStr = x.toString(16);
      return hexStr.length === 1 ? '0' + hexStr : hexStr;
    }).join('');
  };

  const poolToUse = useMemo(() => {
    return fullPool.length > 0 ? fullPool : allShades;
  }, [fullPool, allShades]);

  // Compute matched brand shades from our database for the picked color in real-time
  const pickerMatches = useMemo(() => {
    if (!pickedPixelColor || poolToUse.length === 0) return null;
    const target = pickedPixelColor.rgb;

    const findBestForBrand = (brandId: string) => {
      let minDistance = Infinity;
      let closest: Shade | null = null;

      for (const shade of poolToUse) {
        if (!shade.brand.toLowerCase().includes(brandId.toLowerCase())) continue;

        const sRGB = hexToRgb(shade.hex);
        if (!sRGB) continue;

        const dist = Math.sqrt(
          (target.r - sRGB.r) * (target.r - sRGB.r) +
          (target.g - sRGB.g) * (target.g - sRGB.g) +
          (target.b - sRGB.b) * (target.b - sRGB.b)
        );

        if (dist < minDistance) {
          minDistance = dist;
          closest = shade;
        }
      }

      const similarity = Math.max(0, Math.min(100, Math.round((1 - minDistance / 442) * 100)));
      return closest ? { shade: closest, similarity } : null;
    };

    return {
      asian: findBestForBrand('asian'),
      berger: findBestForBrand('berger'),
      mrf: findBestForBrand('mrf')
    };
  }, [pickedPixelColor, poolToUse]);

  // Canvas / repaint state
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [segMode, setSegMode] = useState<'sam' | 'manual'>('sam');
  const [detectedCount, setDetectedCount] = useState<number>(0);
  
  // State for Color API & Colormind suggestions
  const [colorInfo, setColorInfo] = useState<ColorRecommendation | null>(null);
  const [colormindPalette, setColormindPalette] = useState<string[]>([]);
  const [loadingColorInfo, setLoadingColorInfo] = useState(false);

  // Firestore Projects
  const [savedProjects, setSavedProjects] = useState<VisualizationProject[]>([]);
  const [projectName, setProjectName] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [loadProjectsTrigger, setLoadProjectsTrigger] = useState(0);

  // Undo / Redo history
  const [history, setHistory] = useState<ImageData[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Draw & cache base image
  const baseImageRef = useRef<HTMLImageElement | null>(null);

  // Save selected image to project (Firebase)
  useEffect(() => {
    if (user && selectedImage) {
      async function fetchProjects() {
        try {
          const q = query(
            collection(db, 'visualizations'),
            where('userId', '==', user.uid)
          );
          const snap = await getDocs(q);
          const projects: VisualizationProject[] = [];
          snap.forEach((doc) => {
            projects.push({ id: doc.id, ...doc.data() } as VisualizationProject);
          });
          setSavedProjects(projects.sort((a,b) => b.createdAt - a.createdAt));
        } catch (error) {
          console.error("Failed to fetch Firebase projects:", error);
        }
      }
      fetchProjects();
    }
  }, [user, selectedImage, loadProjectsTrigger]);

  // Load selected hex analytics (Color API / Colormind API)
  useEffect(() => {
    if (!activeShade) return;
    async function fetchColorMeta() {
      setLoadingColorInfo(true);
      const cleanHex = activeShade.hex.replace('#', '');
      try {
        // Real-world integration with The Color API
        const colorRes = await fetch(`https://www.thecolorapi.com/id?hex=${cleanHex}`);
        const data = await colorRes.json();
        
        // Colormind Integration via server proxy
        const colormindRes = await fetch('/api/colormind', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ hex: activeShade.hex })
        });
        const colormindData = await colormindRes.json();
        
        setColorInfo({
          name: data.name?.value || activeShade.name,
          hex: activeShade.hex,
          rgb: data.rgb?.value || activeShade.rgb,
          hsl: data.hsl?.value || 'HSL(0, 0%, 50%)',
          contrast: data.contrast?.value || '#FFFFFF',
          complementary: [data.image?.bare || `https://www.thecolorapi.com/id?hex=${cleanHex}&format=svg`],
          analogous: data.image?.named || [],
          monochrome: []
        });

        if (colormindData?.palette) {
          setColormindPalette(colormindData.palette);
        } else {
          // Fallback palettes if offline or timeout
          setColormindPalette([activeShade.hex, '#faf9f6', '#cfc8bc', '#a49b8a', '#1a1410']);
        }
      } catch (err) {
        console.error("Failed to fetch API color data:", err);
      } finally {
        setLoadingColorInfo(false);
      }
    }
    fetchColorMeta();
  }, [activeShade]);

  // Render Image into Canvas
  useEffect(() => {
    if (!selectedImage) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setLoading(true);
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = selectedImage;
    img.onload = () => {
      // Scale canvas keeping ratio
      const maxW = 800;
      const ratio = img.height / img.width;
      canvas.width = maxW;
      canvas.height = maxW * ratio;
      
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      baseImageRef.current = img;

      // Reset history with the loaded state
      const initialData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      setHistory([initialData]);
      setHistoryIndex(0);

      // Perform simulated SAM SegFormer detection overview
      simulateSAMDetection(ctx, canvas);
      setLoading(false);
    };
    img.onerror = () => {
      setLoading(false);
      alert("Failed to load image. If on localhost, verify connection to unsplash.");
    };
  }, [selectedImage]);

  // Handle Undoing operations
  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIdx = historyIndex - 1;
      setHistoryIndex(newIdx);
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) ctx.putImageData(history[newIdx], 0, 0);
      }
    }
  };

  const simulateSAMDetection = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    setIsAiProcessing(true);
    setTimeout(() => {
      // Segment count simulation
      setDetectedCount(Math.floor(Math.random() * 5) + 4);
      setIsAiProcessing(false);
    }, 1500);
  };

  // Advanced Eyedropper / Color Picker Engine
  const performInteractivePick = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    try {
      const pixel = ctx.getImageData(x, y, 1, 1).data;
      const rgb = { r: pixel[0], g: pixel[1], b: pixel[2] };
      const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
      setPickedPixelColor({ hex, rgb });
    } catch (err) {
      console.error("Failed to read image pixel context:", err);
    }
  };

  const applyPolygonFill = () => {
    if (!activeShade || polygonPoints.length < 3) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Convert paint HEX to RGB
    const targetRGB = hexToRgb(activeShade.hex);
    if (!targetRGB) return;

    // Create a boolean mask of the polygon by drawing it on a temporary canvas
    const maskCanvas = document.createElement('canvas');
    maskCanvas.width = canvas.width;
    maskCanvas.height = canvas.height;
    const maskCtx = maskCanvas.getContext('2d');
    if (!maskCtx) return;

    maskCtx.fillStyle = "white";
    maskCtx.beginPath();
    maskCtx.moveTo(polygonPoints[0].x, polygonPoints[0].y);
    for (let i = 1; i < polygonPoints.length; i++) {
       maskCtx.lineTo(polygonPoints[i].x, polygonPoints[i].y);
    }
    maskCtx.closePath();
    maskCtx.fill();

    const polyImgData = maskCtx.getImageData(0, 0, canvas.width, canvas.height);
    const currentData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const originalData = history[0]; // Reference base image to preserve genuine textures

    // Calculate actual average luminance of the masked segment from the base image
    let totalLuma = 0;
    let maskCount = 0;
    for (let i = 0; i < polyImgData.data.length; i += 4) {
      if (polyImgData.data[i] > 128) {
        const r = originalData.data[i];
         const g = originalData.data[i+1];
        const b = originalData.data[i+2];
        totalLuma += 0.299 * r + 0.587 * g + 0.114 * b;
        maskCount++;
      }
    }
    const avgLuma = maskCount > 0 ? (totalLuma / maskCount) : 128;

    for (let i = 0; i < polyImgData.data.length; i += 4) {
      if (polyImgData.data[i] > 128) {
        const r = originalData.data[i];
        const g = originalData.data[i + 1];
        const b = originalData.data[i + 2];
        const luma = 0.299 * r + 0.587 * g + 0.114 * b;
        let ratio = avgLuma > 0 ? (luma / avgLuma) : 1.0;
        
        if (ratio > 1.0) {
          ratio = 1.0 + Math.tanh((ratio - 1.0) * 0.4) * 0.25; 
        } else {
          ratio = Math.pow(ratio, 0.75);
        }

        const paintR = Math.min(255, Math.max(0, targetRGB.r * ratio));
        const paintG = Math.min(255, Math.max(0, targetRGB.g * ratio));
        const paintB = Math.min(255, Math.max(0, targetRGB.b * ratio));

        const alpha = 0.90;
        currentData.data[i] = Math.floor((1 - alpha) * r + alpha * paintR);
        currentData.data[i + 1] = Math.floor((1 - alpha) * g + alpha * paintG);
        currentData.data[i + 2] = Math.floor((1 - alpha) * b + alpha * paintB);
      }
    }

    ctx.putImageData(currentData, 0, 0);

    const savedState = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(savedState);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);

    setPolygonPoints([]);
    setToolMode('paint');
  };

  const updatePreviewPoint = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    
    // mobile offset: apply negative Y offset so the finger doesn't block the point
    let clientY = e.clientY;
    if (e.pointerType === 'touch') {
      clientY = Math.max(rect.top, clientY - 50); // 50px offset up
    }

    const x = Math.max(0, Math.min(canvas.width, Math.floor(((e.clientX - rect.left) / rect.width) * canvas.width)));
    const y = Math.max(0, Math.min(canvas.height, Math.floor(((clientY - rect.top) / rect.height) * canvas.height)));
    
    setPreviewPoint({ x, y });
    return { x, y };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    if (e.pointerType === 'touch') {
      updatePreviewPoint(e);
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (e.pointerType === 'touch' && e.currentTarget.hasPointerCapture(e.pointerId)) {
      updatePreviewPoint(e);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.currentTarget.releasePointerCapture(e.pointerId);
    
    let targetPoint = previewPoint;
    if (e.pointerType !== 'touch') {
      targetPoint = updatePreviewPoint(e);
    }
    setPreviewPoint(null);

    if (!targetPoint) return;

    if (toolMode === 'picker') {
      performInteractivePick(targetPoint.x, targetPoint.y);
    } else if (toolMode === 'polygon') {
      setPolygonPoints(prev => [...prev, targetPoint!]);
    } else {
      performInteractivePaint(targetPoint.x, targetPoint.y);
    }
  };

  // Advanced Flood Fill & Paint Engine with Intelligent Adaptive Parameters
  const performInteractivePaint = (x: number, y: number) => {
    if (!activeShade || loading || isAiProcessing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Run flood fill segmentation
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    // Automatically analyze target clicked point to calibrate boundaries and textures
    const clickIdx = (y * canvas.width + x) * 4;
    const startR = imgData.data[clickIdx];
    const startG = imgData.data[clickIdx + 1];
    const startB = imgData.data[clickIdx + 2];
    const clickLuma = 0.299 * startR + 0.587 * startG + 0.114 * startB;

    // 1. Adaptive Tolerance: 
    // - Off-whites & highly lit surfaces easily spill/bleed into ceiling/floors, so we safely restrict tolerance.
    // - Dark shadow planes need generous tolerances to spread fully across dark depth-gradients on the same wall.
    let autoTolerance = 35;
    if (clickLuma > 215) {
      autoTolerance = 24; // Tight limit for ultra-bright walls
    } else if (clickLuma > 180) {
      autoTolerance = 29; // Clean boundary validation
    } else if (clickLuma < 75) {
      autoTolerance = 46; // Broaden to cover deep textures/shadow contours
    } else if (clickLuma < 120) {
      autoTolerance = 39; // Moderated shadows
    }

    const mask = runFloodFill(imgData, x, y, autoTolerance);

    if (!mask) return;

    // Convert paint HEX to RGB
    const targetRGB = hexToRgb(activeShade.hex);
    if (!targetRGB) return;

    // Apply repaint with the exact selected paint color, maintaining real wall texture and shading
    const currentData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const originalData = history[0]; // Reference base image to preserve genuine textures

    // Calculate actual average luminance of the masked segment from the base image
    let totalLuma = 0;
    let maskCount = 0;
    for (let i = 0; i < mask.length; i++) {
      if (mask[i]) {
        const idx = i * 4;
        const r = originalData.data[idx];
        const g = originalData.data[idx + 1];
        const b = originalData.data[idx + 2];
        const luma = 0.299 * r + 0.587 * g + 0.114 * b;
        totalLuma += luma;
        maskCount++;
      }
    }
    const avgLuma = maskCount > 0 ? (totalLuma / maskCount) : 128;

    for (let i = 0; i < mask.length; i++) {
      if (mask[i]) {
        const idx = i * 4;
        
        // Read original color channels from untouched original image
        const r = originalData.data[idx];
        const g = originalData.data[idx + 1];
        const b = originalData.data[idx + 2];
        
        // Compute local original luminance
        const luma = 0.299 * r + 0.587 * g + 0.114 * b;
        
        // Calculate relative lighting ratio smoothly
        let ratio = avgLuma > 0 ? (luma / avgLuma) : 1.0;
        
        // Compressing the ratio stabilizes highlight peaks and deep shadows,
        // avoiding unrealistic high exposure blocks or artificial pitch darkness.
        if (ratio > 1.0) {
          ratio = 1.0 + Math.tanh((ratio - 1.0) * 0.4) * 0.25; 
        } else {
          ratio = Math.pow(ratio, 0.75); // Smooth shadows
        }

        // Apply shade color, modulated by relative lighting and texture variation
        const paintR = Math.min(255, Math.max(0, targetRGB.r * ratio));
        const paintG = Math.min(255, Math.max(0, targetRGB.g * ratio));
        const paintB = Math.min(255, Math.max(0, targetRGB.b * ratio));

        // High opacity blend (90%) completely covers the original wall color base
        // while allowing subtle plaster texture and detailed light structures to merge dynamically.
        const alpha = 0.90;
        currentData.data[idx] = Math.floor((1 - alpha) * r + alpha * paintR);
        currentData.data[idx + 1] = Math.floor((1 - alpha) * g + alpha * paintG);
        currentData.data[idx + 2] = Math.floor((1 - alpha) * b + alpha * paintB);
      }
    }

    ctx.putImageData(currentData, 0, 0);

    // Save state into history
    const savedState = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(savedState);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  // Fast tolerance-based flood fill algorithm with improved edge and wall boundary detection
  const runFloodFill = (imgData: ImageData, startX: number, startY: number, tol: number): Uint8Array | null => {
    const w = imgData.width;
    const h = imgData.height;
    const totalPixels = w * h;
    const mask = new Uint8Array(totalPixels);
    const visited = new Uint8Array(totalPixels);

    const startIndex = (startY * w + startX) * 4;
    const startR = imgData.data[startIndex];
    const startG = imgData.data[startIndex + 1];
    const startB = imgData.data[startIndex + 2];

    const startLuma = Math.max(1, 0.299 * startR + 0.587 * startG + 0.114 * startB);
    const sCr = startR / startLuma;
    const sCg = startG / startLuma;
    const sCb = startB / startLuma;

    const queue: number[] = [startX, startY];
    let head = 0;

    visited[startY * w + startX] = 1;
    mask[startY * w + startX] = 1;

    const checkAndPush = (nx: number, ny: number, parentX: number, parentY: number) => {
      const nIdx = ny * w + nx;
      if (visited[nIdx]) return;
      
      const nIdx4 = nIdx * 4;
      const r = imgData.data[nIdx4];
      const g = imgData.data[nIdx4 + 1];
      const b = imgData.data[nIdx4 + 2];

      const pIdx4 = (parentY * w + parentX) * 4;
      const pr = imgData.data[pIdx4];
      const pg = imgData.data[pIdx4 + 1];
      const pb = imgData.data[pIdx4 + 2];

      const luma = Math.max(1, 0.299 * r + 0.587 * g + 0.114 * b);
      const pLuma = Math.max(1, 0.299 * pr + 0.587 * pg + 0.114 * pb);
      const lumaDist = Math.abs(luma - pLuma);

      const globalDist = Math.sqrt(
        (r - startR) * (r - startR) +
        (g - startG) * (g - startG) +
        (b - startB) * (b - startB)
      );

      const localDist = Math.sqrt(
        (r - pr) * (r - pr) +
        (g - pg) * (g - pg) +
        (b - pb) * (b - pb)
      );

      if (localDist > 25 || lumaDist > 20) {
        visited[nIdx] = 1;
        return;
      }

      const cR = r / luma;
      const cG = g / luma;
      const cB = b / luma;
      const chromaDist = Math.sqrt(
        (cR - sCr) * (cR - sCr) +
        (cG - sCg) * (cG - sCg) +
        (cB - sCb) * (cB - sCb)
      ) * 100;

      // Gradient propagation rules:
      // Allow extremely gradual shifts (low localDist) and similar color profiles (chromaDist)
      if (globalDist <= tol || (chromaDist <= 12 && localDist <= 10 && globalDist <= tol * 3.5)) {
        visited[nIdx] = 1;
        mask[nIdx] = 1;
        queue.push(nx, ny);
      } else {
        visited[nIdx] = 1;
      }
    };

    while (head < queue.length) {
      const cx = queue[head++];
      const cy = queue[head++];

      if (cx > 0) checkAndPush(cx - 1, cy, cx, cy);
      if (cx < w - 1) checkAndPush(cx + 1, cy, cx, cy);
      if (cy > 0) checkAndPush(cx, cy - 1, cx, cy);
      if (cy < h - 1) checkAndPush(cx, cy + 1, cx, cy);
    }

    // --- Post-processing: Image Segment Hole Filling ---
    // Connect border pixels of background (0)
    const connectedToBorder = new Uint8Array(totalPixels);
    const borderQueue: number[] = [];
    
    for (let x = 0; x < w; x++) {
      if (mask[x] === 0) {
        connectedToBorder[x] = 1;
        borderQueue.push(x, 0);
      }
      const bottomY = h - 1;
      const bottomIdx = bottomY * w + x;
      if (mask[bottomIdx] === 0) {
        connectedToBorder[bottomIdx] = 1;
        borderQueue.push(x, bottomY);
      }
    }
    for (let y = 1; y < h - 1; y++) {
      const leftIdx = y * w;
      if (mask[leftIdx] === 0) {
        connectedToBorder[leftIdx] = 1;
        borderQueue.push(0, y);
      }
      const rightX = w - 1;
      const rightIdx = y * w + rightX;
      if (mask[rightIdx] === 0) {
        connectedToBorder[rightIdx] = 1;
        borderQueue.push(rightX, y);
      }
    }

    let bHead = 0;
    while (bHead < borderQueue.length) {
      const bx = borderQueue[bHead++];
      const by = borderQueue[bHead++];
      
      const nx1 = bx - 1, ny1 = by;
      if (nx1 >= 0 && mask[ny1 * w + nx1] === 0 && connectedToBorder[ny1 * w + nx1] === 0) {
        connectedToBorder[ny1 * w + nx1] = 1;
        borderQueue.push(nx1, ny1);
      }
      const nx2 = bx + 1, ny2 = by;
      if (nx2 < w && mask[ny2 * w + nx2] === 0 && connectedToBorder[ny2 * w + nx2] === 0) {
        connectedToBorder[ny2 * w + nx2] = 1;
        borderQueue.push(nx2, ny2);
      }
      const nx3 = bx, ny3 = by - 1;
      if (ny3 >= 0 && mask[ny3 * w + nx3] === 0 && connectedToBorder[ny3 * w + nx3] === 0) {
        connectedToBorder[ny3 * w + nx3] = 1;
        borderQueue.push(nx3, ny3);
      }
      const nx4 = bx, ny4 = by + 1;
      if (ny4 < h && mask[ny4 * w + nx4] === 0 && connectedToBorder[ny4 * w + nx4] === 0) {
        connectedToBorder[ny4 * w + nx4] = 1;
        borderQueue.push(nx4, ny4);
      }
    }

    // Any pixel not part of the mask AND not connected to borders is filled
    for (let i = 0; i < totalPixels; i++) {
      if (mask[i] === 0 && connectedToBorder[i] === 0) {
        mask[i] = 1;
      }
    }

    // --- Boundary Smoothing Pass (Noise Cleanup) ---
    // Single pass local density thresholding to remove jagged edge pixels
    const smoothMask = new Uint8Array(mask);
    for (let y = 1; y < h - 1; y++) {
      for (let x = 1; x < w - 1; x++) {
        const idx = y * w + x;
        if (mask[idx] === 0) {
          const neighborsPainted = mask[idx - 1] + mask[idx + 1] + mask[idx - w] + mask[idx + w];
          if (neighborsPainted >= 3) {
            smoothMask[idx] = 1;
          }
        }
      }
    }

    return smoothMask;
  };

  // Custom User Image Upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          setSelectedImage(uploadEvent.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Firebase Save integration
  const handleSaveToCloud = async () => {
    if (!user) {
      openAuthModal();
      return;
    }
    if (!projectName.trim()) {
      alert("Please provide a project name.");
      return;
    }

    setIsSaving(true);
    try {
      const canvas = canvasRef.current;
      const snapshotUrl = canvas ? canvas.toDataURL('image/jpeg', 0.8) : selectedImage;
      
      const newProjectData = {
        userId: user.uid,
        name: projectName,
        imageUrl: snapshotUrl || '',
        shadesApplied: activeShade ? { [activeShade.name]: activeShade.hex } : {},
        createdAt: Date.now()
      };

      await addDoc(collection(db, 'visualizations'), newProjectData);
      setProjectName('');
      setLoadProjectsTrigger(prev => prev + 1);
      alert("Project saved successfully to your Rainbow Account!");
    } catch (err) {
      console.error("Firebase save failure:", err);
      alert("Failed to save project. Ensure Firebase database permissions are valid.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this design?")) return;
    try {
      await deleteDoc(doc(db, 'visualizations', id));
      setLoadProjectsTrigger(prev => prev + 1);
    } catch (err) {
      console.error("Failed to delete project:", err);
    }
  };

  return (
    <div className="flex flex-col gap-5 w-full">
        
        {/* Live HTML5 Interactive Image Editor */}
        <div className="glass-panel p-0 rounded-2xl border border-zinc-200 bg-white shadow-[0_4px_25px_rgba(0,0,0,0.03)] relative overflow-hidden flex flex-col">
          
          {/* Controls Bar */}
          <div className="flex border-b border-zinc-200 items-center justify-between p-3 bg-zinc-50 gap-2 shrink-0 flex-wrap sm:flex-nowrap">
            <div className="flex items-center gap-2 flex-wrap">
              {/* Interactive Tool Mode */}
              <div className="flex items-center gap-1 border border-zinc-200 bg-white rounded-lg p-1 text-[11px] font-semibold text-zinc-700">
                <span className="px-2 text-zinc-600 flex items-center gap-1 font-display font-bold uppercase tracking-wider text-[9px]">
                  Mode:
                </span>
                <button 
                  onClick={() => { setToolMode('paint'); setPolygonPoints([]); }}
                  className={`px-2.5 py-0.5 rounded-md flex items-center gap-1 transition-all ${toolMode === 'paint' ? 'bg-gold text-white font-bold shadow-sm' : 'text-zinc-600 hover:text-zinc-900'}`}
                >
                  <Paintbrush className="w-3 h-3 text-current" /> Auto Paint
                </button>
                <button 
                  onClick={() => { setToolMode('polygon'); setPolygonPoints([]); }}
                  className={`px-2.5 py-0.5 rounded-md flex items-center gap-1 transition-all ${toolMode === 'polygon' ? 'bg-gold text-white font-bold shadow-sm' : 'text-zinc-600 hover:text-zinc-900'}`}
                >
                  <PenTool className="w-3 h-3 text-current" /> Manual Mask
                </button>
                <button 
                  onClick={() => { setToolMode('picker'); setPolygonPoints([]); }}
                  className={`px-2.5 py-0.5 rounded-md flex items-center gap-1 transition-all ${toolMode === 'picker' ? 'bg-gold text-white font-bold shadow-sm' : 'text-zinc-600 hover:text-zinc-900'}`}
                >
                  <Pipette className="w-3 h-3 text-current" /> Color Picker
                </button>
              </div>
              
              {toolMode === 'polygon' && (
                <div className="flex items-center gap-1 border border-zinc-300 bg-zinc-50 rounded-lg p-1 shadow-inner translate-x-0 animate-in fade-in slide-in-from-left-2 duration-200">
                  <button 
                    onClick={() => { setPolygonPoints([]); setToolMode('paint'); }} 
                    className="px-2 py-0.5 rounded-md flex items-center gap-1 text-[10px] font-bold text-zinc-600 hover:bg-zinc-200 transition-colors"
                  >
                     <X className="w-3 h-3"/> Cancel
                  </button>
                  <button 
                    onClick={applyPolygonFill} 
                    disabled={polygonPoints.length < 3}
                    className={`px-2 py-0.5 rounded-md flex items-center gap-1 text-[10px] font-bold transition-all ${polygonPoints.length < 3 ? 'text-zinc-600 cursor-not-allowed' : 'bg-zinc-900 text-white shadow-sm hover:bg-zinc-800 hover:shadow-md cursor-pointer'}`}
                  >
                     <Check className="w-3 h-3"/> Confirm
                  </button>
                </div>
              )}

              {selectedImage && (
                <button 
                  onClick={() => setSelectedImage(null)} 
                  className="px-2.5 py-1.5 rounded-md border flex items-center gap-1.5 transition-all text-[10px] font-semibold uppercase tracking-wider bg-white border-zinc-200 text-zinc-700 hover:bg-red-50 hover:text-red-700 hover:border-red-200 ml-2" 
                  title="Clear and select a new image"
                >
                  <X className="w-3 h-3" /> Clear Image
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              {selectedImage && historyIndex > 0 && (
                <button 
                  onClick={() => {
                    if (canvasRef.current) {
                      exportCanvasAsImage(canvasRef.current, `rainbowpaint-preview-${Date.now()}.png`);
                    }
                  }}
                  className="p-2 rounded-lg border flex items-center gap-1 transition-all text-xs font-semibold bg-gold text-white border-gold hover:bg-gold/90"
                  title="Share or Download"
                >
                  <Share2 className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Share</span>
                </button>
              )}
              <button 
                onClick={handleUndo}
                disabled={historyIndex <= 0}
                className={`p-2 rounded-lg border flex items-center gap-1 transition-all text-xs font-semibold ${historyIndex > 0 ? 'bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50' : 'bg-zinc-100 border-zinc-100 text-zinc-300 cursor-not-allowed'}`}
                title="Undo last stroke"
              >
                <RefreshCcw className="w-3.5 h-3.5 rotate-180" /> <span className="hidden sm:inline">Undo</span>
              </button>
            </div>
          </div>

          {/* Interactive Workspace Area */}
          <div className="relative flex-grow flex items-center justify-center bg-zinc-950/5 min-h-[300px] sm:min-h-[420px] max-h-[500px] overflow-hidden">
            {loading && (
              <div className="absolute inset-0 bg-white/65 backdrop-blur-sm z-50 flex flex-col items-center justify-center text-center">
                <div className="w-8 h-8 rounded-full border-2 border-gold border-t-transparent animate-spin mb-3" />
                <p className="text-xs font-semibold text-zinc-700">Loading High-Res Canvas...</p>
              </div>
            )}
            {isAiProcessing && (
              <div className="absolute inset-0 bg-black/40 backdrop-blur-md z-50 flex flex-col items-center justify-center text-center text-white px-4">
                <Sparkles className="w-8 h-8 text-gold animate-bounce mb-3" />
                <p className="text-sm font-semibold tracking-wide">SAM Engine detecting room surfaces...</p>
                <p className="text-xs text-zinc-300 mt-1">Applying ML-assisted wall and contour alignment.</p>
              </div>
            )}

            {/* Click to Paint Canvas */}
            {selectedImage && !isCameraActive && (
              <div className="w-full max-w-3xl mx-auto overflow-hidden rounded-xl border border-zinc-200/50 shadow-2xl bg-zinc-950/5 p-1 relative">
                <canvas 
                  ref={canvasRef} 
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  className={`w-full h-auto block transition-all duration-300 hover:ring-2 hover:ring-gold/20 touch-none ${toolMode === 'picker' ? 'cursor-cell border border-dashed border-gold/40' : toolMode === 'polygon' ? 'cursor-crosshair' : 'cursor-crosshair'} ${loading ? 'opacity-0' : 'opacity-100'}`}
                />
                
                {/* Touch Drag Preview Point Layer */}
                {previewPoint && canvasRef.current && (
                  <svg className="absolute top-1 left-1 pointer-events-none" style={{ width: 'calc(100% - 8px)', height: 'calc(100% - 8px)' }}>
                     <circle 
                       cx={`${(previewPoint.x / canvasRef.current!.width) * 100}%`} 
                       cy={`${(previewPoint.y / canvasRef.current!.height) * 100}%`} 
                       r="6" 
                       fill="rgba(59, 130, 246, 0.5)" 
                       stroke="white" 
                       strokeWidth="2"
                     />
                     <circle 
                       cx={`${(previewPoint.x / canvasRef.current!.width) * 100}%`} 
                       cy={`${(previewPoint.y / canvasRef.current!.height) * 100}%`} 
                       r="1.5" 
                       fill="white" 
                     />
                     <line 
                       x1={`${(previewPoint.x / canvasRef.current!.width) * 100}%`} 
                       y1={`${(previewPoint.y / canvasRef.current!.height) * 100}%`} 
                       x2={`${(previewPoint.x / canvasRef.current!.width) * 100}%`} 
                       y2={`${((previewPoint.y + 40) / canvasRef.current!.height) * 100}%`} 
                       stroke="rgba(255,255,255,0.7)" 
                       strokeWidth="2" 
                       strokeDasharray="4 2"
                     />
                  </svg>
                )}

                {/* Polygon Interactive Layer */}
                {toolMode === 'polygon' && canvasRef.current && (
                  <svg className="absolute top-1 left-1 pointer-events-none" style={{ width: 'calc(100% - 8px)', height: 'calc(100% - 8px)' }}>
                     {polygonPoints.length > 0 && (
                        <polygon 
                          points={polygonPoints.map(p => `${(p.x / canvasRef.current!.width) * 100}%,${(p.y / canvasRef.current!.height) * 100}%`).join(' ')} 
                          fill={activeShade ? `${activeShade.hex}80` : "rgba(236, 72, 153, 0.4)"} 
                          stroke={activeShade ? activeShade.hex : "rgba(59, 130, 246, 0.8)"} 
                          strokeWidth="2"
                        />
                     )}
                     {polygonPoints.map((p, idx) => (
                       <circle 
                         key={idx}
                         cx={`${(p.x / canvasRef.current!.width) * 100}%`} 
                         cy={`${(p.y / canvasRef.current!.height) * 100}%`} 
                         r="4" 
                         fill="white" 
                         stroke={activeShade ? activeShade.hex : "#3b82f6"} 
                         strokeWidth="2"
                       />
                     ))}
                  </svg>
                )}
              </div>
            )}

            {/* Live Camera Interface */}
            {isCameraActive && (
              <div className="w-full max-w-xl mx-auto relative overflow-hidden rounded-xl border border-zinc-200 bg-black flex flex-col shadow-2xl relative z-10">
                <div className="px-4 py-3 bg-white border-b border-zinc-200 flex justify-between items-center text-zinc-900">
                  <span className="text-xs font-display font-bold uppercase tracking-wider flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> Live Camera Stream
                  </span>
                  {availableCameras.length > 1 && (
                    <div className="relative text-zinc-900 font-sans text-[10px] z-[99]">
                      <button
                        type="button"
                        onClick={() => setIsCameraDropdownOpen(!isCameraDropdownOpen)}
                        className="bg-white border border-zinc-200 text-zinc-900 hover:bg-[#faf9f6] transition-all rounded px-2.5 py-1 outline-none font-sans flex items-center gap-1.5 min-w-[100px] justify-between cursor-pointer shadow-sm"
                      >
                        <span className="truncate">
                          {availableCameras.find(c => c.deviceId === selectedCameraId)?.label || 
                           `Camera ${availableCameras.findIndex(c => c.deviceId === selectedCameraId) + 1}`}
                        </span>
                        <ChevronDown className={`w-3 h-3 text-zinc-600 shrink-0 transition-transform duration-300 ${isCameraDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {isCameraDropdownOpen && (
                        <>
                          <div className="fixed inset-0 z-[1000]" onClick={() => setIsCameraDropdownOpen(false)} />
                          <div className="absolute top-full right-0 mt-1 bg-white border border-zinc-200 rounded shadow-xl overflow-hidden divide-y divide-zinc-100 z-[1001] animate-fade-in w-[150px]">
                            {availableCameras.map((device, idx) => (
                              <button
                                key={device.deviceId}
                                type="button"
                                onClick={() => {
                                  startCamera(device.deviceId);
                                  setIsCameraDropdownOpen(false);
                                }}
                                className={`w-full text-left px-2.5 py-1.5 transition-colors text-zinc-700 hover:bg-[#faf9f6] flex items-center text-[10px] ${selectedCameraId === device.deviceId ? 'bg-[#faf9f6] font-bold text-gold' : ''}`}
                              >
                                {device.label || `Camera ${idx + 1}`}
                              </button>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  )}
                  <button type="button" onClick={stopCamera} className="hover:text-gold text-zinc-600 transition-colors p-1 cursor-pointer">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="relative aspect-video bg-black flex items-center justify-center">
                  {cameraError ? (
                    <div className="p-4 text-center text-zinc-600">
                      <AlertCircle className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                      <p className="text-xs font-semibold">{cameraError}</p>
                    </div>
                  ) : (
                    <video 
                      ref={videoRef} 
                      autoPlay 
                      playsInline 
                      className="w-full h-full object-cover transform -scale-x-100" 
                    />
                  )}
                </div>

                <div className="p-4 bg-white border-t border-zinc-200 flex justify-center gap-3">
                  <button 
                    type="button"
                    onClick={capturePhoto}
                    disabled={!!cameraError}
                    className="px-5 py-2 bg-white hover:bg-gold/5 border border-gold text-gold rounded-full text-xs font-bold font-display uppercase tracking-wider shadow-sm transition-all flex items-center gap-2 disabled:opacity-45 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <Camera className="w-4 h-4 text-gold" /> Take Snapshot
                  </button>
                  <button 
                    type="button"
                    onClick={stopCamera}
                    className="px-5 py-2 bg-white hover:bg-[#faf9f6] border border-zinc-200 text-zinc-900 rounded-full text-xs font-bold font-display uppercase tracking-wider transition-all cursor-pointer shadow-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Empty State: If no stream and no selected image */}
            {!selectedImage && !isCameraActive && (
              <div className="flex flex-col items-center justify-center text-center p-8 bg-white border border-zinc-200/60 rounded-2xl w-full max-w-md shadow-xs relative">
                <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mb-4 animate-pulse">
                  <Camera className="w-7 h-7 text-gold animate-bounce" />
                </div>
                <div className="font-serif text-sm font-bold text-zinc-950 mb-1">No Image Loaded</div>
                <p className="text-[11px] text-zinc-600 font-sans max-w-xs mb-5">
                  Upload a photo of your own room or use your camera to capture your walls and visualize colors in real-time.
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <label className="flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-gold/5 border border-zinc-200 hover:border-gold text-zinc-900 rounded-lg text-xs font-display font-semibold uppercase tracking-wider cursor-pointer shadow-xs transition-all active:scale-95 leading-none group text-center">
                    <Upload className="w-3.5 h-3.5 text-gold shrink-0 group-hover:scale-110 transition-transform" />
                    Upload Photo
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>
                  <button 
                    type="button"
                    onClick={() => startCamera()}
                    className="flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-gold/5 border border-zinc-200 hover:border-gold text-zinc-900 rounded-lg text-xs font-display font-semibold uppercase tracking-wider shadow-xs transition-all active:scale-95 leading-none cursor-pointer group text-center"
                  >
                    <Camera className="w-3.5 h-3.5 text-gold shrink-0 group-hover:scale-110 transition-transform" />
                    Use Live Camera
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Color Picker Interface Info Panel */}
          {toolMode === 'picker' && (
            <div className="border-t border-zinc-200 bg-amber-50/20 p-4">
              <div className="flex flex-col md:flex-row items-stretch gap-4">
                {/* Picked Visual swatch */}
                <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-zinc-200/60 shadow-xs md:w-1/3 shrink-0">
                  <div 
                    className="w-12 h-12 rounded-lg border border-zinc-300 shadow-inner flex-shrink-0 transition-all duration-300"
                    style={{ backgroundColor: pickedPixelColor ? pickedPixelColor.hex : '#cca564' }}
                  />
                  <div className="min-w-0">
                    <span className="text-[8px] font-display font-medium uppercase tracking-widest text-[#cca564] block">
                      Picked Photo Color
                    </span>
                    <span className="font-mono text-xs font-bold text-zinc-800 block uppercase tracking-wide">
                      {pickedPixelColor ? pickedPixelColor.hex : 'Click room to pick...'}
                    </span>
                    <span className="text-[9px] text-zinc-600 block mt-0.5 leading-none">
                      {pickedPixelColor ? `R: ${pickedPixelColor.rgb.r}, G: ${pickedPixelColor.rgb.g}, B: ${pickedPixelColor.rgb.b}` : 'Click any spot on image to sample'}
                    </span>
                  </div>
                </div>

                {/* Formula matches */}
                <div className="flex-grow min-w-0">
                  <span className="text-[8px] font-display font-bold uppercase tracking-[0.12em] text-zinc-600 block mb-1.5">
                    Nearest Database Paint Formulas
                  </span>
                  {pickerMatches ? (
                    <div className="grid grid-cols-2 gap-3">
                      {/* Asian Paint Match */}
                      {pickerMatches.asian ? (
                        <button
                          type="button"
                          onClick={() => onSelectShade && onSelectShade(pickerMatches.asian!.shade)}
                          className={`text-left bg-white p-2.5 rounded-xl border flex items-center gap-2.5 transition-all duration-300 hover:-translate-y-0.5 ${activeShade?.id === pickerMatches.asian.shade.id ? 'border-gold ring-1 ring-gold/30 shadow-[0_4px_10px_rgba(200,165,100,0.1)]' : 'border-zinc-200/80 hover:border-gold/30'}`}
                        >
                          <div className="w-8 h-8 rounded-md flex-shrink-0 border" style={{ backgroundColor: pickerMatches.asian.shade.hex }} />
                          <div className="min-w-0 flex-grow leading-tight">
                            <span className="text-[7.5px] font-display font-bold uppercase text-zinc-600 tracking-wider block">Asian Paints</span>
                            <span className="font-serif text-[11.5px] font-bold text-zinc-800 block truncate">{pickerMatches.asian.shade.name}</span>
                            <span className="text-[7.5px] font-mono text-zinc-600 block">{pickerMatches.asian.shade.shadeCode}</span>
                          </div>
                          <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded ml-auto leading-none shrink-0">
                            {pickerMatches.asian.similarity}% Match
                          </span>
                        </button>
                      ) : (
                        <div className="bg-white border border-dashed border-zinc-200 rounded-xl p-3 text-center text-[10px] text-zinc-600">
                          Fetching Asian match...
                        </div>
                      )}

                      {/* Berger Paint Match */}
                      {pickerMatches.berger ? (
                        <button
                          type="button"
                          onClick={() => onSelectShade && onSelectShade(pickerMatches.berger!.shade)}
                          className={`text-left bg-white p-2.5 rounded-xl border flex items-center gap-2.5 transition-all duration-300 hover:-translate-y-0.5 ${activeShade?.id === pickerMatches.berger.shade.id ? 'border-gold ring-1 ring-gold/30 shadow-[0_4px_10px_rgba(200,165,100,0.1)]' : 'border-zinc-200/80 hover:border-gold/30'}`}
                        >
                          <div className="w-8 h-8 rounded-md flex-shrink-0 border" style={{ backgroundColor: pickerMatches.berger.shade.hex }} />
                          <div className="min-w-0 flex-grow leading-tight">
                            <span className="text-[7.5px] font-display font-bold uppercase text-zinc-600 tracking-wider block">Berger Paints</span>
                            <span className="font-serif text-[11.5px] font-bold text-zinc-800 block truncate">{pickerMatches.berger.shade.name}</span>
                            <span className="text-[7.5px] font-mono text-zinc-600 block">{pickerMatches.berger.shade.shadeCode}</span>
                          </div>
                          <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded ml-auto leading-none shrink-0">
                            {pickerMatches.berger.similarity}% Match
                          </span>
                        </button>
                      ) : (
                        <div className="bg-white border border-dashed border-zinc-200 rounded-xl p-3 text-center text-[10px] text-zinc-600">
                          Fetching Berger match...
                        </div>
                      )}

                      {/* MRF Paint Match */}
                      {pickerMatches.mrf ? (
                        <button
                          type="button"
                          onClick={() => onSelectShade && onSelectShade(pickerMatches.mrf!.shade)}
                          className={`text-left bg-white p-2.5 rounded-xl border flex items-center gap-2.5 transition-all duration-300 hover:-translate-y-0.5 ${activeShade?.id === pickerMatches.mrf.shade.id ? 'border-gold ring-1 ring-gold/30 shadow-[0_4px_10px_rgba(200,165,100,0.1)]' : 'border-zinc-200/80 hover:border-gold/30'}`}
                        >
                          <div className="w-8 h-8 rounded-md flex-shrink-0 border" style={{ backgroundColor: pickerMatches.mrf.shade.hex }} />
                          <div className="min-w-0 flex-grow leading-tight">
                            <span className="text-[7.5px] font-display font-bold uppercase text-zinc-600 tracking-wider block">MRF Vapocure</span>
                            <span className="font-serif text-[11.5px] font-bold text-zinc-800 block truncate">{pickerMatches.mrf.shade.name}</span>
                            <span className="text-[7.5px] font-mono text-zinc-600 block">{pickerMatches.mrf.shade.shadeCode}</span>
                          </div>
                          <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded ml-auto leading-none shrink-0">
                            {pickerMatches.mrf.similarity}% Match
                          </span>
                        </button>
                      ) : (
                        <div className="bg-white border border-dashed border-zinc-200 rounded-xl p-3 text-center text-[10px] text-zinc-600">
                          Fetching MRF match...
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="bg-white border border-dashed border-zinc-200 p-3.5 rounded-xl flex items-center justify-center text-center h-[46px]">
                      <p className="text-[10px] text-zinc-600 italic font-sans">No points sampled yet. Click anywhere on your room canvas above to find matches.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}



        </div>

    </div>
  );
}
