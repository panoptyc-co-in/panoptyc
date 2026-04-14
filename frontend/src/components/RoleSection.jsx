import React from "react";
import { Monitor, AlertTriangle, FileText, Lock, TrendingUp, Users } from "lucide-react";

const RoleSection = ({ onApply }) => {
  const responsibilities = [
    { 
      icon: Monitor, 
      text: "Monitor live and recorded video feeds from retail stores across the US",
      color: "#EF4444"
    },
    { 
      icon: AlertTriangle, 
      text: "Identify suspicious activities, theft incidents, and policy violations",
      color: "#F97316"
    },
    { 
      icon: FileText, 
      text: "Document and report incidents using Panoptyc's AI-powered platform",
      color: "#EF4444"
    },
    { 
      icon: Lock, 
      text: "Maintain strict confidentiality of all surveillance data and client information",
      color: "#EC4899"
    },
    { 
      icon: TrendingUp, 
      text: "Analyze patterns and trends to help stores reduce shrink proactively",
      color: "#F97316"
    },
    { 
      icon: Users, 
      text: "Collaborate with US-based loss prevention teams for incident resolution",
      color: "#EF4444"
    },
  ];

  return (
    <section id="role" className="py-24 !bg-[#FFFFFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left - Content */}
          <div>
            <span className="inline-block text-xs font-bold uppercase tracking-widest mb-4 text-red-400">
              YOUR ROLE
            </span>
            <h2 className="text-4xl lg:text-5xl font-extrabold !text-[#0E1628] mb-6 leading-tight">
              Remote Video Surveillance Analyst
            </h2>
            <p className="text-lg leading-relaxed mb-8 text-gray-600">
              As a Remote Video Surveillance Analyst, you'll be the frontline defender protecting retail stores across the United States. Using our cutting-edge AI platform, you'll monitor live feeds, catch theft in real-time, and make a direct impact on loss prevention.
            </p>

            {/* Responsibilities */}
            <div className="space-y-4">
              {responsibilities.map((resp, i) => {
                const Icon = resp.icon;
                return (
                  <div key={i} className="flex items-start gap-4">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                      style={{ backgroundColor: `${resp.color}15` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: resp.color }} />
                    </div>
                    <p className="text-base text-gray-600 leading-relaxed pt-1.5">{resp.text}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right - Image with floating cards */}
          <div className="relative hidden lg:block">
            {/* Main Image */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/3987020/pexels-photo-3987020.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Remote worker"
                className="w-full h-auto"
                style={{ aspectRatio: "3/4", objectFit: "cover" }}
              />
            </div>

            {/* Salary Card - Top Right */}
            <div 
              className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-5 flex items-center gap-4"
              style={{ minWidth: "200px" }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-red-50">
                <span className="text-red-500 font-bold text-2xl">₹</span>
              </div>
              <div>
                <div className="text-gray-900 text-xl font-bold">₹35,000/mo</div>
                <div className="text-xs text-gray-500">Competitive salary</div>
              </div>
            </div>

            {/* Remote Badge - Bottom Left */}
            <div 
              className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-5 flex items-center gap-4"
              style={{ minWidth: "220px" }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-green-50">
                <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <div className="text-gray-900 text-base font-bold">100% Remote</div>
                <div className="text-xs text-gray-500">Work from anywhere in India</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoleSection;
