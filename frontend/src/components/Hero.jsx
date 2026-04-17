import React, { useState, useEffect } from "react";
import { Navigation2, ChevronDown, Home, MapPin, Clock, Wifi, AlertTriangle, Camera, CheckCircle, Send } from "lucide-react";

const MonitoringDashboard = () => {
  const [alertSeconds, setAlertSeconds] = useState(3);
  const [storeCount, setStoreCount] = useState(247);

  useEffect(() => {
    const alertTimer = setInterval(() => {
      setAlertSeconds((prev) => prev + 1);
    }, 1000);
    const storeTimer = setInterval(() => {
      setStoreCount((prev) => prev + Math.floor(Math.random() * 2));
    }, 5000);
    return () => {
      clearInterval(alertTimer);
      clearInterval(storeTimer);
    };
  }, []);

  return (
    <div className="rounded-[24px] shadow-2xl p-5 md:p-6" style={{ background: "rgba(31, 36, 45, 0.45)", backdropFilter: "blur(24px)", border: "1px solid rgba(255,255,255,0.08)" }}>
      {/* Window title bar */}
      <div className="flex items-center mb-5">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#FF5F57" }} />
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#FFBD2E" }} />
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#28C840" }} />
        </div>
        <span className="text-[13px] text-gray-400 ml-3 font-medium tracking-wide">Live Monitoring Dashboard</span>
      </div>

      {/* Surveillance image */}
      <div className="relative rounded-[16px] overflow-hidden shadow-lg mb-5 border border-white/5">
        <img
          src="https://images.unsplash.com/photo-1667669291559-c3c7760ef031?auto=format&fit=crop&w=800&q=80"
          alt="Store surveillance feed"
          className="w-full object-cover"
          style={{ height: "230px" }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)" }} />
      </div>

      {/* Store status cards */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="flex items-center gap-1.5 mb-2">
            <CheckCircle className="w-[14px] h-[14px] text-green-400" />
            <span className="text-xs font-medium text-green-400">Active</span>
          </div>
          <div className="text-white text-[15px] font-bold">Store #4521</div>
          <div className="text-gray-400 text-xs mt-0.5">Dallas, TX</div>
        </div>
        <div className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="flex items-center gap-1.5 mb-2">
            <AlertTriangle className="w-[14px] h-[14px] text-red-400" />
            <span className="text-xs font-medium text-red-400">Alert</span>
          </div>
          <div className="text-white text-[15px] font-bold">Store #1893</div>
          <div className="text-gray-400 text-xs mt-0.5">Miami, FL</div>
        </div>
      </div>

      {/* Alert notification */}
      <div className="flex items-center gap-4 rounded-xl p-4" style={{ background: "rgba(239, 68, 68, 0.12)", border: "1px solid rgba(239, 68, 68, 0.2)" }}>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "" }}>
          <Camera className="w-[16px] h-[16px] text-red-400" />
        </div>
        <div>
          <div className="text-white text-[13px] font-bold">Suspicious Activity Detected</div>
          <div className="text-gray-300 text-[11px] mt-0.5">Self-checkout area · 3 seconds ago</div>
        </div>
      </div>
    </div>
  );
};

const Hero = ({ onApply }) => {
  const scrollToRole = () => {
    const el = document.getElementById("role");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const tags = [
    { icon: Home, label: "Work From Home" },
    { icon: MapPin, label: "India" },
    { icon: Clock, label: "Full Time" },
    { icon: Wifi, label: "Remote" },
  ];

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        backgroundImage: "url(https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=2000&q=80)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Dark gradient overlay */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,#0f172a,#1e293b 50%,#0f172a)", opacity: 0.95 }} />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pt-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left mt-[-20px] lg:mt-0">
            {/* Hiring badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6" style={{ border: "1px solid rgba(34,197,94,0.3)", background: "rgba(34,197,94,0.15)" }}>
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-[14px] font-semibold text-green-400">Now Hiring in India</span>
            </div>

            {/* Main heading */}
            <h1 className="font-extrabold leading-tight text-white mb-6" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", letterSpacing: "-0.03em" }}>
              Join the Team
              <br />
              <span className="text-[#ef4444]">Protecting 20,000+</span>
              <br />
              Retail Stores
            </h1>

            {/* Description */}
            <p className="text-[16px] lg:text-[17px] leading-relaxed mb-8 max-w-[480px] text-gray-300 px-2 lg:px-0">
              Panoptyc uses AI to catch over 400,000 retail thefts per year. 
              Be part of a revolution in loss prevention — all from the comfort of your home.
            </p>

            {/* Salary badge */}
            <div className="inline-flex items-center gap-4 rounded-2xl px-6 py-4 mb-10 w-[90%] sm:w-auto mx-auto lg:mx-0 justify-center" style={{ background: "rgba(42, 48, 60, 0.8)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-[#ef4444]">
                <span className="text-white font-medium text-2xl mb-1">₹</span>
              </div>
              <div className="text-left">
                <div className="text-white text-[28px] font-bold leading-tight tracking-tight">₹35,000</div>
                <div className="text-[14px] text-gray-400">per month + benefits</div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row w-[95%] sm:w-auto mx-auto lg:mx-0 items-center gap-3.5 mb-12">
              <button
                onClick={onApply}
                className="w-full sm:w-auto flex justify-center items-center gap-2 px-8 py-4 sm:py-3.5 rounded-full font-bold text-lg sm:text-base text-white transition-all duration-200 hover:scale-105 active:scale-95 bg-[#ef4444] hover:bg-[#dc2626] shadow-xl"
              >
                <Send className="w-5 h-5 sm:w-4 sm:h-4" />
                Apply Now
              </button>
              <button
                onClick={scrollToRole}
                className="w-full sm:w-auto flex justify-center items-center gap-2 px-8 py-4 sm:py-3.5 rounded-full font-bold text-lg sm:text-base text-white transition-all duration-200 hover:bg-white/10"
                style={{ background: "rgba(59, 66, 82, 0.8)", border: "1px solid rgba(255,255,255,0.15)" }}
              >
                Learn About Role
                <ChevronDown className="w-5 h-5 sm:w-4 sm:h-4 ml-1 opacity-70" />
              </button>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 w-full px-2">
              {tags.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] text-gray-400"
                  style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.05)" }}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* Right - Monitoring Dashboard */}
          <div className="hidden lg:block">
            <MonitoringDashboard />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
