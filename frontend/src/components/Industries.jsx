import React from "react";
import { industries } from "../mock";
import { ShoppingCart, ShoppingBag, Monitor, Package, Utensils, Coffee } from "lucide-react";

// Map sequential icons since mock doesn't define lucide specific components
const industryIcons = [ShoppingCart, ShoppingBag, Monitor, Package, Utensils, Coffee];

const Industries = () => {
  return (
    <section id="about" className="py-24 bg-[#0F172A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.15em] mb-4 text-[#ef4444]">
            INDUSTRIES
          </span>
          <h2 className="text-[36px] md:text-[42px] font-extrabold text-white mb-4 tracking-tight">
            Who We Serve
          </h2>
          <p className="text-[15px] max-w-2xl mx-auto text-[#94A3B8]">
            Panoptyc's AI solution protects assets across these retail segments
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((industry, i) => {
            const Icon = industryIcons[i % industryIcons.length];
            return (
              <div
                key={i}
                className="group rounded-[20px] overflow-hidden bg-[#1E293B] flex flex-col hover:-translate-y-1 transition-transform duration-300"
              >
                {/* Image Top Half */}
                <div className="w-full h-[180px] overflow-hidden relative opacity-90 group-hover:opacity-100 transition-opacity">
                  <img
                    src={industry.image}
                    alt={industry.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1E293B] via-transparent to-transparent opacity-80" />
                </div>

                {/* Text Block Bottom Half */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="w-[16px] h-[16px] text-[#ef4444]" strokeWidth={2.5} />
                    <h3 className="text-white text-[16px] font-bold tracking-wide">
                      {industry.title}
                    </h3>
                  </div>
                  <p className="text-[13px] leading-[1.65] text-[#94A3B8]">
                    {industry.description}
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

export default Industries;