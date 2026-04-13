import React from "react";
import { 
  Home, 
  Activity, 
  Bug, 
  Code, 
  Mail, 
  Crown,
  Menu
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThreeDButton } from "./ThreeDButton";

export const DrawerNav = () => {
  const menuItems = [
    { icon: <Home size={20} />, label: "Home", color: "from-blue-500 to-indigo-600" },
    { icon: <Activity size={20} />, label: "Status", color: "from-green-500 to-emerald-600" },
    { icon: <Bug size={20} />, label: "Report Bug", color: "from-red-500 to-orange-600" },
    { icon: <Code size={20} />, label: "Developers Contact", color: "from-purple-500 to-pink-600" },
    { icon: <Mail size={20} />, label: "Contact", color: "from-cyan-500 to-blue-600" },
    { icon: <Crown size={20} />, label: "Premium Purchase", color: "from-yellow-500 to-amber-600" },
  ];

  const handleMenuClick = (label: string) => {
    if (label === "Home") {
      window.location.href = "/";
    } else if (["Report Bug", "Developers Contact", "Contact"].includes(label)) {
      window.location.href = "mailto:itsshani21@gmail.com";
    } else if (label === "Status") {
      window.open("https://stats.uptimerobot.com", "_blank");
    } else if (label === "Premium Purchase") {
      // This will be handled by a state in App.tsx or a separate modal
      const event = new CustomEvent('open-premium-modal');
      window.dispatchEvent(event);
    }
  };

  return (
    <Sheet>
      <SheetTrigger render={
        <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <Menu className="text-white" size={28} />
        </button>
      } />
      <SheetContent side="left" className="bg-slate-950 border-slate-800 text-white w-80">
        <SheetHeader className="mb-8">
          <SheetTitle className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Navigation
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-6">
          {menuItems.map((item, index) => (
            <ThreeDButton 
              key={index} 
              className={`w-full justify-start bg-gradient-to-br ${item.color} border-none shadow-none hover:shadow-lg`}
              onClick={() => handleMenuClick(item.label)}
            >
              {item.icon}
              <span>{item.label}</span>
            </ThreeDButton>
          ))}
        </div>
        <div className="absolute bottom-8 left-6 right-6 p-4 rounded-2xl bg-white/5 border border-white/10">
          <p className="text-xs text-slate-400 text-center">
            v1.0.0 - Built with ❤️ for Creators
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
};
