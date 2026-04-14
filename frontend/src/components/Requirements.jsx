import React from "react";
import { GraduationCap, Globe, Wifi, Monitor, Moon, Target } from "lucide-react";
import { requirements } from "../mock";

const iconMap = {
  GraduationCap: GraduationCap,
  BookOpen: Globe, // Mapping English to Globe matching screenshot
  Wifi: Wifi,
  Monitor: Monitor,
  Moon: Moon,
  Focus: Target, // Mapping to Target matching screenshot
};

const Requirements = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.15em] mb-4 text-[#ef4444]">
            WHAT WE NEED
          </span>
          <h2 className="text-[36px] md:text-[42px] font-extrabold text-[#0F172A] mb-[2px] tracking-tight">
            Requirements
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {requirements.map((req, i) => {
            const Icon = iconMap[req.icon] || Target;
            return (
              <div 
                key={i} 
                className="bg-[#F8FAFC] rounded-[16px] p-5 flex items-start gap-5 hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="w-[42px] h-[42px] rounded-full bg-[#FEF2F2] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon className="w-[18px] h-[18px] text-[#ef4444]" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="text-[14px] font-bold text-[#0F172A] mb-1 leading-tight">
                    {req.title}
                  </h3>
                  <p className="text-[12.5px] leading-snug text-[#64748B]">
                    {req.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Requirements;
