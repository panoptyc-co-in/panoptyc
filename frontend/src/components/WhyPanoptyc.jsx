import React from "react";
import { ShoppingCart, AlertTriangle, Eye, TrendingUp } from "lucide-react";
import { whyPanoptyc } from "../mock";

const iconMap = { ShoppingCart, AlertTriangle, Eye };

const WhyPanoptyc = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.15em] mb-4 text-[#ef4444]">
            WHAT WE DO
          </span>
          <h2 className="text-[36px] md:text-[42px] font-extrabold text-[#0F172A] tracking-tight mb-4">
            Why Panoptyc?
          </h2>
          <p className="text-[15px] max-w-2xl mx-auto text-[#64748B] leading-relaxed">
            Grocers and retail operators turn to Panoptyc to solve their biggest loss prevention challenges
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {whyPanoptyc.map((item, i) => {
            const Icon = iconMap[item.icon] || ShoppingCart;
            return (
              <div
                key={i}
                className="group p-8 md:p-10 rounded-[24px] bg-[#F8FAFC] hover:bg-white flex flex-col h-full transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)] border border-transparent"
              >
                <div className="w-[48px] h-[48px] rounded-[14px] bg-[#FEF2F2] group-hover:bg-[#ef4444] flex items-center justify-center mb-6 transition-colors duration-500">
                  <Icon className="w-[22px] h-[22px] text-[#ef4444] group-hover:text-white transition-colors duration-500" strokeWidth={1.5} />
                </div>
                
                <h3 className="text-[18px] md:text-[20px] font-bold mb-3 text-[#0F172A] leading-snug">
                  {item.title}
                </h3>
                
                <p className="text-[14px] leading-[1.65] text-[#64748B] mb-8">
                  {item.description}
                </p>
                
                <div className="mt-auto">
                  <div className="inline-flex items-center text-[11px] font-bold text-[#15803D] bg-[#F0FDF4] px-2.5 py-1.5 rounded-[6px]">
                    <TrendingUp className="w-[12px] h-[12px] mr-1.5 opacity-80" strokeWidth={2.5} />
                    <span>{item.stat}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyPanoptyc;