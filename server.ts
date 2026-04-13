import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import axios from "axios";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post("/api/download", async (req, res) => {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }

    try {
      // Using Cobalt API (Public instance)
      // Note: In production, you should use your own instance or a reliable provider
      const cobaltResponse = await axios.post("https://api.cobalt.tools/api/json", {
        url: url,
        vQuality: "1080",
        aFormat: "mp3",
        isAudioOnly: false,
        isNoTTWatermark: true,
      }, {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        }
      });

      const data = cobaltResponse.data;

      if (data.status === "error") {
        throw new Error(data.text || "Failed to process video");
      }

      // Determine platform for UI
      let platform = "Video";
      if (url.includes("youtube.com") || url.includes("youtu.be")) platform = "YouTube";
      else if (url.includes("tiktok.com")) platform = "TikTok";
      else if (url.includes("instagram.com")) platform = "Instagram";
      else if (url.includes("facebook.com") || url.includes("fb.watch")) platform = "Facebook";

      res.json({
        status: "success",
        platform,
        title: data.text || `Video from ${platform}`,
        thumbnail: `https://picsum.photos/seed/${platform.toLowerCase()}/400/225`, // Cobalt doesn't always return thumbnails
        duration: "N/A",
        url: data.url, // Direct download link
        stream: data.stream,
        picker: data.picker, // For multiple formats if available
        formats: data.picker ? data.picker.map((p: any) => ({
          quality: p.type || "High Quality",
          url: p.url,
          size: "Auto",
          ext: "mp4"
        })) : [
          { quality: "High Quality", url: data.url, size: "Auto", ext: "mp4" }
        ]
      });
    } catch (error: any) {
      console.error("Download error:", error.response?.data || error.message);
      res.status(500).json({ 
        error: "Failed to process video. The service might be busy or the URL is invalid.",
        details: error.response?.data?.text || error.message
      });
    }
  });

  app.get("/api/status", (req, res) => {
    res.json({ 
      status: "online", 
      servers: ["US-East", "EU-West", "Asia-South"],
      load: "Low"
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
