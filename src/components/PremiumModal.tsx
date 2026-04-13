import React from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/dialog";
import { ThreeDButton } from "./ThreeDButton";
import { Check, Smartphone, CreditCard, Zap } from "lucide-react";

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PremiumModal = ({ isOpen, onClose }: PremiumModalProps) => {
  const plans = [
    {
      name: "Monthly",
      price: "Rs. 500",
      features: ["Unlimited Downloads", "4K Quality", "No Ads", "Priority Support"],
      icon: <Zap className="text-yellow-400" />
    },
    {
      name: "Yearly",
      price: "Rs. 4500",
      features: ["Everything in Monthly", "Batch Downloading", "Cloud Storage", "Early Access"],
      icon: <Zap className="text-yellow-400" />,
      popular: true
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-950 border-slate-800 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-center bg-gradient-to-r from-yellow-400 to-amber-600 bg-clip-text text-transparent">
            Upgrade to Premium
          </DialogTitle>
          <DialogDescription className="text-center text-slate-400">
            Get the best experience with high-speed downloads and no limits.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {plans.map((plan) => (
            <div 
              key={plan.name}
              className={`relative p-6 rounded-3xl border ${plan.popular ? 'border-yellow-500/50 bg-yellow-500/5' : 'border-white/10 bg-white/5'} flex flex-col`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-yellow-500 text-black text-[10px] font-bold rounded-full uppercase tracking-widest">
                  Best Value
                </span>
              )}
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 rounded-xl bg-white/10">{plan.icon}</div>
                <div className="text-right">
                  <div className="text-sm text-slate-400">{plan.name}</div>
                  <div className="text-2xl font-bold">{plan.price}</div>
                </div>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-slate-300">
                    <Check size={14} className="text-green-500" />
                    {f}
                  </li>
                ))}
              </ul>
              <ThreeDButton 
                className={`w-full ${plan.popular ? 'bg-gradient-to-r from-yellow-500 to-amber-600' : 'bg-slate-800'}`}
                onClick={() => alert("Redirecting to payment gateway...")}
              >
                Choose {plan.name}
              </ThreeDButton>
            </div>
          ))}
        </div>

        <div className="mt-8 p-6 rounded-3xl bg-indigo-600/10 border border-indigo-500/20">
          <h4 className="font-bold mb-4 flex items-center gap-2">
            <CreditCard size={18} className="text-indigo-400" />
            Payment Methods (Pakistan)
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="w-10 h-10 rounded-lg bg-[#00A94F] flex items-center justify-center font-bold text-white text-xs">
                EP
              </div>
              <div>
                <div className="text-sm font-bold">Easypaisa</div>
                <div className="text-[10px] text-slate-500">Instant Activation</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="w-10 h-10 rounded-lg bg-[#D00000] flex items-center justify-center font-bold text-white text-xs">
                JC
              </div>
              <div>
                <div className="text-sm font-bold">JazzCash</div>
                <div className="text-[10px] text-slate-500">Instant Activation</div>
              </div>
            </div>
          </div>
          <p className="text-[10px] text-slate-500 mt-4 text-center italic">
            * After payment, send screenshot to itsshani21@gmail.com for manual activation if needed.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
