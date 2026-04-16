import { motion } from "framer-motion";
import { Eye, MessageSquare, Cpu, Brain, ArrowRight } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import SectionHeading from "@/components/SectionHeading";
import GlassCard from "@/components/GlassCard";
import GlowButton from "@/components/GlowButton";
import { Link } from "react-router-dom";

const fadeUp = { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

const areas = [
  { icon: Eye, title: "Computer Vision", desc: "Object detection, segmentation, and visual understanding at the edge." },
  { icon: MessageSquare, title: "Natural Language Processing", desc: "Language models, sentiment analysis, and document intelligence." },
  { icon: Cpu, title: "Edge Computing", desc: "Optimized inference on resource-constrained devices." },
  { icon: Brain, title: "Neural Architecture", desc: "Novel architectures for efficiency, accuracy, and generalization." },
];

const publications = [
  { category: "Computer Vision", title: "Efficient Multi-Scale Feature Fusion for Real-Time Object Detection", date: "March 2024", excerpt: "A novel approach to multi-scale feature fusion achieving SOTA on COCO benchmark with 2x inference speed." },
  { category: "NLP", title: "Domain-Adaptive Pre-training for Low-Resource Language Understanding", date: "January 2024", excerpt: "Techniques for adapting large language models to specialized domains with minimal labeled data." },
  { category: "Edge AI", title: "Neural Architecture Search for Ultra-Low Power Edge Devices", date: "November 2023", excerpt: "Automated discovery of efficient architectures targeting sub-milliwatt inference on microcontrollers." },
];

export const ResearchContent = () => (
  <>
    {/* Hero */}
    <section className="pt-32 pb-20 text-center">
      <div className="container mx-auto px-6">
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-7xl font-display font-bold text-foreground">
          Advancing the Frontier <span className="text-gradient-cyan">of AI</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-lg text-muted-foreground mt-6 max-w-2xl mx-auto">
          Our research lab pioneers breakthroughs in neural architectures, edge computing, and applied AI systems.
        </motion.p>
      </div>
    </section>

    {/* Research Areas */}
    <section className="py-20">
      <div className="container mx-auto px-6">
        <SectionHeading title="Research Areas" />
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {areas.map((a, i) => (
            <motion.div key={i} variants={fadeUp}>
              <GlassCard className="h-full">
                <a.icon size={28} className="text-brand-cyan mb-4" />
                <h3 className="font-display font-semibold text-lg text-foreground mb-2">{a.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{a.desc}</p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>

    {/* Publications */}
    <section className="py-24 bg-brand-navy/20">
      <div className="container mx-auto px-6">
        <SectionHeading title="Latest Publications" subtitle="Insights and findings from our research team." />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {publications.map((pub, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}>
              <GlassCard className="h-full flex flex-col">
                <span className="text-xs font-display font-semibold text-brand-cyan bg-brand-cyan/10 px-3 py-1 rounded-full w-fit mb-4">{pub.category}</span>
                <h3 className="font-display font-semibold text-foreground mb-2 leading-snug">{pub.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{pub.excerpt}</p>
                <div className="flex items-center justify-between mt-6">
                  <span className="text-xs text-muted-foreground">{pub.date}</span>
                  <span className="text-brand-cyan text-xs font-semibold flex items-center gap-1 cursor-pointer hover:underline">Read More <ArrowRight size={12} /></span>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Lab CTA */}
    <section className="py-24">
      <div className="container mx-auto px-6">
        <motion.div initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="rounded-2xl glass p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-cyan/5 via-transparent to-brand-gold/5" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">Our Lab is Where the Future Gets Built</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">We collaborate with leading universities, institutions, and enterprises to push the boundaries of what AI can achieve.</p>
            <Link to="/contact"><GlowButton variant="gold" size="lg">Partner With Us</GlowButton></Link>
          </div>
        </motion.div>
      </div>
    </section>
  </>
);

const Research = () => (
  <PageTransition>
    <ResearchContent />
  </PageTransition>
);

export default Research;
