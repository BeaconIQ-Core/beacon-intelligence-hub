import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: "cyan" | "gold";
  hoverLift?: boolean;
}

const GlassCard = ({ children, className = "", glowColor = "cyan", hoverLift = true }: GlassCardProps) => {
  const glowClass = glowColor === "cyan"
    ? "hover:border-brand-cyan/30 hover:shadow-[0_0_30px_hsl(193_100%_50%/0.1)]"
    : "hover:border-brand-gold/30 hover:shadow-[0_0_30px_hsl(40_95%_48%/0.1)]";

  return (
    <motion.div
      whileHover={hoverLift ? { y: -6 } : undefined}
      transition={{ duration: 0.3 }}
      className={`glass rounded-xl p-6 transition-all duration-300 ${glowClass} ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
