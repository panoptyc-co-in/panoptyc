import React from "react";
import { CheckCircle } from "lucide-react";
import { howToJoinSteps } from "../mock";

const HowToJoin = ({ onApply }) => {
  return (
    <section className="py-24" style={{ backgroundColor: "#0f1419" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4" style={{ color: "#EF4444", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>
            Getting Started
          </span>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">How to Join Panoptyc</h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "#9CA3AF" }}>
            A simple 4-step process to start your career
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {howToJoinSteps.map((step, i) => (
            <div
              key={i}
              className="relative p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div className="absolute -top-4 left-8 w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg" style={{ background: "#EF4444", color: "white" }}>
                {step.step}
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-bold text-white mb-3">{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#9CA3AF" }}>
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={onApply}
            className="inline-flex items-center gap-2.5 px-10 py-4 rounded-xl font-bold text-white text-lg transition-all duration-200 hover:scale-105 shadow-xl"
            style={{ backgroundColor: "#EF4444" }}
          >
            <CheckCircle className="w-5 h-5" />
            Start Your Application
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowToJoin;