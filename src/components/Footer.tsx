import { Link } from "react-router-dom";
import { Linkedin, Twitter, Github } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border bg-brand-navy/30">
    <div className="container mx-auto px-6 py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-lg bg-brand-cyan/20 border border-brand-cyan/40 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-sm bg-brand-cyan" />
            </div>
            <span className="font-display font-bold text-lg text-foreground">
              Beacon<span className="text-brand-cyan">IQ</span>
            </span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Engineering intelligence for tomorrow's world. AI-driven software, hardware, and integrated solutions.
          </p>
        </div>

        <div>
          <h4 className="font-display font-semibold text-foreground mb-4">Services</h4>
          <div className="flex flex-col gap-2.5">
            {["AI Software", "Consultancy", "R&D", "Hardware"].map((s) => (
              <Link key={s} to="/services" className="text-sm text-muted-foreground hover:text-brand-cyan transition-colors">{s}</Link>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display font-semibold text-foreground mb-4">Company</h4>
          <div className="flex flex-col gap-2.5">
            {[{ name: "About", path: "/about" }, { name: "Research", path: "/research" }, { name: "Solutions", path: "/solutions" }, { name: "Contact", path: "/contact" }].map((l) => (
              <Link key={l.name} to={l.path} className="text-sm text-muted-foreground hover:text-brand-cyan transition-colors">{l.name}</Link>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display font-semibold text-foreground mb-4">Contact</h4>
          <div className="flex flex-col gap-2.5 text-sm text-muted-foreground">
            <span>thrive@thrivebrands.ai</span>
            <span>+91 7042034877</span>
            <span>San Francisco, CA</span>
          </div>
          <div className="flex gap-3 mt-4">
            {[Linkedin, Twitter, Github].map((Icon, i) => (
              <a key={i} href="#" className="w-9 h-9 rounded-lg glass flex items-center justify-center text-muted-foreground hover:text-brand-cyan hover:border-brand-cyan/30 transition-all">
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-border text-center text-xs text-muted-foreground">
        © 2025 BeaconIQ. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
