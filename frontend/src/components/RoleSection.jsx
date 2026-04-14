import React from "react";
import { Monitor, Eye, FileText, Shield, TrendingUp, Users } from "lucide-react";
import { roleResponsibilities, requirements } from "../mock";

const iconMap = { Monitor, Eye, FileText, Shield, TrendingUp, Users };

const RoleSection = ({ onApply }) => {
  return (
    <section id="role" className="py-24" style={{ backgroundColor: "#0f1419" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image */}
          <div className="order-2 lg:order-1">
            <img
              src="https://images.pexels.com/photos/3987020/pexels-photo-3987020.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Remote worker"
              className="rounded-2xl shadow-2xl"
              style={{ border: "1px solid rgba(255,255,255,0.1)" }}
            />
            <div className="mt-6 inline-flex items-center gap-4 rounded-2xl px-5 py-4" style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#EF4444" }}>
                <span className="text-white font-bold text-xl">₹</span>
              </div>
              <div>
                <div className="text-white text-xl font-extrabold">₹35,000/mo</div>
                <div className="text-xs" style={{ color: "#9CA3AF" }}>Competitive salary</div>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div className="order-1 lg:order-2">
            <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4" style={{ color: "#EF4444", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>
              Your Role
            </span>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">
              Remote Video Surveillance Analyst
            </h2>
            <p className="text-lg leading-relaxed mb-8" style={{ color: "#9CA3AF" }}>
              As a Remote Video Surveillance Analyst, you'll be the frontline defender protecting retail stores across the United States. Using our cutting-edge AI platform, you'll monitor live feeds, catch theft in real-time, and make a direct impact on loss prevention.
            </p>

            {/* Responsibilities */}
            <div className="space-y-3 mb-8">
              {roleResponsibilities.map((resp, i) => {
                const Icon = iconMap[resp.icon] || Monitor;
                return (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>
                      <Icon className="w-4 h-4" style={{ color: "#EF4444" }} />
                    </div>
                    <p className="text-sm" style={{ color: "#D1D5DB" }}>{resp.text}</p>
                  </div>
                );
              })}
            </div>

            <button
              onClick={onApply}
              className="px-8 py-3.5 rounded-xl font-semibold text-white transition-all duration-200 hover:scale-105"
              style={{ backgroundColor: "#EF4444" }}
            >
              Apply Now
            </button>
          </div>
        </div>

        {/* Requirements */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4" style={{ color: "#EF4444", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>
              What We Need
            </span>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white">Requirements</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {requirements.map((req, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl transition-all duration-200 hover:bg-white/5"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <h4 className="text-sm font-bold uppercase tracking-wide mb-2" style={{ color: "#EF4444" }}>
                  {req.title}
                </h4>
                <p className="text-sm" style={{ color: "#D1D5DB" }}>{req.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoleSection;