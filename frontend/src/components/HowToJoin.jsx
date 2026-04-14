import React from "react";
import { steps } from "../mock";
import { Navigation2 } from "lucide-react";

const HowToJoin = ({ onApply }) => {
  return (
    <section className="py-24" style={{ backgroundColor: "#0d0d0d" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4" style={{ color: "#EF4444", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>
            Getting Started
          </span>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">
            How to Join Panoptyc
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "#9CA3AF" }}>
            A simple 4-step process to start your career
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {steps.map((step, i) => (
            <div key={i} className="relative">
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div
                  className="hidden lg:block absolute top-10 left-[calc(50%+3rem)] right-0 h-px"
                  style={{ background: "rgba(239,68,68,0.25)", zIndex: 0 }}
                />
              )}
              <div
                className="relative z-10 p-7 rounded-2xl text-center h-full transition-all duration-300 hover:-translate-y-1"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
                  style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)" }}
                >
                  <span className="text-xl font-extrabold" style={{ color: "#EF4444" }}>STEP {step.number}</span>
                </div>
                <h3 className="text-white font-bold text-lg mb-3">{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#9CA3AF" }}>
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            onClick={onApply}
            className="inline-flex items-center gap-2.5 px-10 py-4 rounded-xl font-semibold text-white text-lg transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
            style={{ backgroundColor: "#EF4444" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#DC2626")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#EF4444")}
          >
            <Navigation2 className="w-5 h-5" />
            Apply Now — It Only Takes 2 Minutes
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowToJoin;
