import React from "react";
import { industries } from "../mock";
import { ShoppingCart, ShoppingBag, Monitor, Package, Utensils, Coffee, ChevronRight } from "lucide-react";

// Map sequential icons since mock doesn't define lucide specific components
const industryIcons = [ShoppingCart, ShoppingBag, Monitor, Package, Utensils, Coffee];

const Industries = () => {
  return (
    <section id="about" className="py-24 bg-[#0f172a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.16em] mb-4 text-[#ef4444]">
            INDUSTRIES
          </span>
          <h2 className="text-[36px] md:text-[42px] font-extrabold text-white mb-4 tracking-tight">
            Who We Serve
          </h2>
          <p className="text-[15px] max-w-2xl mx-auto text-[#94a3b8]">
            Panoptyc's AI solution protects assets across these retail segments
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((industry, i) => {
            const Icon = industryIcons[i % industryIcons.length];
            return (
              <div
                key={i}
                className="group rounded-[16px] overflow-hidden bg-[#1e293b] flex flex-col border border-white/5 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.6)] cursor-pointer"
              >
                {/* Image with dark overlay */}
                <div className="relative w-full h-[190px] overflow-hidden">
                  <img
                    src={industry.image}
                    alt={industry.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Dark overlay exactly like screenshot */}
                  <div
                    className="absolute inset-0"
                    style={{ background: "rgba(10, 17, 35, 0.48)" }}
                  />
                  {/* Hover chevron icon — top right */}
                  <div className="absolute top-2 right-2 w-6 h-6 bg-red-500/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ChevronRight className="w-3 h-3 text-white" />
                  </div>
                </div>

                {/* Text Block */}
                <div className="p-6 flex-1 flex flex-col bg-[#1e293b]">
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <Icon className="w-[18px] h-[18px] text-[#ef4444]" strokeWidth={2.5} />
                    <h3 className="text-white text-[16px] font-bold tracking-wide">
                      {industry.title}
                    </h3>
                  </div>
                  <p className="text-[13px] leading-[1.65] text-[#94a3b8]">
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