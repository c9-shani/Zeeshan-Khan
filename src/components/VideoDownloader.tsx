import React, { useState } from "react";
import { Download, Link as LinkIcon, Loader2, CheckCircle2, AlertCircle, Youtube, Instagram, Facebook, Music2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ThreeDButton } from "./ThreeDButton";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "motion/react";
import axios from "axios";

interface VideoInfo {
  platform: string;
  title: string;
  thumbnail: string;
  duration: string;
  formats: {
    quality: string;
    url: string;
    size: string;
    ext: string;
  }[];
}

export const VideoDownloader = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDownload = async () => {
    if (!url) return;
    setLoading(true);
    setError(null);
    setVideoInfo(null);

    try {
      const response = await axios.post("/api/download", { url });
      setVideoInfo(response.data);
    } catch (err) {
      setError("Failed to fetch video information. Please check the URL.");
    } finally {
      setLoading(false);
    }
  };

  const platforms = [
    { name: "YouTube", icon: <Youtube className="text-red-500" /> },
    { name: "TikTok", icon: <Music2 className="text-pink-500" /> },
    { name: "Instagram", icon: <Instagram className="text-purple-500" /> },
    { name: "Facebook", icon: <Facebook className="text-blue-500" /> },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl md:text-7xl font-black mb-4 bg-gradient-to-r from-white via-slate-300 to-slate-500 bg-clip-text text-transparent">
          ALL-IN-ONE
        </h1>
        <p className="text-xl text-slate-400 font-medium">
          Download high-quality videos from your favorite platforms instantly.
        </p>
      </motion.div>

      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {platforms.map((p) => (
          <Badge key={p.name} variant="outline" className="px-4 py-2 bg-white/5 border-white/10 text-white flex gap-2 items-center">
            {p.icon}
            {p.name}
          </Badge>
        ))}
      </div>

      <Card className="bg-slate-900/50 border-white/10 backdrop-blur-xl shadow-2xl overflow-hidden">
        <CardHeader className="pb-4">
          <CardTitle className="text-white flex items-center gap-2">
            <LinkIcon size={20} className="text-indigo-400" />
            Paste Video URL
          </CardTitle>
          <CardDescription className="text-slate-400">
            Support for YouTube, TikTok, Instagram, Facebook, and more.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Input
                placeholder="https://www.youtube.com/watch?v=..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="bg-slate-950/50 border-white/10 text-white h-14 pl-4 pr-12 text-lg focus:ring-indigo-500"
              />
              {url && (
                <button 
                  onClick={() => setUrl("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>
            <ThreeDButton 
              onClick={handleDownload} 
              disabled={loading || !url}
              className="h-14 px-8"
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  <Download size={20} />
                  Download
                </>
              )}
            </ThreeDButton>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center gap-3"
              >
                <AlertCircle size={20} />
                {error}
              </motion.div>
            )}

            {videoInfo && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-12 space-y-8"
              >
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="w-full md:w-1/3 aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-lg">
                    <img 
                      src={videoInfo.thumbnail} 
                      alt="Thumbnail" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-indigo-500/20 text-indigo-400 border-indigo-500/30">
                        {videoInfo.platform}
                      </Badge>
                      <span className="text-slate-500 text-sm">{videoInfo.duration}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white leading-tight">
                      {videoInfo.title}
                    </h3>
                    <div className="flex items-center gap-2 text-green-400 text-sm font-medium">
                      <CheckCircle2 size={16} />
                      Ready to download
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {videoInfo.formats.map((format, i) => (
                    <div 
                      key={i}
                      className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group flex items-center justify-between"
                    >
                      <div>
                        <div className="text-white font-bold flex items-center gap-2">
                          {format.quality}
                          <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4 bg-slate-800 text-slate-400">
                            {format.ext.toUpperCase()}
                          </Badge>
                        </div>
                        <div className="text-slate-500 text-xs mt-1">{format.size}</div>
                      </div>
                      <ThreeDButton 
                        onClick={() => window.open(format.url, "_blank")}
                        className="px-4 py-2 text-sm h-10 bg-indigo-600/20 border-indigo-500/30 shadow-none hover:bg-indigo-600"
                      >
                        <Download size={14} />
                        Get
                      </ThreeDButton>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { title: "Fast & Secure", desc: "Our servers process downloads at lightning speed with end-to-end encryption." },
          { title: "No Limits", desc: "Download as many videos as you want, completely free of charge." },
          { title: "High Quality", desc: "Get videos in 4K, 1080p, or extract high-fidelity audio easily." }
        ].map((feature, i) => (
          <div key={i} className="p-6 rounded-3xl bg-white/5 border border-white/10">
            <h4 className="text-white font-bold mb-2">{feature.title}</h4>
            <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
