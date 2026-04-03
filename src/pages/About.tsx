import { motion } from "framer-motion";
import { Target, Eye, Lightbulb, Shield, Sparkles, Linkedin } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import SectionHeading from "@/components/SectionHeading";
import GlassCard from "@/components/GlassCard";

const fadeUp = { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

const timeline = [
  { year: "2019", title: "Founded", desc: "BeaconIQ established with a vision to democratize intelligent systems." },
  { year: "2020", title: "First Enterprise Client", desc: "Deployed AI-driven analytics for a Fortune 500 manufacturer." },
  { year: "2021", title: "R&D Lab Launched", desc: "Opened our dedicated research lab focused on edge AI and neural architectures." },
  { year: "2022", title: "Hardware Division", desc: "Launched AI hardware manufacturing for edge devices and smart sensors." },
  { year: "2023", title: "Global Expansion", desc: "Expanded operations to 8 international markets across 3 continents." },
  { year: "2024", title: "12 Patents Filed", desc: "Achieved milestone of 12 AI-related patents in computer vision and NLP." },
];

const team = [
  { name: "Dr. Elena Vasquez", role: "CEO & Co-Founder" },
  { name: "James Okonkwo", role: "CTO" },
  { name: "Mei Lin Zhang", role: "VP of Research" },
  { name: "David Kurosawa", role: "Head of Hardware" },
  { name: "Priya Sharma", role: "Director of AI Solutions" },
  { name: "Alex Petrov", role: "Head of Engineering" },
];

const About = () => (
  <PageTransition>
    {/* Hero */}
    <section className="pt-32 pb-20">
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground leading-tight mb-6">
            We Are The Engineers of <span className="text-gradient-cyan">Intelligence</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            BeaconIQ was born from the belief that AI should not just be powerful — it should be purposeful, accessible, and deeply integrated into the fabric of how businesses and societies operate.
          </p>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="flex justify-center">
          <div className="w-72 h-72 rounded-full bg-gradient-to-br from-brand-cyan/20 to-brand-gold/10 border border-brand-cyan/20 flex items-center justify-center animate-float">
            <div className="w-48 h-48 rounded-full bg-gradient-to-tr from-brand-cyan/10 to-transparent border border-brand-cyan/10 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-brand-cyan/10 border border-brand-cyan/30" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>

    {/* Mission & Vision */}
    <section className="py-24 bg-brand-navy/20">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        {[
          { icon: Target, title: "Our Mission", text: "To democratize intelligent systems and make AI-driven solutions accessible to every organization ready to transform." },
          { icon: Eye, title: "Our Vision", text: "A world where AI enhances every human endeavor — amplifying creativity, efficiency, and discovery across all industries." },
        ].map((item, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}>
            <GlassCard className="h-full text-center p-10">
              <div className="w-14 h-14 rounded-xl bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center mx-auto mb-6">
                <item.icon size={26} className="text-brand-cyan" />
              </div>
              <h3 className="font-display font-bold text-xl text-foreground mb-3">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.text}</p>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </section>

    {/* Timeline */}
    <section className="py-24">
      <div className="container mx-auto px-6">
        <SectionHeading title="Our Story" subtitle="Key milestones on our journey to engineering intelligence." />
        <div className="max-w-2xl mx-auto relative">
          <div className="absolute left-[19px] top-0 bottom-0 w-px bg-border" />
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-10">
            {timeline.map((item, i) => (
              <motion.div key={i} variants={fadeUp} className="relative pl-12">
                <div className="absolute left-3 top-1.5 w-3 h-3 rounded-full bg-brand-cyan border-2 border-background" />
                <span className="text-sm font-display font-semibold text-brand-cyan">{item.year}</span>
                <h4 className="font-display font-semibold text-foreground mt-1">{item.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>

    {/* Team */}
    <section className="py-24 bg-brand-navy/20">
      <div className="container mx-auto px-6">
        <SectionHeading title="Our Leadership" subtitle="The minds driving BeaconIQ's mission forward." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {team.map((member, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
              <GlassCard className="text-center group">
                <div className="w-20 h-20 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-display font-bold text-brand-cyan">{member.name.charAt(0)}</span>
                </div>
                <h4 className="font-display font-semibold text-foreground">{member.name}</h4>
                <p className="text-sm text-muted-foreground mt-1">{member.role}</p>
                <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Linkedin size={16} className="text-brand-cyan mx-auto" />
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Values */}
    <section className="py-24">
      <div className="container mx-auto px-6">
        <SectionHeading title="Culture & Values" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            { icon: Lightbulb, title: "Innovation", desc: "We push boundaries, question assumptions, and pioneer new approaches to intelligent systems." },
            { icon: Shield, title: "Integrity", desc: "Ethical AI is non-negotiable. We build responsibly and transparently." },
            { icon: Sparkles, title: "Impact", desc: "Every project must create measurable value — for businesses, communities, and the world." },
          ].map((v, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}>
              <GlassCard className="text-center h-full p-8">
                <v.icon size={36} className="text-brand-gold mx-auto mb-4" />
                <h4 className="font-display font-bold text-lg text-foreground mb-2">{v.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </PageTransition>
);

export default About;
