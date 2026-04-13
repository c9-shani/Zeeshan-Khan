import React from "react";
import { motion, HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";

interface ThreeDButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  className?: string;
}

export const ThreeDButton = ({ children, className, ...props }: ThreeDButtonProps) => {
  // Destructure asChild to prevent it from leaking to the DOM if passed by a parent
  const { asChild, ...motionProps } = props as any;

  return (
    <motion.button
      whileHover={{ 
        scale: 1.05,
        rotateX: 10,
        rotateY: -10,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)"
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      className={cn(
        "relative px-6 py-3 rounded-xl font-bold text-white transition-all duration-200",
        "bg-gradient-to-br from-indigo-600 to-purple-700",
        "border-b-4 border-indigo-900 active:border-b-0 active:translate-y-1",
        "shadow-[0_4px_0_0_rgba(49,46,129,1)]",
        className
      )}
      style={{ transformStyle: "preserve-3d" }}
      {...motionProps}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  );
};
