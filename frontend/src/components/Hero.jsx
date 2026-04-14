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
    <div className="rounded-2xl overflow-hidden shadow-2xl bg-white border border-slate-200">
      {/* Window title bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-200 bg-slate-50">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <span className="text-xs text-slate-600 ml-2 font-medium tracking-wide">Live Monitoring Dashboard</span>
        <div className="ml-auto flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs text-green-600 font-medium">{storeCount} active</span>
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
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 60%)" }} />
        <div className="absolute top-2 right-2 flex items-center gap-1.5 px-2 py-1 rounded text-white text-xs font-bold bg-red-500">
          <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          LIVE
        </div>
        <div className="absolute bottom-2 left-3 text-white text-xs font-medium opacity-90">Store #4521 — Dallas, TX</div>
      </div>

      {/* Store status cards */}
      <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50">
        <div className="rounded-xl p-3 bg-white border border-slate-200">
          <div className="flex items-center gap-1.5 mb-1.5">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-semibold text-green-600">Active</span>
          </div>
          <div className="text-slate-900 text-sm font-bold">Store #4521</div>
          <div className="text-slate-500 text-xs mt-0.5">Dallas, TX</div>
        </div>
        <div className="rounded-xl p-3 bg-red-50 border border-red-200">
          <div className="flex items-center gap-1.5 mb-1.5">
            <AlertTriangle className="w-3 h-3 text-red-500" />
            <span className="text-xs font-semibold text-red-600">Alert</span>
          </div>
          <div className="text-slate-900 text-sm font-bold">Store #1893</div>
          <div className="text-slate-500 text-xs mt-0.5">Miami, FL</div>
        </div>
      </div>

      {/* Alert notification */}
      <div className="mx-3 mb-3 flex items-center gap-3 rounded-xl p-3 bg-red-50 border border-red-200">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-red-100">
          <Camera className="w-4 h-4 text-red-600" />
        </div>
        <div>
          <div className="text-slate-900 text-xs font-semibold">Suspicious Activity Detected</div>
          <div className="text-slate-500 text-xs mt-0.5">Self-checkout area · {alertSeconds}s ago</div>
        </div>
        <div className="ml-auto w-2 h-2 rounded-full bg-red-500 animate-pulse flex-shrink-0" />
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
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-red-50"
    >
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pt-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div>
            {/* Hiring badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-8 border border-green-200 bg-green-50">
              <div className="relative w-2 h-2">
                <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-60" />
                <div className="relative w-2 h-2 rounded-full bg-green-500" />
              </div>
              <span className="text-sm font-medium text-green-700">Now Hiring in India</span>
            </div>

            {/* Main heading */}
            <h1 className="font-extrabold leading-tight text-slate-900 mb-6" style={{ fontSize: "clamp(2.5rem, 5vw, 3.75rem)", lineHeight: 1.1 }}>
              Join the Team
              <br />
              <span className="text-red-500">Protecting 20,000+</span>
              <br />
              Retail Stores
            </h1>

            {/* Description */}
            <p className="text-lg leading-relaxed mb-8 max-w-lg text-slate-600">
              Panoptyc uses AI to catch over 400,000 retail thefts per year. Be part of a revolution in loss prevention — all from the comfort of your home.
            </p>

            {/* Salary badge */}
            <div className="inline-flex items-center gap-4 rounded-2xl px-5 py-4 mb-8 bg-white border border-slate-200 shadow-sm">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 bg-red-500">
                <span className="text-white font-bold text-xl">₹</span>
              </div>
              <div>
                <div className="text-slate-900 text-2xl font-extrabold">₹35,000</div>
                <div className="text-sm text-slate-500">per month + benefits</div>
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
                className="flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-slate-700 transition-all duration-200 hover:bg-slate-100 bg-white border border-slate-300"
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
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm border border-slate-300 bg-white text-slate-600"
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
