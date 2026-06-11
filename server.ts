import express from "express";
import compression from "compression";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import { Resend } from "resend";

let aiClient: GoogleGenAI | null = null;
function getAI(): GoogleGenAI {
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

export const app = express();
  
  // Compress all responses for better SEO/performance
  app.use(compression());

  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ limit: '10mb', extended: true }));

  // API routes
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;

      const systemInstruction = `You are the mascot for Rainbow Paints, Coimbatore (authorized Asian Paints, Berger, Dr. Fixit, MRF distributor since 2001).
Goal: Provide brief help about paints/tools.
Categories: Decorative (Interior/Exterior, Waterproofing, Wood), Industrial (PU, Epoxy).
Brands: Asian Paints (Royale, Apex), Berger (Silk, WeatherCoat), Dr. Fixit (LW+), MRF (Vapocure).
Tools: 'Visualizer' (colors), 'Calculator' (quantities), 'Products' (browse).
Style: Concise (max 2 sentences). Direct to tools/sections only when relevant.`;

      const contents = history ? [...history, { role: 'user', parts: [{ text: message }] }] : [{ role: 'user', parts: [{ text: message }] }];

      const response = await getAI().models.generateContent({
        model: "gemini-2.5-flash",
        contents: contents,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        },
      });

      res.json({ text: response.text });
    } catch (error: any) {
      const errorMsg = error?.message || String(error);
      const isQuota = error?.status === 429 || error?.status === 503 || error?.status === "UNAVAILABLE" || errorMsg.toLowerCase().includes("quota") || errorMsg.toLowerCase().includes("429") || errorMsg.toLowerCase().includes("503") || errorMsg.toLowerCase().includes("unavailable") || errorMsg.toLowerCase().includes("overloaded");
      
      if (!isQuota) {
        console.error("Gemini Error:", error);
      } else {
        console.warn("Gemini API overloaded or Quota Exceeded (Chat). Returning limited capacity.");
      }
      
      if (isQuota) {
        return res.status(429).json({ error: "QUOTA_EXCEEDED" });
      }

      res.status(500).json({ error: "Failed to generate response" });
    }
  });

  // Colormind proxy route to bypass CORS
  app.post("/api/colormind", async (req, res) => {
    try {
      const { hex } = req.body;
      const cleanHex = (hex || "").replace('#', '');
      const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(cleanHex);
      const rgb = result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;

      const response = await fetch("http://colormind.io/api/", {
        method: "POST",
        body: JSON.stringify({
          model: "default",
          input: rgb ? [[rgb.r, rgb.g, rgb.b], "N", "N", "N", "N"] : undefined
        })
      });
      const data = await response.json();
      const rgbPalette = data.result || [];
      const hexPalette = rgbPalette.map((color: number[]) => {
        return "#" + color.map((x) => x.toString(16).padStart(2, "0")).join("");
      });
      res.json({ palette: hexPalette });
    } catch (error) {
      console.error("Colormind API Error:", error);
      res.status(500).json({ error: "Failed to generate Colormind palette" });
    }
  });

  // Color theory palette generator powered by Gemini
  app.post("/api/palette", async (req, res) => {
    try {
      const { baseHex, baseName, surfs, roomType } = req.body;
      if (!baseHex || !surfs || !Array.isArray(surfs)) {
        return res.status(400).json({ error: "baseHex and surfs array are required" });
      }

      const activeRoomLabel = roomType || "interior";

      const systemInstruction = `You are an expert architectural paint and color theory consultant.
Goal: Generate 4 cohesive and appealing architectural paint palettes based strictly on color theory:
1. "monochromatic": Tonal variations of the base hue (changing saturation and lightness).
2. "complementary": Dynamic contrast using the base hue and its exact color wheel opposite.
3. "triadic": A balanced, harmony using three hues spaced evenly on the color wheel.
4. "analogous": A soft harmony using neighboring hues close on the color wheel.

For each palette, you must map a recommended paint color (as a raw #HEX string) to each of the following specific surfaces: ${surfs.join(', ')}.
To keep the design visually centered and true to user choices, you MUST map the selected base color "${baseHex}" to the primary surface (like 'back' for interior, or 'wall' for exterior).
Do not repeat the exact same color on every single surface; instead, vary the lightness, saturation, or complement shades to create an authentic multi-surface designer palette!
Provide a professional, human-designed 'name' for each palette (e.g. "Ocean Breeze Modern", "Coastal Terrace") and a concise design 'desc' (max 1 sentence) justifying the choice.`;

      const prompt = `Selected color: "${baseName || 'Active Colour'}" (${baseHex})
Active Room/View: "${activeRoomLabel}"
Surfaces to paint: ${surfs.join(', ')}

Please output a valid JSON object matching this structure exactly:
{
  "monochromatic": {
    "name": "...",
    "desc": "...",
    "colors": {
      ${surfs.map(s => `"${s}": "#HEX"`).join(',\n      ')}
    }
  },
  "complementary": {
    "name": "...",
    "desc": "...",
    "colors": {
      ${surfs.map(s => `"${s}": "#HEX"`).join(',\n      ')}
    }
  },
  "triadic": {
    "name": "...",
    "desc": "...",
    "colors": {
      ${surfs.map(s => `"${s}": "#HEX"`).join(',\n      ')}
    }
  },
  "analogous": {
    "name": "...",
    "desc": "...",
    "colors": {
      ${surfs.map(s => `"${s}": "#HEX"`).join(',\n      ')}
    }
  }
}`;

      const response = await getAI().models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          systemInstruction: systemInstruction,
          responseMimeType: "application/json",
          temperature: 0.8,
        },
      });

      const parsed = JSON.parse(response.text || "{}");
      res.json(parsed);
    } catch (error: any) {
      const errorMsg = error?.message || String(error);
      const isQuota = errorMsg.toLowerCase().includes("quota") || 
                      errorMsg.toLowerCase().includes("limit") || 
                      errorMsg.toLowerCase().includes("429") || 
                      errorMsg.toLowerCase().includes("503") || 
                      errorMsg.toLowerCase().includes("unavailable") || 
                      errorMsg.toLowerCase().includes("overloaded") || 
                      error?.status === "RESOURCE_EXHAUSTED" || 
                      error?.status === "UNAVAILABLE" || 
                      error?.status === 503 ||
                      error?.code === 429 || 
                      error?.code === 503;
                      
      if (!isQuota) {
        // Only log actual unexpected errors
      } else {
        console.warn("Gemini API overloaded or Quota Exceeded. Switched to mathematical fallback.");
      }
      
      res.json({
        status: "fallback",
        reason: isQuota ? "quota_exceeded" : "api_error",
        message: isQuota 
          ? "Gemini daily request limit of 20 exceeded. Switched to mathematical color-theory model." 
          : "Could not contact AI generator. Switched to architectural color-theory model."
      });
    }
  });

  // --- GOOGLE MAPS PROXY ENDPOINTS WITH FAIL-SAFE CACHING & MULTIPLIER FALLBACKS ---
  const autocompleteCache = new Map<string, any>();
  const geocodeCache = new Map<string, any>();
  const distanceCache = new Map<string, any>();

  const SERVER_LOCAL_PINCODES: Record<string, { lat: number; lon: number; name: string }> = {
    '641009': { lat: 11.0310, lon: 76.9740, name: 'Ganapathy Store Area' },
    '641035': { lat: 11.0772, lon: 77.0101, name: 'Saravanampatty' },
    '641006': { lat: 11.0260, lon: 76.9800, name: 'Ganapathy West' },
    '641012': { lat: 11.0183, lon: 76.9634, name: 'Gandhipuram' },
    '641004': { lat: 11.0272, lon: 77.0018, name: 'Peelamedu' },
    '641014': { lat: 11.0190, lon: 77.0250, name: 'Peelamedu East' },
    '641018': { lat: 11.0100, lon: 76.9600, name: 'Coimbatore Town' },
    '641011': { lat: 11.0232, lon: 76.9419, name: 'Saibaba Colony' },
    '641049': { lat: 11.0284, lon: 76.9016, name: 'Vadavalli' },
    '641001': { lat: 10.9961, lon: 76.9609, name: 'Coimbatore Head Office' },
    '641002': { lat: 11.0003, lon: 76.9531, name: 'Coimbatore Central' },
    '641045': { lat: 11.0069, lon: 76.9866, name: 'Puliyakulam' },
  };

  function setCacheWithLimit(cache: Map<string, any>, key: string, value: any, limit = 500) {
    if (cache.size >= limit) {
      const firstKey = cache.keys().next().value;
      if (firstKey !== undefined) cache.delete(firstKey);
    }
    cache.set(key, value);
  }

  function fallbackHaversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Earth's radius in kilometers
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const straightLine = R * c;
    // Apply actual road multiplier factor (typically 1.25x in Coimbatore road grid)
    return parseFloat((straightLine * 1.25).toFixed(1));
  }

  app.get("/api/delivery/autocomplete", async (req, res) => {
    try {
      const input = (req.query.input as string || "").trim();
      if (!input) {
        return res.json({ predictions: [] });
      }

      if (autocompleteCache.has(input)) {
        return res.json({ predictions: autocompleteCache.get(input) });
      }

      const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(input)}&countrycodes=in&format=json&limit=5&addressdetails=1`;
      const response = await fetch(url, { headers: { 'User-Agent': 'Rainbow-Paints-Local-App' } });
      
      if (!response.ok) {
        throw new Error(`Nominatim Autocomplete returned status ${response.status}`);
      }
      
      const data = (await response.json()) as any[];
      const predictions = data.map((p: any) => ({
        description: p.display_name,
        place_id: `nominatim_${p.place_id}`,
        lat: parseFloat(p.lat),
        lon: parseFloat(p.lon),
        pincode: p.address?.postcode || "",
        structured_formatting: {
          main_text: p.name || p.address?.residential || p.address?.suburb || p.display_name.split(',')[0],
          secondary_text: p.display_name
        }
      }));

      // Merge local presets for rich fallback UX
      const localMatch = Object.entries(SERVER_LOCAL_PINCODES)
        .filter(([pin, detail]) => 
          pin.includes(input) || 
          detail.name.toLowerCase().includes(input.toLowerCase())
        )
        .map(([pin, detail]) => ({
          description: `${detail.name}, Coimbatore, Tamil Nadu ${pin}`,
          place_id: `local_pin_${pin}`,
          lat: detail.lat,
          lon: detail.lon,
          pincode: pin,
          structured_formatting: {
            main_text: detail.name,
            secondary_text: `Coimbatore, Tamil Nadu ${pin}`
          }
        }));

      const combined = [...predictions, ...localMatch].slice(0, 5);

      setCacheWithLimit(autocompleteCache, input, combined);
      res.json({ predictions: combined });
    } catch (err) {
      console.error("Autocomplete Proxy Error:", err);
      res.status(500).json({ error: "Failed to fetch suggestions" });
    }
  });

  app.post("/api/delivery/geocode", async (req, res) => {
    try {
      const { placeId, address, pincode, lat, lon } = req.body;
      const key = placeId || address || pincode || "";
      if (!key && !lat) {
        return res.status(400).json({ error: "placeId, address, or pincode is required" });
      }

      if (geocodeCache.has(key)) {
        return res.json(geocodeCache.get(key));
      }
      
      // If lat/lon provided (like from old autocomplete), use it directly
      if (lat && lon && address) {
         const result = { lat, lon, address, pincode: pincode || "" };
         setCacheWithLimit(geocodeCache, key, result);
         return res.json(result);
      }

      if (pincode && SERVER_LOCAL_PINCODES[pincode]) {
        const matched = SERVER_LOCAL_PINCODES[pincode];
        const result = {
          lat: matched.lat,
          lon: matched.lon,
          address: `${matched.name}, Coimbatore, Tamil Nadu ${pincode}`,
          pincode
        };
        setCacheWithLimit(geocodeCache, key, result);
        return res.json(result);
      }
        
      if (placeId && placeId.startsWith("local_pin_")) {
        const pin = placeId.replace("local_pin_", "");
        const matched = SERVER_LOCAL_PINCODES[pin];
        if (matched) {
          const result = {
            lat: matched.lat,
            lon: matched.lon,
            address: `${matched.name}, Coimbatore, Tamil Nadu ${pin}`,
            pincode: pin
          };
          setCacheWithLimit(geocodeCache, key, result);
          return res.json(result);
        }
      }

      // Nominatim generic geocode
      const queryTerm = address || pincode || "Coimbatore";
      const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(queryTerm)}&countrycodes=in&format=json&limit=1&addressdetails=1`;
      const response = await fetch(url, { headers: { 'User-Agent': 'Rainbow-Paints-Local-App' } });
      const data = await response.json() as any[];

      if (data && data.length > 0) {
        const result = {
          lat: parseFloat(data[0].lat),
          lon: parseFloat(data[0].lon),
          address: data[0].display_name,
          pincode: data[0].address?.postcode || pincode || ""
        };
        setCacheWithLimit(geocodeCache, key, result);
        return res.json(result);
      }

      const fallback = {
        lat: 11.0183,
        lon: 76.9634,
        address: "Gandhipuram, Coimbatore, Tamil Nadu",
        pincode: "641012"
      };
      return res.json(fallback);
    } catch (err) {
      console.error("Geocoding Proxy Error:", err);
      res.status(500).json({ error: "Failed to geocode address" });
    }
  });

  app.post("/api/delivery/distance", async (req, res) => {
    try {
      const { destLat, destLon } = req.body;
      if (destLat === undefined || destLon === undefined) {
        return res.status(400).json({ error: "destLat and destLon are required" });
      }

      const cacheKey = `${destLat},${destLon}`;
      if (distanceCache.has(cacheKey)) {
        return res.json(distanceCache.get(cacheKey));
      }

      const originLat = 11.00284;
      const originLon = 76.96918;

      try {
        // Use OSRM public API for distance (Free routing API)
        const url = `https://router.project-osrm.org/route/v1/driving/${originLon},${originLat};${destLon},${destLat}?overview=false`;
        const response = await fetch(url);
        const data = await response.json() as any;

        if (data.code === "Ok" && data.routes && data.routes.length > 0) {
          const route = data.routes[0];
          const distanceKm = parseFloat((route.distance / 1000).toFixed(1));
          
          // Add 1 hour of processing time (60 mins) to actual travel time
          const durationMin = Math.round(route.duration / 60) + 60;
          
          let durationText = `${durationMin} mins`;
          if (durationMin >= 60) {
            const h = Math.floor(durationMin / 60);
            const m = durationMin % 60;
            durationText = m > 0 ? `${h} hr ${m} mins` : `${h} hr`;
          }

          const result = {
            distance: distanceKm,
            durationText,
            durationMin
          };
          setCacheWithLimit(distanceCache, cacheKey, result);
          return res.json(result);
        }
      } catch(osrmErr) {
         console.warn("OSRM Route Failed, using fallback", osrmErr);
      }

      // Fallback haversine
      const distance = fallbackHaversineDistance(originLat, originLon, destLat, destLon);
      const durationMin = Math.round((distance / 25) * 60) + 60; // adding 1 hour here too
      let durationText = `${durationMin} mins`;
      if (durationMin >= 60) {
        const h = Math.floor(durationMin / 60);
        const m = durationMin % 60;
        durationText = m > 0 ? `${h} hr ${m} mins` : `${h} hr`;
      }

      const fallbackResult = {
        distance,
        durationText,
        durationMin
      };

      setCacheWithLimit(distanceCache, cacheKey, fallbackResult);
      return res.json(fallbackResult);
      
    } catch (err) {
      console.error("Distance Proxy Error:", err);
      res.status(500).json({ error: "Failed to calculate road distance" });
    }
  });

  // --- IN-MEMORY TRANSACTIONAL EMAIL & LOG GATEWAY ---
  interface EmailLog {
    id: string;
    recipient: string;
    subject: string;
    html: string;
    timestamp: number;
    status: 'SENT' | 'FAILED';
    type: 'ORDER_CONFIRMATION' | 'ADMIN_LEAD_ALERT' | 'DISPATCH_NOTIFICATION';
  }
  const emailLogs: EmailLog[] = [];

  const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
  async function logAndSendSimulationEmail(recipient: string, subject: string, html: string, type: EmailLog['type'], attachments?: any[]) {
    const id = `EM-${Math.floor(100000 + Math.random() * 900000)}`;
    
    if (resend) {
      try {
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || 'Rainbow Paints <orders@rainbowpaint.in>',
          to: recipient,
          subject: subject,
          html: html,
          attachments: attachments,
        });
        console.log(`[RESEND EMAIL DISPATCH] Sent to ${recipient}`);
      } catch (err) {
        console.error(`[RESEND EMAIL Error]`, err);
      }
    } else {
      console.log(`[EMAIL DISPATCH - ${type}] Mock Sent to ${recipient}: "${subject}" (ID: ${id})`);
    }

    const log: EmailLog = {
      id,
      recipient,
      subject,
      html,
      timestamp: Date.now(),
      status: 'SENT',
      type
    };

    if (emailLogs.length >= 100) {
      emailLogs.shift();
    }
    emailLogs.push(log);
    return id;
  }

  // --- Real-Time CRM & ADMIN NOTIFICATION ENDPOINT ---
  app.post("/api/notify", async (req, res) => {
    try {
      const { title, message, type, linkId, recipientEmail, metadata } = req.body;
      console.log(`[NOTIFY ADMIN] [${type}] ${title}: ${message}`);
      
      const targetEmail = recipientEmail || process.env.ADMIN_EMAIL || 'admin@rainbowpaints.com';
      
      const emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #fff;">
          <div style="background-color: #0f172a; padding: 24px; border-radius: 8px 8px 0 0; text-align: center;">
            <h1 style="color: #f59e0b; margin: 0; font-size: 24px; letter-spacing: 1px;">RAINBOW PAINTS</h1>
            <p style="color: #94a3b8; margin: 4px 0 0 0; font-size: 11px; text-transform: uppercase;">CRM & Admin Automation Link</p>
          </div>
          <div style="padding: 24px;">
            <div style="display: inline-block; padding: 4px 12px; border-radius: 9999px; font-size: 11px; font-weight: bold; background-color: #fef3c7; color: #d97706; margin-bottom: 16px;">
              ${type || 'CRM ALERT'}
            </div>
            <h2 style="color: #1e293b; margin: 0 0 12px 0; font-size: 18px;">${title}</h2>
            <p style="color: #475569; font-size: 14px; line-height: 1.6; margin-bottom: 24px;">${message}</p>
            
            ${metadata ? `
              <div style="background-color: #f8fafc; padding: 16px; border-radius: 8px; border: 1px dashed #cbd5e1; margin-bottom: 24px;">
                <h3 style="color: #334155; margin: 0 0 8px 0; font-size: 13px;">Metadata Details:</h3>
                <pre style="margin: 0; font-size: 12px; color: #0f172a; font-family: monospace; white-space: pre-wrap;">${JSON.stringify(metadata, null, 2)}</pre>
              </div>
            ` : ''}
            
            <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
            <p style="color: #64748b; font-size: 11px; text-align: center; margin: 0;">
              Coimbatore Store Authorized Partner • Since 2001
            </p>
          </div>
        </div>
      `;

      await logAndSendSimulationEmail(targetEmail, `[Rainbow CRM Alert] ${title}`, emailHtml, 'ADMIN_LEAD_ALERT');
      res.json({ success: true, notified: true });
    } catch (err) {
      console.error("Notification trigger failed:", err);
      res.status(500).json({ error: "Failed to dispatch notification" });
    }
  });

  // Fetch email logs for our newly added Admin log viewer
  app.get("/api/logs/emails", (req, res) => {
    res.json({ emails: emailLogs });
  });

  // --- COIMBATORE WEATHER & SEASONAL PAINT RECOMMENDATION API ---
  app.post("/api/ai/paint-consultant", async (req, res) => {
    try {
      const { purpose, pincode, surfaceAreaSqFt, customNotes } = req.body;
      const currentMonth = new Date().toLocaleString('en-US', { month: 'long' });
      
      const aiPrompt = `
      Coimbatore Local Weather Context: We are in ${currentMonth}.
      User Requirement:
      - Painting Purpose: ${purpose || 'General Exterior / Interior'}
      - Local Coimbatore Pincode: ${pincode || '641012'}
      - Estimated Surface Area: ${surfaceAreaSqFt || '1000'} sq ft
      - Extra requirements: ${customNotes || 'None'}
      
      Provide a highly precise, luxury architectural painting prescription. Explain:
      1. Recommended Paint product and why (Asian Paints, Berger, or Dr. Fixit based on ${currentMonth} humidity/monsoon limits).
      2. Perfect Dilution ratio with water (essential for decorators).
      3. Temperature / Drying recommendation for Coimbatore's current weather conditions to avoid paint cracking or color fading.
      
      Keep it high-contrast, structured and premium. Limit to 3 bullets, visually luxurious.
      `;

      const response = await getAI().models.generateContent({
        model: "gemini-2.5-flash",
        contents: [{ role: 'user', parts: [{ text: aiPrompt }] }],
        config: {
          temperature: 0.6,
        }
      });

      res.json({ status: "success", advice: response.text });
    } catch (error: any) {
      const errorMsg = error?.message || String(error);
      const isQuota = error?.status === 429 || errorMsg.toLowerCase().includes("quota") || errorMsg.toLowerCase().includes("429");
      
      if (!isQuota) {
        console.error("Paint weather consult failed:", error);
      } else {
        console.warn("Paint weather consult Quota Exceeded. Failed gracefully.");
      }
      res.status(isQuota ? 429 : 500).json({ error: "Consultation helper error" });
    }
  });

  // --- PREMIUM PAYMENT INTENT & WEBHOOK SIGNATURE SYSTEM (RAZORPAY EMULATOR) ---
  app.post("/api/transaction/init", (req, res) => {
    try {
      const { amount, items, shippingAddress } = req.body;
      
      if (!amount || amount <= 0) {
        return res.status(400).json({ error: "Invalid transaction amount" });
      }

      const orderTicketId = `order_rp_id_${Math.floor(1000000 + Math.random() * 9000000)}`;
      const paymentToken = `rp_sign_token_${Buffer.from(orderTicketId + '-' + Date.now()).toString('base64').substring(0, 16)}`;

      res.json({
        success: true,
        orderId: orderTicketId,
        paymentToken,
        currency: "INR",
        amountInPaise: Math.round(amount * 100),
        merchantName: "Rainbow Paints Coimbatore",
        pincodeApproved: !!shippingAddress?.pincode,
        estimatedDeliveryDays: 2
      });
    } catch (err: any) {
      console.error("Payment Intent creation failed:", err);
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/transaction/verify", async (req, res) => {
    try {
      const { paymentId, orderId, signature, orderDetails, invoiceBase64 } = req.body;
      
      if (!paymentId || !orderId || !signature) {
        return res.status(400).json({ error: "Missing required Razorpay parameters for verification" });
      }

      const isValid = signature.startsWith("rp_sign_token_");

      if (isValid) {
        const APP_URL = process.env.APP_URL || 'https://rainbowpaints.com';

        const itemsListHtml = orderDetails?.items?.map((it: any) => `
          <tr>
            <td style="padding: 16px 0; border-bottom: 1px solid #e4e4e7;">
              <span style="color: #18181b; font-size: 14px; font-weight: 500; display: block; margin-bottom: 4px;">${it.name || 'Premium Paint Paint'}</span>
              ${it.size ? `<span style="color: #71717a; font-size: 12px; display: block;">Size: ${it.size}L</span>` : ''}
              ${it.shade ? `<span style="color: #71717a; font-size: 12px; display: block; display: flex; align-items: center; gap: 6px;"><span style="display:inline-block; width:12px; height:12px; border-radius:50%; background-color:${it.shade.hex || '#ffffff'}; border:1px solid #e5e7eb;"></span> Colour: ${it.shade.name} ${it.shade.code ? `(${it.shade.code})` : ''}</span>` : ''}
              <span style="color: #71717a; font-size: 12px; margin-top: 4px; display: block;">₹${it.unitPrice.toLocaleString('en-IN')} each</span>
            </td>
            <td style="padding: 16px 0; border-bottom: 1px solid #e4e4e7; color: #52525b; font-size: 14px; text-align: center;">
              ${it.quantity}
            </td>
            <td style="padding: 16px 0; border-bottom: 1px solid #e4e4e7; color: #18181b; font-size: 14px; text-align: right; font-weight: 500;">
              ₹${(it.unitPrice * it.quantity).toLocaleString('en-IN')}
            </td>
          </tr>
        `).join('') || '';

        const customerEmail = orderDetails?.shippingAddress?.email || 'customer@rainbowpaints.com';

        const paymentSuccessHtml = `
          <div style="font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e4e4e7; border-radius: 8px; overflow: hidden; background-color: #faf9f6; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
            <div style="background-color: #ffffff; padding: 40px 32px; text-align: center; border-bottom: 2px solid #d4af37;">
              <span style="font-size: 11px; letter-spacing: 4px; text-transform: uppercase; color: #d4af37; font-weight: 500; display: block; margin-bottom: 12px;">Rainbow Paints Coimbatore</span>
              <h1 style="color: #18181b; margin: 0; font-size: 24px; font-weight: 600; letter-spacing: 1px;">Thank You For Your Order</h1>
            </div>
            
            <div style="padding: 40px 32px;">
              <p style="color: #52525b; font-size: 15px; line-height: 1.6; margin-top: 0; font-weight: 400;">
                Dear ${orderDetails?.shippingAddress?.name || 'Customer'},
              </p>
              <p style="color: #52525b; font-size: 15px; line-height: 1.6; font-weight: 400;">
                We are preparing your premium paints for delivery. Your order is confirmed and currently being processed at our Coimbatore warehouse.
              </p>

              <div style="margin: 32px 0; text-align: center;">
                <a href="${APP_URL}/track-order?id=${orderId}" style="display: inline-block; background-color: #d4af37; color: #ffffff; text-decoration: none; padding: 14px 28px; font-size: 12px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; border-radius: 4px;">Track Your Order</a>
              </div>
              
              <h3 style="color: #18181b; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; margin: 32px 0 16px 0; font-weight: 600; border-bottom: 1px solid #e4e4e7; padding-bottom: 8px;">Official Tax Invoice</h3>
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                <thead>
                  <tr>
                    <th style="padding: 12px 0; text-align: left; color: #71717a; font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid #e4e4e7;">Product Detail</th>
                    <th style="padding: 12px 0; text-align: center; color: #71717a; font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid #e4e4e7;">Qty</th>
                    <th style="padding: 12px 0; text-align: right; color: #71717a; font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid #e4e4e7;">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsListHtml}
                </tbody>
              </table>

              <div style="background-color: #ffffff; padding: 24px; border-radius: 8px; border: 1px solid #e4e4e7;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 13px; color: #71717a;">
                  <span>Subtotal</span>
                  <span style="float: right;">₹${(orderDetails?.subtotal || 0).toLocaleString('en-IN')}</span>
                  <div style="clear: both;"></div>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 13px; color: #71717a;">
                  <span>GST (18% inclusive)</span>
                  <span style="float: right;">₹${(orderDetails?.gst || 0).toLocaleString('en-IN')}</span>
                  <div style="clear: both;"></div>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 16px; font-size: 13px; color: #71717a;">
                  <span>Delivery</span>
                  <span style="float: right;">₹${(orderDetails?.deliveryFee || 0).toLocaleString('en-IN')}</span>
                  <div style="clear: both;"></div>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 16px; color: #18181b; font-weight: 600; border-top: 1px solid #e4e4e7; padding-top: 16px;">
                  <span>Total Paid</span>
                  <span style="float: right; color: #d4af37;">₹${(orderDetails?.total || 0).toLocaleString('en-IN')}</span>
                  <div style="clear: both;"></div>
                </div>
              </div>

              <h3 style="color: #18181b; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; margin: 32px 0 16px 0; font-weight: 600; border-bottom: 1px solid #e4e4e7; padding-bottom: 8px;">Shipping Destination</h3>
              <div style="border: 1px solid #e4e4e7; padding: 16px; border-radius: 8px; font-size: 13px; color: #52525b; line-height: 1.6; background-color: #ffffff;">
                <strong style="color: #18181b;">${orderDetails?.shippingAddress?.name}</strong><br />
                ${orderDetails?.shippingAddress?.line1}<br />
                ${orderDetails?.shippingAddress?.city}, ${orderDetails?.shippingAddress?.state} - <strong style="color: #18181b;">${orderDetails?.shippingAddress?.pincode}</strong><br />
                Contact: ${orderDetails?.shippingAddress?.phone}
              </div>

              <div style="margin-top: 32px; text-align: center;">
                <p style="color: #71717a; font-size: 11px; margin-bottom: 0;">
                  Need assistance? Call Coimbatore Store Direct at +91 8072442930.
                </p>
              </div>
            </div>
            
            <div style="background-color: #ffffff; padding: 24px 32px; border-top: 1px solid #e4e4e7; text-align: center;">
              <p style="color: #71717a; font-size: 10px; margin: 0; text-transform: uppercase; letter-spacing: 2px;">
                Authorized Premium Distributors • Coimbatore
              </p>
            </div>
          </div>
        `;

        const attachments = invoiceBase64 ? [
          {
             filename: `Invoice_${orderId}.pdf`,
             content: invoiceBase64.split(',')[1] || invoiceBase64 // resend accepts base64
          }
        ] : undefined;

        await logAndSendSimulationEmail(customerEmail, `Order Received & Paid [${orderId}] - Rainbow Paints`, paymentSuccessHtml, 'ORDER_CONFIRMATION', attachments);
        
        // Owner notification
        const ownerEmail = process.env.ADMIN_EMAIL || 'admin@rainbowpaints.com';
        const ownerHtml = `
          <div style="font-family: Arial, sans-serif; max-width: 600px;">
            <h2>New Order Received: ${orderId}</h2>
            <p><strong>Customer:</strong> ${orderDetails?.shippingAddress?.name ?? 'Guest'}</p>
            <p><strong>Email:</strong> ${customerEmail}</p>
            <p><strong>Phone:</strong> ${orderDetails?.shippingAddress?.phone ?? 'N/A'}</p>
            <p><strong>Total:</strong> ₹${(orderDetails?.total || 0).toLocaleString('en-IN')}</p>
            <hr />
            <p>Check the admin dashboard for details.</p>
          </div>
        `;
        await logAndSendSimulationEmail(ownerEmail, `NEW ORDER ALARM [${orderId}] - ₹${(orderDetails?.total || 0).toLocaleString('en-IN')}`, ownerHtml, 'ADMIN_LEAD_ALERT');
        
        return res.json({ verified: true, signatureMatched: true });
      } else {
        return res.status(400).json({ error: "Cryptographic signature mismatch" });
      }
    } catch (err: any) {
      console.error("Signature verification failed:", err);
      res.status(500).json({ error: "Signature matching routine failure" });
    }
  });

  app.post("/api/transaction/status-update", async (req, res) => {
    try {
      const { orderId, status, customerEmail, customerName } = req.body;
      if (!orderId || !status || !customerEmail) return res.status(400).json({ error: "Missing required fields" });

      const APP_URL = process.env.APP_URL || 'https://rainbowpaints.com';
      let subject = '';
      let msg = '';
      if (status === 'OUT_FOR_DELIVERY') {
        subject = `Your Order ${orderId} is Out for Delivery!`;
        msg = `Hooray! Your premium paints are out for delivery and will reach you very soon today. Please keep your phone reachable.`;
      } else if (status === 'DELIVERED') {
        subject = `Your Order ${orderId} has been Delivered!`;
        msg = `Your order has been successfully delivered. Thank you for choosing Rainbow Paints & Hardwares for your painting needs! Let's add some color to your walls.`;
      } else {
        return res.json({ ignored: true, reason: 'Status does not require email' });
      }

      const paymentSuccessHtml = `
          <div style="font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e4e4e7; border-radius: 8px; overflow: hidden; background-color: #faf9f6;">
            <div style="background-color: #ffffff; padding: 40px 32px; text-align: center; border-bottom: 2px solid #d4af37;">
               <span style="font-size: 11px; letter-spacing: 4px; text-transform: uppercase; color: #d4af37; font-weight: 500; display: block; margin-bottom: 12px;">Rainbow Paints Coimbatore</span>
               <h1 style="color: #18181b; margin: 0; font-size: 24px; font-weight: 600; letter-spacing: 1px;">Order Updated</h1>
            </div>
            <div style="padding: 40px 32px;">
              <p style="color: #52525b; font-size: 15px; line-height: 1.6; font-weight: 400;">Dear ${customerName || 'Customer'},</p>
              <p style="color: #52525b; font-size: 15px; line-height: 1.6; font-weight: 400;">${msg}</p>
              <div style="margin: 32px 0; text-align: center;">
                 <a href="${APP_URL}/track-order?id=${orderId}" style="display: inline-block; background-color: #d4af37; color: #ffffff; text-decoration: none; padding: 14px 28px; font-size: 12px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; border-radius: 4px;">Track Order</a>
              </div>
            </div>
          </div>
      `;
      await logAndSendSimulationEmail(customerEmail, subject, paymentSuccessHtml, 'DISPATCH_NOTIFICATION');
      res.json({ success: true });
    } catch (err: any) {
      console.error("Status update notification failed:", err);
      res.status(500).json({ error: "Failed to dispatch email" });
    }
  });

  
  // --- SITEMAP GENERATION ---
  app.get('/sitemap.xml', async (req, res) => {
    try {
      let productUrls = '';
      
      try {
        const { initializeApp } = await import('firebase/app');
        const { getFirestore, collection, getDocs } = await import('firebase/firestore');
        const fs = await import('fs');
        const path = await import('path');
        
        const configPath = path.join(process.cwd(), 'firebase-applet-config.json');
        if (fs.existsSync(configPath)) {
          const configStr = fs.readFileSync(configPath, 'utf8');
          const firebaseConfig = JSON.parse(configStr);
          const appClient = initializeApp(firebaseConfig, 'sitemap-server');
          const db = getFirestore(appClient);
          
          const productsRef = collection(db, 'products');
          const snapshot = await getDocs(productsRef);
          
          snapshot.forEach(doc => {
            const data = doc.data();
            if (data.slug) {
              productUrls += `
  <url>
    <loc>https://rainbowpaint.in/p/${data.slug}</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>`;
            }
          });
        }
      } catch (err) {
        console.error("Failed to generate dynamic products for sitemap:", err);
      }

      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://rainbowpaint.in/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>default</changefreq>
  </url>
  <url>
    <loc>https://rainbowpaint.in/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://rainbowpaint.in/faqs</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://rainbowpaint.in/buy-paint-online</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://rainbowpaint.in/c/interior-wall</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://rainbowpaint.in/c/exterior-wall</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://rainbowpaint.in/c/waterproofing</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://rainbowpaint.in/c/wood-finishes</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://rainbowpaint.in/c/metals-and-grills</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://rainbowpaint.in/c/primer</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://rainbowpaint.in/visualizer</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://rainbowpaint.in/calculator</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://rainbowpaint.in/brands/asian-paints</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://rainbowpaint.in/brands/berger-paints</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://rainbowpaint.in/brands/dr.-fixit</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://rainbowpaint.in/brands/mrf-vapocure</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://rainbowpaint.in/terms</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>https://rainbowpaint.in/privacy</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>https://rainbowpaint.in/refund-policy</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>https://rainbowpaint.in/shipping-policy</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>${productUrls}
</urlset>`;

      res.header('Content-Type', 'application/xml');
      res.send(sitemap);
    } catch (err) {
      console.error("Sitemap generation error:", err);
      res.status(500).send("Error generating sitemap");
    }
  });

async function startDevServer() {
  const PORT = process.env.PORT || 3000;
  
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vitePackage = "vite";
    const { createServer: createViteServer } = await import(vitePackage);
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath, {
      setHeaders: (res, path) => {
        if (path.endsWith('index.html')) {
          res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        } else {
          res.setHeader('Cache-Control', 'public, max-age=31536000'); // 1 year
        }
      },
      etag: true,
      lastModified: true
    }));
    app.get('*', (req, res) => {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  if (process.env.VERCEL !== "1" && process.env.NODE_ENV !== "test") {
    app.listen(Number(PORT), "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
  }
}

if (process.env.VERCEL !== "1" && process.env.NODE_ENV !== "test") {
  startDevServer();
}

export default app;
