/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { DrawerNav } from "./components/DrawerNav";
import { VideoDownloader } from "./components/VideoDownloader";
import { PremiumModal } from "./components/PremiumModal";
import { Toaster } from "sonner";

export default function App() {
  const [isPremiumOpen, setIsPremiumOpen] = useState(false);

  useEffect(() => {
    const handleOpenPremium = () => setIsPremiumOpen(true);
    window.addEventListener('open-premium-modal', handleOpenPremium);
    return () => window.removeEventListener('open-premium-modal', handleOpenPremium);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-indigo-500/30">
      {/* Watermark */}
      <div className="fixed top-0 left-0 right-0 z-[100] pointer-events-none flex justify-center">
        <div className="bg-indigo-600/10 backdrop-blur-sm border-x border-b border-white/5 px-4 py-1 rounded-b-lg">
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-indigo-400/50">
            Developer C9-SHANICE Exploiters
          </span>
        </div>
      </div>
      <PremiumModal isOpen={isPremiumOpen} onClose={() => setIsPremiumOpen(false)} />
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-indigo-600/20 blur-[120px] rounded-full" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full" />
      </div>

      <header className="relative z-50 border-b border-white/5 backdrop-blur-md bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <DrawerNav />
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <span className="text-white font-black text-xl">V</span>
              </div>
              <span className="text-xl font-bold tracking-tight hidden sm:block">
                C9-SHANICE<span className="text-indigo-400"> Exploiters</span>
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => window.location.href = "mailto:itsshani21@gmail.com"}
              className="hidden md:block text-sm font-medium text-slate-400 hover:text-white transition-colors"
            >
              Support
            </button>
            <button 
              onClick={() => setIsPremiumOpen(true)}
              className="px-5 py-2 rounded-full bg-white text-slate-950 text-sm font-bold hover:bg-slate-200 transition-colors"
            >
              Get Premium
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        <VideoDownloader />
      </main>

      <footer className="relative z-10 py-12 border-t border-white/5 bg-slate-950/80">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-500 text-sm">
            © 2026 C9-SHANICE Exploiters. All rights reserved.
          </p>
          <div className="flex justify-center gap-6 mt-4">
            <a href="#" className="text-slate-500 hover:text-white text-xs transition-colors">Privacy Policy</a>
            <a href="#" className="text-slate-500 hover:text-white text-xs transition-colors">Terms of Service</a>
            <a href="#" className="text-slate-500 hover:text-white text-xs transition-colors">Contact Us</a>
          </div>
        </div>
      </footer>

      <Toaster position="bottom-right" theme="dark" />
    </div>
  );
}

