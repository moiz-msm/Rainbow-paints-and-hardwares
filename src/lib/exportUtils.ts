import html2canvas from 'html2canvas';

export const exportElementAsImage = async (elementId: string, filename: string = 'rainbowpaint-export.png') => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      console.error(`exportElementAsImage failed: Element with id ${elementId} not found`);
      return;
    }

    const canvas = await html2canvas(element, { 
      useCORS: true, 
      allowTaint: true, 
      scale: 2,
      backgroundColor: '#ffffff'
    });
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Determine responsive font size
      const fontSize = Math.max(16, Math.floor(canvas.width * 0.03));
      
      // Draw watermark background rect for readability
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      const text = 'rainbowpaint.in';
      ctx.font = `bold ${fontSize}px sans-serif`;
      const textMetrics = ctx.measureText(text);
      
      const paddingX = fontSize * 0.8;
      const paddingY = fontSize * 0.4;
      const rectWidth = textMetrics.width + (paddingX * 2);
      const rectHeight = fontSize + (paddingY * 2);
      
      const xPos = canvas.width - rectWidth - 20;
      const yPos = canvas.height - rectHeight - 20;
      
      ctx.roundRect ? ctx.roundRect(xPos, yPos, rectWidth, rectHeight, 8) : ctx.rect(xPos, yPos, rectWidth, rectHeight);
      ctx.fill();

      // Draw watermark text
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, xPos + (rectWidth / 2), yPos + (rectHeight / 2) + 2);
    }

    const dataUrl = canvas.toDataURL('image/png', 0.95);
    return await downloadOrShare(dataUrl, filename);
  } catch (error) {
    console.error("Failed to export image:", error);
    alert("Sorry, we couldn't create an image to share. Please try downloading instead.");
  }
};

export const exportCanvasAsImage = async (sourceCanvas: HTMLCanvasElement, filename: string = 'rainbowpaint-export.png') => {
  const canvas = document.createElement('canvas');
  canvas.width = sourceCanvas.width;
  canvas.height = sourceCanvas.height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  ctx.drawImage(sourceCanvas, 0, 0);

  // Determine responsive font size
  const fontSize = Math.max(16, Math.floor(canvas.width * 0.03));
  
  // Draw watermark background rect for readability
  ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
  const text = 'rainbowpaint.in';
  ctx.font = `bold ${fontSize}px sans-serif`;
  const textMetrics = ctx.measureText(text);
  
  const paddingX = fontSize * 0.8;
  const paddingY = fontSize * 0.4;
  const rectWidth = textMetrics.width + (paddingX * 2);
  const rectHeight = fontSize + (paddingY * 2);
  
  const xPos = canvas.width - rectWidth - 20;
  const yPos = canvas.height - rectHeight - 20;
  
  ctx.roundRect ? ctx.roundRect(xPos, yPos, rectWidth, rectHeight, 8) : ctx.rect(xPos, yPos, rectWidth, rectHeight);
  ctx.fill();

  // Draw watermark text
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, xPos + (rectWidth / 2), yPos + (rectHeight / 2) + 2);

  const dataUrl = canvas.toDataURL('image/png', 0.95);
  return downloadOrShare(dataUrl, filename);
};

const downloadOrShare = async (dataUrl: string, filename: string) => {
  if (navigator.share && navigator.canShare) {
    try {
      const res = await fetch(dataUrl);
      const blob = await res.blob();
      const file = new File([blob], filename, { type: 'image/png' });
      
      if (navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: 'Rainbow Paint',
          text: 'Check this out from Rainbow Paint!',
          files: [file]
        });
        return;
      }
    } catch (e) {
      console.log('Share failed or was cancelled, falling back to download', e);
    }
  }

  // Fallback to download
  try {
    const link = document.createElement('a');
    link.download = filename;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Check if in iframe, which might silently block downloads
    if (window.self !== window.top) {
      setTimeout(() => {
        alert('If the download did not start, it may be blocked in the preview window. Please use the "Open in new tab" button at the top right of the screen to share or download images.');
      }, 1000);
    }
  } catch (err) {
    console.error("Download failed:", err);
    alert('Failed to download image. Please try opening the app in a new tab.');
  }
};
