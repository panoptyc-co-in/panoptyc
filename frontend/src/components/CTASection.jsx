import React from "react";
import { Navigation2, ExternalLink } from "lucide-react";

const CTASection = ({ onApply }) => {
  return (
    <section className="py-24 relative overflow-hidden" style={{ backgroundColor: "#1a1f2e" }}>
      {/* Background accent */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(239,68,68,0.3) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-6" style={{ color: "#EF4444", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>
          Positions filling fast
        </span>

        <h2 className="text-4xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
          Ready to Start Your Career<br />
          <span style={{ color: "#EF4444" }}>with Panoptyc?</span>
        </h2>

        <p className="text-xl mb-10 max-w-2xl mx-auto" style={{ color: "#9CA3AF" }}>
          Join our growing team of remote analysts and help protect thousands of retail stores. Apply today — it only takes 2 minutes.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onApply}
            className="inline-flex items-center justify-center gap-2.5 px-10 py-4 rounded-xl font-bold text-white text-lg transition-all duration-200 hover:scale-105 active:scale-95 shadow-xl"
            style={{ backgroundColor: "#EF4444" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#DC2626")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#EF4444")}
          >
            <Navigation2 className="w-5 h-5" />
            Apply Now
          </button>
          <a
            href="https://panoptyc.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 px-10 py-4 rounded-xl font-bold text-white text-lg transition-all duration-200 hover:bg-white/10"
            style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)" }}
          >
            Visit Panoptyc.com
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTASection;