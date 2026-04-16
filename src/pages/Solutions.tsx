import { motion } from "framer-motion";
import { Heart, Factory, BarChart3, ShoppingBag, Truck, GraduationCap, Eye, MessageSquare, Cpu, ArrowRight } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import SectionHeading from "@/components/SectionHeading";
import GlassCard from "@/components/GlassCard";
import GlowButton from "@/components/GlowButton";
import { Link } from "react-router-dom";

const fadeUp = { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

const industries = [
  { icon: Heart, name: "Healthcare", desc: "AI-powered diagnostics, drug discovery, and patient care optimization." },
  { icon: Factory, name: "Manufacturing", desc: "Predictive maintenance, quality control, and smart production lines." },
  { icon: BarChart3, name: "Finance", desc: "Algorithmic trading, fraud detection, and risk analytics." },
  { icon: ShoppingBag, name: "Retail", desc: "Personalized recommendations, demand forecasting, and inventory AI." },
  { icon: Truck, name: "Logistics", desc: "Route optimization, fleet management, and supply chain intelligence." },
  { icon: GraduationCap, name: "Education", desc: "Adaptive learning, automated grading, and student analytics." },
];

const products = [
  { icon: Eye, name: "BeaconVision", tagline: "Computer Vision Platform", specs: ["Real-time object detection", "Multi-camera support", "Edge-optimized inference", "Custom model training"] },
  { icon: MessageSquare, name: "BeaconMind", tagline: "NLP & Conversational AI Suite", specs: ["Multi-language support", "Intent recognition", "Document understanding", "Voice integration"] },
  { icon: Cpu, name: "BeaconEdge", tagline: "Edge AI Hardware Platform", specs: ["Sub-10ms inference", "Ultra-low power", "Modular design", "OTA updates"] },
];

const logos = ["AWS", "Azure", "GCP", "Python", "TensorFlow", "NVIDIA", "PyTorch", "Docker"];

export const SolutionsContent = () => (
  <>
    {/* Hero */}
    <section className="pt-32 pb-20 text-center">
      <div className="container mx-auto px-6">
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-7xl font-display font-bold text-foreground">
          Intelligent Solutions for <span className="text-gradient-cyan">Every Industry</span>
        </motion.h1>
      </div>
    </section>

    {/* Industries */}
    <section className="py-20">
      <div className="container mx-auto px-6">
        <SectionHeading title="Industries We Serve" />
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {industries.map((ind, i) => (
            <motion.div key={i} variants={fadeUp}>
              <GlassCard className="h-full group">
                <ind.icon size={28} className="text-brand-cyan mb-4" />
                <h3 className="font-display font-semibold text-foreground mb-2">{ind.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{ind.desc}</p>
                <span className="text-brand-cyan text-xs font-semibold mt-4 inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">Learn More <ArrowRight size={12} /></span>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>

    {/* Products */}
    <section className="py-24 bg-brand-navy/20">
      <div className="container mx-auto px-6">
        <SectionHeading title="Product Showcase" subtitle="Our flagship AI platforms built for performance at scale." />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {products.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}>
              <GlassCard className="h-full flex flex-col">
                <div className="w-12 h-12 rounded-lg bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center mb-4">
                  <p.icon size={24} className="text-brand-cyan" />
                </div>
                <h3 className="font-display font-bold text-xl text-foreground">{p.name}</h3>
                <p className="text-brand-cyan text-sm mb-4">{p.tagline}</p>
                <div className="space-y-2 flex-1">
                  {p.specs.map((s, j) => (
                    <div key={j} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-cyan/50" />
                      {s}
                    </div>
                  ))}
                </div>
                <Link to="/contact" className="mt-6">
                  <GlowButton variant="ghost" size="sm" className="w-full">Request Demo</GlowButton>
                </Link>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Integration */}
    <section className="py-16 border-y border-border">
      <div className="container mx-auto px-6 text-center">
        <p className="text-sm text-muted-foreground mb-8 font-display">Works with your stack</p>
        <div className="flex flex-wrap justify-center gap-8">
          {logos.map((logo) => (
            <motion.div key={logo} whileHover={{ scale: 1.1 }} className="px-6 py-3 glass rounded-lg text-muted-foreground font-display font-semibold text-sm hover:text-brand-cyan hover:border-brand-cyan/30 transition-colors">
              {logo}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </>
);

const Solutions = () => (
  <PageTransition>
    <SolutionsContent />
  </PageTransition>
);

export default Solutions;
