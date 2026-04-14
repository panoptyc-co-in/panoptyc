import React from "react";
import { Zap, Send, Globe } from "lucide-react";

const CTASection = ({ onApply }) => {
  return (
    <section className="py-24 relative overflow-hidden bg-[#111827]">
      {/* Background accent */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(239,68,68,0.2) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-medium tracking-wider px-3.5 py-1.5 rounded-lg mb-8" style={{ color: "#EF4444", background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.15)" }}>
          <Zap className="w-3.5 h-3.5" />
          Positions filling fast
        </span>

        <h2 className="text-[36px] md:text-[44px] font-extrabold text-white mb-5 leading-[1.1] tracking-tight">
          Ready to Start Your Career<br />
          with Panoptyc?
        </h2>

        <p className="text-[15px] mb-10 max-w-2xl mx-auto" style={{ color: "#94A3B8", lineHeight: '1.6' }}>
          Join our growing team of remote analysts and help protect thousands of retail stores. Apply today — It only takes 2 minutes.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={onApply}
            className="inline-flex items-center justify-center gap-2 px-8 py-[12px] rounded-full font-bold text-white text-[15px] transition-all duration-200 hover:scale-105 active:scale-95 shadow-[0_0_24px_rgba(239,68,68,0.35)]"
            style={{ backgroundColor: "#EF4444" }}
          >
            <Send className="w-[18px] h-[18px]" strokeWidth={2} />
            Apply Now
          </button>
          
          <a
            href="https://panoptyc.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-[12px] rounded-full font-bold text-white text-[15px] transition-all duration-200 hover:bg-white/10"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <Globe className="w-[18px] h-[18px]" strokeWidth={2} />
            Visit Panoptyc.com
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTASection;