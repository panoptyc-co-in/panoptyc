import React from "react";
import {
  IndianRupee, Home, BookOpen, TrendingUp, Users, Cpu
} from "lucide-react";
import { benefits } from "../mock";

const iconMap = { IndianRupee, Home, BookOpen, TrendingUp, Users, Cpu };

const Benefits = ({ onApply }) => {
  return (
    <section id="benefits" className="py-24" style={{ backgroundColor: "#1a1f2e" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4" style={{ color: "#EF4444", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>
            Perks &amp; Benefits
          </span>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">
            Why You'll Love Working Here
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "#9CA3AF" }}>
            We invest in our team's success and well-being from day one
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {benefits.map((benefit, i) => {
            const Icon = iconMap[benefit.icon] || IndianRupee;
            return (
              <div
                key={i}
                className="group p-7 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(239,68,68,0.05)";
                  e.currentTarget.style.borderColor = "rgba(239,68,68,0.25)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                  style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}
                >
                  <Icon className="w-7 h-7" style={{ color: "#EF4444" }} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{benefit.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#9CA3AF" }}>
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Benefits;