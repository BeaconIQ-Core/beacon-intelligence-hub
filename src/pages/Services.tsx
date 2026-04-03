import { motion } from "framer-motion";
import { Check, Brain, Handshake, FlaskConical, Cpu, ArrowRight } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import SectionHeading from "@/components/SectionHeading";
import GlassCard from "@/components/GlassCard";
import GlowButton from "@/components/GlowButton";
import { Link } from "react-router-dom";

const fadeUp = { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

const services = [
  {
    icon: Brain, title: "AI Software & Solutions",
    desc: "Developing, designing, and distributing AI-driven software and applications tailored for enterprise and consumer use.",
    features: ["Custom ML Model Development", "Intelligent Automation Platforms", "AI-Powered Analytics Dashboards", "Real-time Decision Engines"],
  },
  {
    icon: Handshake, title: "AI & ML Consultancy",
    desc: "Strategic advisory and hands-on implementation across the AI/ML stack — from data strategy to model deployment.",
    features: ["AI Readiness Assessment", "Model Architecture Design", "MLOps Setup & Optimization", "Team Training & Enablement"],
  },
  {
    icon: FlaskConical, title: "Research & Development",
    desc: "Frontier AI research and applied R&D — advancing neural architectures, edge AI, and domain-specific models.",
    features: ["Research Papers & Publications", "POC Development", "Patent Filings", "Academic Collaboration"],
  },
  {
    icon: Cpu, title: "AI Hardware & Integrated Systems",
    desc: "Manufacturing and assembling AI-enabled devices — from smart sensors to full integrated hardware-software platforms.",
    features: ["Edge AI Devices", "Intelligent Systems", "Hardware-Software Co-Design", "IoT Integration"],
  },
];

const steps = ["Discovery", "Strategy", "Design", "Build", "Deploy & Scale"];

const Services = () => (
  <PageTransition>
    {/* Hero */}
    <section className="pt-32 pb-20 text-center">
      <div className="container mx-auto px-6">
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-7xl font-display font-bold text-foreground mb-4">
          Our Services
        </motion.h1>
        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.3, duration: 0.6 }} className="h-1 w-24 bg-brand-cyan mx-auto rounded-full" />
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-lg text-muted-foreground mt-6 max-w-2xl mx-auto">
          Comprehensive AI capabilities — from strategic consulting to production-ready systems.
        </motion.p>
      </div>
    </section>

    {/* Service Sections */}
    {services.map((service, i) => (
      <section key={i} className={`py-20 ${i % 2 === 1 ? "bg-brand-navy/20" : ""}`}>
        <div className="container mx-auto px-6">
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
            <motion.div initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className={i % 2 === 1 ? "lg:order-2" : ""}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center">
                  <service.icon size={24} className="text-brand-cyan" />
                </div>
                <h2 className="text-3xl font-display font-bold text-foreground">{service.title}</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-8">{service.desc}</p>
              <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-3">
                {service.features.map((f, j) => (
                  <motion.div key={j} variants={fadeUp} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-brand-cyan/10 flex items-center justify-center shrink-0">
                      <Check size={12} className="text-brand-cyan" />
                    </div>
                    <span className="text-foreground text-sm">{f}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: i % 2 === 0 ? 40 : -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className={i % 2 === 1 ? "lg:order-1" : ""}>
              <GlassCard hoverLift={false} className="h-48 flex items-center justify-center">
                <service.icon size={64} className="text-brand-cyan/20" />
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>
    ))}

    {/* Process */}
    <section className="py-24">
      <div className="container mx-auto px-6">
        <SectionHeading title="How We Work" subtitle="Our proven 5-step process from discovery to deployment." />
        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {steps.map((step, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex items-center gap-3">
              <GlassCard className="px-6 py-4 text-center">
                <span className="text-brand-cyan font-display font-bold text-lg">{String(i + 1).padStart(2, "0")}</span>
                <p className="text-foreground font-display font-semibold text-sm mt-1">{step}</p>
              </GlassCard>
              {i < steps.length - 1 && <ArrowRight size={16} className="text-muted-foreground hidden sm:block" />}
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-20 bg-brand-navy/20">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-display font-bold text-foreground mb-4">Need a Custom AI Solution?</h2>
        <p className="text-muted-foreground mb-8">Let's discuss how BeaconIQ can accelerate your AI journey.</p>
        <Link to="/contact"><GlowButton variant="cyan" size="lg">Get In Touch</GlowButton></Link>
      </div>
    </section>
  </PageTransition>
);

export default Services;
