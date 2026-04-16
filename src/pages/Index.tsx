import { AnimatePresence, motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { Brain, Handshake, FlaskConical, Cpu, ChevronDown, Play, Star, ArrowRight } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import AIHeroBackground from "@/components/AIHeroBackground";
import GlowButton from "@/components/GlowButton";
import GlassCard from "@/components/GlassCard";
import AnimatedCounter from "@/components/AnimatedCounter";
import SectionHeading from "@/components/SectionHeading";
import { AboutContent } from "./About";
import { ServicesContent } from "./Services";
import { SolutionsContent } from "./Solutions";
import { ResearchContent } from "./Research";
import { ContactContent } from "./Contact";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

const SectionTransition = ({ id, children }: { id: string; children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.25 });

  return (
    <motion.div
      ref={ref}
      id={id}
      className="scroll-mt-28"
      initial={false}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 1, y: 20 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const services = [
  { icon: Brain, title: "AI Software & Solutions", desc: "Enterprise and consumer AI applications built to scale." },
  { icon: Handshake, title: "AI Consultancy", desc: "Strategic advisory from data strategy to model deployment." },
  { icon: FlaskConical, title: "R&D in AI", desc: "Frontier research advancing neural architectures and edge AI." },
  { icon: Cpu, title: "AI Hardware & Devices", desc: "Smart sensors to full integrated hardware-software platforms." },
];

const marqueeItems = ["Computer Vision", "NLP", "Predictive Analytics", "Edge AI", "Smart Automation", "Neural Networks", "AI Chips", "Robotics"];

const testimonials = [
  { quote: "BeaconIQ transformed our manufacturing pipeline with predictive AI that reduced downtime by 40%.", name: "Sarah Chen", company: "TechCorp Global", rating: 5 },
  { quote: "Their consultancy team helped us build an ML infrastructure that scales seamlessly across regions.", name: "Marcus Webb", company: "FinanceFlow Inc", rating: 5 },
  { quote: "The edge AI hardware they designed for our logistics fleet is nothing short of revolutionary.", name: "Aisha Patel", company: "LogiSmart", rating: 5 },
];

const Index = () => {
  const location = useLocation();

  const secondLineWords = ["Intelligent", "Adaptive", "Autonomous", "Data-Driven", "Future-Ready"];
  const [secondIdx, setSecondIdx] = useState(0);

  useEffect(() => {
    const t = window.setInterval(() => {
      setSecondIdx((i) => (i + 1) % secondLineWords.length);
    }, 2200);
    return () => window.clearInterval(t);
  }, []);

  useEffect(() => {
    const id = location.hash?.replace("#", "");
    if (!id) {
      // When hash is cleared (e.g. /#about -> /), return to top.
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      return;
    }

    const scroll = () => {
      const el = document.getElementById(id);
      if (!el) return;
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    // Wait for layout/animations so scroll lands correctly.
    requestAnimationFrame(() => requestAnimationFrame(scroll));
  }, [location.hash]);

  return (
    <PageTransition>
    {/* Hero */}
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-navy via-background to-background" />
      <AIHeroBackground />
      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-4xl mx-auto">
          <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[0.95] mb-6">
            <span className="text-foreground">Intelligence</span>
            <br />
            <span className="text-gradient-cyan">Engineered for Tomorrow</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 font-body leading-relaxed">
            We design, build, and deploy AI-driven software, hardware, and intelligent systems that redefine what's possible.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/#solutions">
              <GlowButton variant="cyan" size="lg">Explore Solutions</GlowButton>
            </Link>
          </motion.div>
        </motion.div>
      </div>
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground"
      >
        <ChevronDown size={28} />
      </motion.div>
    </section>

    {/* Stats */}
    <section className="py-20 border-y border-border">
      <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        <AnimatedCounter end={150} suffix="+" label="AI Projects" />
        <AnimatedCounter end={40} suffix="+" label="Enterprise Clients" />
        <AnimatedCounter end={12} suffix="" label="R&D Patents" />
        <AnimatedCounter end={8} suffix="" label="Global Markets" />
      </div>
    </section>

    {/* Services */}
    <section className="py-24">
      <div className="container mx-auto px-6">
        <SectionHeading title="What We Do" subtitle="End-to-end AI capabilities spanning software, hardware, research, and consulting." />
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {services.map((s, i) => (
            <motion.div key={i} variants={fadeUp}>
              <GlassCard className="h-full group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center shrink-0 group-hover:bg-brand-cyan/20 transition-colors">
                    <s.icon size={22} className="text-brand-cyan" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-lg text-foreground mb-2">{s.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>

    {/* Marquee */}
    <section className="py-8 border-y border-border overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...marqueeItems, ...marqueeItems].map((item, i) => (
          <span key={i} className="mx-8 text-lg font-display font-semibold text-muted-foreground/40">
            {item} <span className="text-brand-cyan/30 mx-4">·</span>
          </span>
        ))}
      </div>
    </section>

    {/* Why Choose Us */}
    <section className="py-24">
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground leading-tight">
            <span className="text-gradient-cyan">Built</span>{" "}
            <span className="inline-block align-baseline text-brand-gold">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={secondLineWords[secondIdx]}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="inline-block"
                >
                  {secondLineWords[secondIdx]}.
                </motion.span>
              </AnimatePresence>
            </span>
          </h2>
        </motion.div>
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-6">
          {[
            "End-to-end AI lifecycle expertise — from ideation to production",
            "Custom hardware + software integration for maximum performance",
            "Research-backed, production-ready systems trusted by enterprises",
          ].map((text, i) => (
            <motion.div key={i} variants={fadeUp} className="flex items-start gap-4">
              <div className="w-2 h-2 rounded-full bg-brand-cyan mt-2.5 shrink-0" />
              <p className="text-muted-foreground leading-relaxed">{text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>

    {/* Testimonials */}
    <section className="py-24 bg-brand-navy/20">
      <div className="container mx-auto px-6">
        <SectionHeading title="What Our Clients Say" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}>
              <GlassCard className="h-full flex flex-col justify-between">
                <div>
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} size={14} className="text-brand-gold fill-brand-gold" />
                    ))}
                  </div>
                  <p className="text-foreground text-sm leading-relaxed mb-6">"{t.quote}"</p>
                </div>
                <div>
                  <p className="font-display font-semibold text-sm text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.company}</p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA Banner */}
    <section className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="rounded-2xl glass p-12 md:p-20 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-brand-cyan/5 via-transparent to-brand-gold/5" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">Ready to Build the Future?</h2>
            <p className="text-muted-foreground mb-8 text-lg">Let's talk about your AI transformation.</p>
            <Link to="/#contact">
              <GlowButton variant="gold" size="lg">
                <span className="flex items-center gap-2">Schedule a Call <ArrowRight size={18} /></span>
              </GlowButton>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>

    {/* One-page sections */}
    <SectionTransition id="about">
      <AboutContent />
    </SectionTransition>
    <SectionTransition id="services">
      <ServicesContent />
    </SectionTransition>
    <SectionTransition id="solutions">
      <SolutionsContent />
    </SectionTransition>
    <SectionTransition id="research">
      <ResearchContent />
    </SectionTransition>
    <SectionTransition id="contact">
      <ContactContent />
    </SectionTransition>
  </PageTransition>
  );
};

export default Index;
