import React from "react";
import { IndianRupee, Home, BookOpen, TrendingUp, Heart, Zap } from "lucide-react";
import { benefits } from "../mock";

const iconMap = {
  IndianRupee: { Icon: IndianRupee, color: "text-[#22C55E]" },
  Home: { Icon: Home, color: "text-[#3B82F6]" },
  BookOpen: { Icon: BookOpen, color: "text-[#A855F7]" },
  TrendingUp: { Icon: TrendingUp, color: "text-[#F97316]" },
  Users: { Icon: Heart, color: "text-[#EC4899]" },
  Cpu: { Icon: Zap, color: "text-[#EAB308]" },
};

const Benefits = () => {
  return (
    <section id="benefits" className="py-24 bg-[#0F172A]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.15em] mb-4 text-[#ef4444]">
            PERKS & BENEFITS
          </span>
          <h2 className="text-[36px] md:text-[42px] font-extrabold text-white tracking-tight">
            Why You'll Love Working Here
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {benefits.map((benefit, i) => {
            const mappedIcon = iconMap[benefit.icon] || iconMap.IndianRupee;
            const Icon = mappedIcon.Icon;
            
            return (
              <div
                key={i}
                className="bg-[#1E293B] p-7 md:p-8 rounded-[20px] transition-all duration-300 hover:-translate-y-1 shadow-sm border border-[#1E293B]"
              >
                <div className="w-[46px] h-[46px] rounded-[14px] bg-white flex items-center justify-center mb-6 shadow-sm">
                  <Icon className={`w-[22px] h-[22px] ${mappedIcon.color}`} strokeWidth={2.5} />
                </div>
                
                <h3 className="text-[17px] font-bold text-white mb-2">
                  {benefit.title}
                </h3>
                <p className="text-[13px] leading-[1.65] text-[#94A3B8]">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Benefits;