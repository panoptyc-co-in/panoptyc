import React from "react";
import { Target, TrendingUp, Store, House } from "lucide-react";
import { trustPartners } from "../mock";

const statsData = [
  { value: "400K+", label: "Thefts Caught Yearly", icon: Target, iconColor: "text-red-500" },
  { value: "30%", label: "Average Shrink Reduction", icon: TrendingUp, iconColor: "text-green-500" },
  { value: "20K+", label: "Stores Protected", icon: Store, iconColor: "text-blue-500" },
  { value: "100%", label: "Remote Workforce", icon: House, iconColor: "text-purple-500" },
];

const StatsAndTrust = () => {
  return (
    <>
      {/* Stats Section */}
      <section className="py-12 md:py-16" style={{ backgroundColor: "#1a1f2e", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-400 text-xs uppercase tracking-widest mb-8 font-medium">
            Our Impact in Numbers
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {statsData.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div
                  key={i}
                  className="text-center p-4 md:p-6 rounded-xl transition-all duration-200 hover:bg-white/5"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <Icon className={`w-6 h-6 ${stat.iconColor} mx-auto mb-2`} />
                  <div className="text-2xl md:text-4xl font-bold text-white font-['Outfit']">
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-xs md:text-sm mt-1">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust Badges Section */}
      <section className="py-8 md:py-10" style={{ backgroundColor: "#14181f", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-xs uppercase tracking-widest mb-6">
            Trusted By Industry Leaders
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {trustPartners.map((partner) => (
              <div
                key={partner.name}
                className="grayscale hover:grayscale-0 opacity-40 hover:opacity-100 transition-all duration-300"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-8 md:h-12 w-auto object-contain"
                  onError={(e) => { e.target.style.display = "none"; }}
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