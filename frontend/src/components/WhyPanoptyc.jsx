import React from "react";
import { ShoppingCart, ScanLine, Eye, TrendingUp } from "lucide-react";
import { features } from "../mock";

const iconMap = { ShoppingCart, ScanLine, Eye, TrendingUp };

const WhyPanoptyc = () => {
  return (
    <section id="about" className="py-24" style={{ backgroundColor: "#0a0a0a" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4" style={{ color: "#EF4444", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>
            What We Do
          </span>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">
            Why Panoptyc?
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "#9CA3AF" }}>
            Grocers and retail operators turn to Panoptyc to solve their biggest loss prevention challenges
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feat, i) => {
            const Icon = iconMap[feat.icon] || Eye;
            return (
              <div
                key={i}
                className="group rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(239,68,68,0.35)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                  style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}
                >
                  <Icon className="w-7 h-7" style={{ color: "#EF4444" }} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feat.title}</h3>
                <p className="leading-relaxed mb-6" style={{ color: "#9CA3AF" }}>{feat.description}</p>
                <div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
                  style={{ background: "rgba(239,68,68,0.12)", color: "#F87171", border: "1px solid rgba(239,68,68,0.2)" }}
                >
                  <TrendingUp className="w-3.5 h-3.5" />
                  {feat.highlight}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyPanoptyc;
