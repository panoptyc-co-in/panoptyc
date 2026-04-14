import React, { useState, useEffect } from "react";
import { Navigation2, ChevronDown, Home, MapPin, Clock, Wifi, AlertTriangle, Camera } from "lucide-react";

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
    <div className="rounded-2xl overflow-hidden shadow-2xl" style={{ background: "rgba(30,35,45,0.9)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.1)" }}>
      {/* Window title bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.04)" }}>
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#FF5F57" }} />
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#FFBD2E" }} />
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#28C840" }} />
        </div>
        <span className="text-xs text-gray-400 ml-2 font-medium tracking-wide">Live Monitoring Dashboard</span>
        <div className="ml-auto flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs text-green-400 font-medium">{storeCount} active</span>
        </div>
      </div>

      {/* Surveillance image */}
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1667669291559-c3c7760ef031?auto=format&fit=crop&w=600&q=80"
          alt="Store surveillance feed"
          className="w-full object-cover"
          style={{ height: "180px" }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)" }} />
        <div className="absolute top-2 right-2 flex items-center gap-1.5 px-2 py-1 rounded text-white text-xs font-bold" style={{ backgroundColor: "#EF4444" }}>
          <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          LIVE
        </div>
        <div className="absolute bottom-2 left-3 text-white text-xs font-medium opacity-80">Store #4521 — Dallas, TX</div>
      </div>

      {/* Store status cards */}
      <div className="grid grid-cols-2 gap-2 p-3">
        <div className="rounded-xl p-3" style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)" }}>
          <div className="flex items-center gap-1.5 mb-1.5">
            <div className="w-2 h-2 rounded-full bg-green-400" style={{ animation: "pulse 2s infinite" }} />
            <span className="text-xs font-semibold" style={{ color: "#4ADE80" }}>Active</span>
          </div>
          <div className="text-white text-sm font-bold">Store #4521</div>
          <div className="text-gray-400 text-xs mt-0.5">Dallas, TX</div>
        </div>
        <div className="rounded-xl p-3" style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)" }}>
          <div className="flex items-center gap-1.5 mb-1.5">
            <AlertTriangle className="w-3 h-3" style={{ color: "#F87171" }} />
            <span className="text-xs font-semibold" style={{ color: "#F87171" }}>Alert</span>
          </div>
          <div className="text-white text-sm font-bold">Store #1893</div>
          <div className="text-gray-400 text-xs mt-0.5">Miami, FL</div>
        </div>
      </div>

      {/* Alert notification */}
      <div className="mx-3 mb-3 flex items-center gap-3 rounded-xl p-3" style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(239,68,68,0.2)" }}>
          <Camera className="w-4 h-4" style={{ color: "#F87171" }} />
        </div>
        <div>
          <div className="text-white text-xs font-semibold">Suspicious Activity Detected</div>
          <div className="text-gray-400 text-xs mt-0.5">Self-checkout area · {alertSeconds}s ago</div>
        </div>
        <div className="ml-auto w-2 h-2 rounded-full bg-red-400 animate-pulse flex-shrink-0" />
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
          <div>
            {/* Hiring badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-8" style={{ border: "1px solid rgba(34,197,94,0.35)", background: "rgba(34,197,94,0.08)" }}>
              <div className="relative w-2 h-2">
                <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-60" />
                <div className="relative w-2 h-2 rounded-full bg-green-400" />
              </div>
              <span className="text-sm font-medium" style={{ color: "#4ADE80" }}>Now Hiring in India</span>
            </div>

            {/* Main heading */}
            <h1 className="font-extrabold leading-tight text-white mb-6" style={{ fontSize: "clamp(2.5rem, 5vw, 3.75rem)", lineHeight: 1.1 }}>
              Join the Team
              <br />
              <span className="text-red-500">Protecting 20,000+</span>
              <br />
              Retail Stores
            </h1>

            {/* Description */}
            <p className="text-lg leading-relaxed mb-8 max-w-lg text-gray-300">
              Panoptyc uses AI to catch over 400,000 retail thefts per year. Be part of a revolution in loss prevention — all from the comfort of your home.
            </p>

            {/* Salary badge */}
            <div className="inline-flex items-center gap-4 rounded-2xl px-5 py-4 mb-8" style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 bg-red-500">
                <span className="text-white font-bold text-xl">₹</span>
              </div>
              <div>
                <div className="text-white text-2xl font-extrabold">₹35,000</div>
                <div className="text-sm text-gray-300">per month + benefits</div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-3 mb-8">
              <button
                onClick={onApply}
                className="flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-white transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg bg-red-500 hover:bg-red-600"
              >
                <Navigation2 className="w-5 h-5" />
                Apply Now
              </button>
              <button
                onClick={scrollToRole}
                className="flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-white transition-all duration-200 hover:bg-white/10"
                style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}
              >
                Learn About Role
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {tags.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm text-gray-300"
                  style={{ border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.05)" }}
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
