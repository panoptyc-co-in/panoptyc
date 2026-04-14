import React from "react";
import { Monitor, Eye, FileText, Shield, BarChart2, Users, Wifi } from "lucide-react";

const RoleSection = ({ onApply }) => {
  const responsibilities = [
    { 
      icon: Monitor, 
      text: "Monitor live and recorded video feeds from retail stores across the US"
    },
    { 
      icon: Eye, 
      text: "Identify suspicious activities, theft incidents, and policy violations"
    },
    { 
      icon: FileText, 
      text: "Document and report incidents using Panoptyc's AI-powered platform"
    },
    { 
      icon: Shield, 
      text: "Maintain strict confidentiality of all surveillance data and client information"
    },
    { 
      icon: BarChart2, 
      text: "Analyze patterns and trends to help stores reduce shrink proactively"
    },
    { 
      icon: Users, 
      text: "Collaborate with US-based loss prevention teams for incident resolution"
    },
  ];

  return (
    <section id="role" className="py-24 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left - Content */}
          <div className="max-w-xl mx-auto lg:mx-0 w-full">
            <span className="inline-block text-[11px] font-bold uppercase tracking-[0.15em] mb-4 text-[#ef4444]">
              YOUR ROLE
            </span>
            <h2 className="text-[32px] md:text-[36px] font-extrabold text-[#0F172A] mb-4 leading-tight tracking-tight">
              Remote Video Surveillance Analyst
            </h2>
            <p className="text-[14px] leading-[1.6] text-[#64748B] mb-8">
              As a Remote Video Surveillance Analyst, you'll be the frontline defender protecting retail stores across the United States. Using our cutting-edge AI platform, you'll monitor live feeds, catch theft in real-time, and make a direct impact on loss prevention.
            </p>

            {/* Responsibilities */}
            <div className="space-y-3">
              {responsibilities.map((resp, i) => {
                const Icon = resp.icon;
                return (
                  <div 
                    key={i} 
                    className="flex items-center bg-white border border-gray-100 shadow-[0_2px_8px_rgb(0,0,0,0.02)] rounded-[12px] px-4 py-3"
                  >
                    <div className="w-[28px] h-[28px] rounded-[6px] bg-[#FEF2F2] flex items-center justify-center flex-shrink-0">
                      <Icon className="w-[14px] h-[14px] text-[#ef4444]" strokeWidth={2} />
                    </div>
                    <p className="text-[13px] font-medium text-[#475569] leading-snug ml-3.5">
                      {resp.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right - Image with floating cards */}
          <div className="relative hidden lg:block ml-auto w-full max-w-[500px]">
            {/* Main Image */}
            <div className="relative rounded-[24px] overflow-hidden shadow-[0_20px_40px_rgb(0,0,0,0.08)] bg-white">
              <img
                src="https://images.pexels.com/photos/3987020/pexels-photo-3987020.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Remote worker"
                className="w-full object-cover"
                style={{ height: "650px" }}
              />
            </div>

            {/* Salary Card - Top Right */}
            <div className="absolute -top-3 -right-6 bg-white rounded-[14px] shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-3.5 flex items-center gap-3 border border-gray-50 z-10 w-[180px]">
              <div className="w-[32px] h-[32px] rounded-full flex items-center justify-center flex-shrink-0 bg-[#FEF2F2]">
                <span className="text-[#ef4444] font-bold text-[14px]">₹</span>
              </div>
              <div>
                <div className="text-[#0F172A] text-[13px] font-bold leading-tight">₹35,000/mo</div>
                <div className="text-[10px] text-[#94A3B8] leading-tight mt-0.5">Competitive salary</div>
              </div>
            </div>

            {/* Remote Badge - Bottom Left */}
            <div className="absolute -bottom-4 -left-6 bg-white rounded-[14px] shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-3.5 flex items-center gap-3 border border-gray-50 z-10 w-[200px]">
              <div className="w-[32px] h-[32px] rounded-full flex items-center justify-center flex-shrink-0 bg-[#F0FDF4]">
                <Wifi className="w-[14px] h-[14px] text-[#22C55E]" strokeWidth={2.5} />
              </div>
              <div>
                <div className="text-[#0F172A] text-[13px] font-bold leading-tight">100% Remote</div>
                <div className="text-[10px] text-[#94A3B8] leading-tight mt-0.5">Work from anywhere in India</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoleSection;
