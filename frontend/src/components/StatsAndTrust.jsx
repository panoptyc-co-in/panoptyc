import React from "react";
import { stats, trustPartners } from "../mock";

const StatsAndTrust = () => {
  return (
    <>
      {/* Stats Section */}
      <section className="py-20" style={{ backgroundColor: "#0a0a0a" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4" style={{ color: "#EF4444", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>
              Our Impact in Numbers
            </span>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="text-center py-8 px-6 rounded-2xl transition-all duration-300 hover:-translate-y-1"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <div
                  className="text-5xl lg:text-6xl font-extrabold mb-3 leading-none"
                  style={{ color: "#EF4444" }}
                >
                  {stat.value}
                </div>
                <div className="text-sm font-medium" style={{ color: "#9CA3AF" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges Section */}
      <section className="py-16" style={{ backgroundColor: "#0d0d0d", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-semibold uppercase tracking-widest mb-10" style={{ color: "#6B7280" }}>
            Trusted By Industry Leaders
          </p>
          <div className="flex flex-wrap items-center justify-center gap-12 lg:gap-16">
            {trustPartners.map((partner) => (
              <div key={partner.name} className="flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity duration-300" style={{ height: "48px" }}>
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-full max-w-[160px] object-contain"
                  style={{ filter: "grayscale(100%) brightness(2)" }}
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default StatsAndTrust;
