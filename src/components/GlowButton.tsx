import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlowButtonProps {
  children: ReactNode;
  variant?: "cyan" | "gold" | "ghost";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
}

const GlowButton = ({ children, variant = "cyan", size = "md", onClick, className = "", type = "button" }: GlowButtonProps) => {
  const base = "relative font-display font-semibold tracking-wide rounded-lg transition-all duration-300 overflow-hidden";

  const sizes = {
    sm: "px-5 py-2.5 text-sm",
    md: "px-7 py-3.5 text-sm",
    lg: "px-10 py-4.5 text-base",
  };

  const variants = {
    cyan: "bg-brand-cyan text-brand-white hover:shadow-[0_0_30px_hsl(200_42%_56%/0.4)]",
    gold: "border-2 border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-black hover:shadow-[0_0_30px_hsl(38_82%_77%/0.4)]",
    ghost: "border border-brand-cyan/30 text-brand-white hover:border-brand-cyan/60 hover:bg-brand-cyan/5 hover:shadow-[0_0_20px_hsl(200_42%_56%/0.15)]",
  };

  return (
    <motion.button
      type={type}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
};

export default GlowButton;
