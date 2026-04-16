import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import GlassCard from "@/components/GlassCard";
import GlowButton from "@/components/GlowButton";

export const ContactContent = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", company: "", service: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputClass = "w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 text-foreground text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:border-brand-cyan/50 focus:ring-1 focus:ring-brand-cyan/20 transition-all";

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 text-center">
        <div className="container mx-auto px-6">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-7xl font-display font-bold text-foreground">
            Let's Build Something <span className="text-gradient-cyan">Extraordinary</span>
          </motion.h1>
        </div>
      </section>

      {/* Form + Info */}
      <section className="pb-24">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <GlassCard hoverLift={false} className="p-8">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-16 text-center">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.2 }}>
                      <CheckCircle size={64} className="text-brand-cyan mb-4" />
                    </motion.div>
                    <h3 className="font-display font-bold text-2xl text-foreground mb-2">Message Sent!</h3>
                    <p className="text-muted-foreground">We'll get back to you within 24 hours.</p>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input type="text" required placeholder="Your Name" className={inputClass} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                      <input type="email" required placeholder="Email Address" className={inputClass} value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                    </div>
                    <input type="text" placeholder="Company" className={inputClass} value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} />
                    <select className={inputClass} value={formData.service} onChange={(e) => setFormData({ ...formData, service: e.target.value })}>
                      <option value="">Select a Service</option>
                      <option value="software">AI Software & Solutions</option>
                      <option value="consultancy">AI & ML Consultancy</option>
                      <option value="research">Research & Development</option>
                      <option value="hardware">AI Hardware & Systems</option>
                    </select>
                    <textarea rows={5} required placeholder="Tell us about your project..." className={inputClass} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
                    <GlowButton type="submit" variant="cyan" size="lg" className="w-full">
                      <span className="flex items-center justify-center gap-2"><Send size={16} /> Send Message</span>
                    </GlowButton>
                  </motion.form>
                )}
              </AnimatePresence>
            </GlassCard>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="space-y-6">
            {[
              { icon: Mail, label: "Email", value: "thrive@thrivebrands.ai" },
              { icon: Phone, label: "Contact No.", value: "+91 7042034877" },
              { icon: MapPin, label: "Address", value: "123 Innovation Drive, San Francisco, CA 94105" },
              { icon: Clock, label: "Office Hours", value: "Mon — Fri, 9:00 AM — 6:00 PM PST" },
            ].map((item, i) => (
              <GlassCard key={i} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center shrink-0">
                  <item.icon size={18} className="text-brand-cyan" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                  <p className="text-foreground font-body">{item.value}</p>
                </div>
              </GlassCard>
            ))}

            <GlassCard hoverLift={false} className="h-48 flex items-center justify-center">
              <div className="text-center">
                <MapPin size={32} className="text-brand-cyan/30 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Map placeholder</p>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>
    </>
  );
};

const Contact = () => (
  <PageTransition>
    <ContactContent />
  </PageTransition>
);

export default Contact;
