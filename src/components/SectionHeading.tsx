import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  accentColor?: "cyan" | "gold";
}

const SectionHeading = ({ title, subtitle, align = "center", accentColor = "cyan" }: SectionHeadingProps) => {
  const alignClass = align === "center" ? "text-center" : "text-left";
  const barColor = accentColor === "cyan" ? "bg-brand-cyan" : "bg-brand-gold";
  const barAlign = align === "center" ? "mx-auto" : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`mb-16 ${alignClass}`}
    >
      <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">{title}</h2>
      <div className={`h-1 w-16 ${barColor} mt-4 rounded-full ${barAlign}`} />
      {subtitle && (
        <p className="text-muted-foreground mt-4 max-w-2xl text-lg font-body leading-relaxed mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeading;
