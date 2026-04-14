import React from "react";
import {
  GraduationCap, BookOpen, Wifi, Monitor, Moon, Focus,
  CheckCircle2, Navigation2, MapPin, IndianRupee
} from "lucide-react";
import { roleResponsibilities, requirements } from "../mock";

const reqIconMap = { GraduationCap, BookOpen, Wifi, Monitor, Moon, Focus };

const RoleSection = ({ onApply }) => {
  return (
    <>
      {/* Role Section */}
      <section id="role" className="py-24" style={{ backgroundColor: "#0a0a0a" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4" style={{ color: "#EF4444", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>
              Your Role
            </span>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">
              Remote Video Surveillance Analyst
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: "#9CA3AF" }}>
              As a Remote Video Surveillance Analyst, you'll be the frontline defender protecting retail stores across the United States.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Responsibilities */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6">What You'll Do</h3>
              <div className="space-y-4">
                {roleResponsibilities.map((resp, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 p-4 rounded-xl transition-all duration-200 hover:bg-white/3"
                    style={{ border: "1px solid rgba(255,255,255,0.05)" }}
                  >
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: "rgba(239,68,68,0.12)" }}
                    >
                      <CheckCircle2 className="w-4 h-4" style={{ color: "#EF4444" }} />
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: "#D1D5DB" }}>{resp}</p>
                  </div>
                ))}
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  onClick={onApply}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all duration-200 hover:scale-105"
                  style={{ backgroundColor: "#EF4444" }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#DC2626")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#EF4444")}
                >
                  <Navigation2 className="w-4 h-4" />
                  Apply Now
                </button>
              </div>
            </div>

            {/* Remote worker image + badges */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
                <img
                  src="https://images.pexels.com/photos/3987020/pexels-photo-3987020.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Remote surveillance analyst working from home"
                  className="w-full object-cover"
                  style={{ height: "380px" }}
                />
                <div className="absolute inset-0 rounded-2xl" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)" }} />
              </div>
              {/* Floating badges */}
              <div
                className="absolute -bottom-4 -left-4 flex items-center gap-3 rounded-2xl px-4 py-3 shadow-xl"
                style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#EF4444" }}>
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-white text-sm font-bold">100% Remote</div>
                  <div className="text-xs" style={{ color: "#9CA3AF" }}>Work from anywhere in India</div>
                </div>
              </div>
              <div
                className="absolute -top-4 -right-4 flex items-center gap-3 rounded-2xl px-4 py-3 shadow-xl"
                style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#EF4444" }}>
                  <IndianRupee className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-white text-sm font-bold">₹35,000/mo</div>
                  <div className="text-xs" style={{ color: "#9CA3AF" }}>Competitive salary</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-24" style={{ backgroundColor: "#0d0d0d" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4" style={{ color: "#EF4444", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>
              What We Need
            </span>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">Requirements</h2>
            <p className="text-lg max-w-xl mx-auto" style={{ color: "#9CA3AF" }}>
              Simple prerequisites to join our growing team of remote analysts
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {requirements.map((req, i) => {
              const Icon = reqIconMap[req.icon] || CheckCircle2;
              return (
                <div
                  key={i}
                  className="flex items-start gap-4 p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}
                  >
                    <Icon className="w-6 h-6" style={{ color: "#EF4444" }} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">{req.title}</h4>
                    <p className="text-sm leading-relaxed" style={{ color: "#9CA3AF" }}>{req.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default RoleSection;
