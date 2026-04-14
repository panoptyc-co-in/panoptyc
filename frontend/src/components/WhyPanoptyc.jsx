import React from "react";
import { ShoppingCart, AlertTriangle, Eye } from "lucide-react";
import { whyPanoptyc } from "../mock";

const iconMap = { ShoppingCart, AlertTriangle, Eye };

const WhyPanoptyc = () => {
  return (
    <section className="py-24 !bg-[#FFFFFF]" style={{ backgroundColor: "#0f1419" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block uppercase text-xs font-bold tracking-widest !mb-[0px] !pt-[4px] !pb-[4px] !pl-[12px] !pr-[12px] !rounded-none !text-[#EF4444] !bg-[rgba(239,68,68,0)]" style={{ color: "#EF4444", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>
            What We Do
          </span>
          <h2 className="text-4xl lg:text-5xl font-extrabold mb-4 !text-[#0E1628]">Why Panoptyc?</h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "#9CA3AF" }}>
            Grocers and retail operators turn to Panoptyc to solve their biggest loss prevention challenges
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {whyPanoptyc.map((item, i) => {
            const Icon = iconMap[item.icon] || ShoppingCart;
            return (
              <div
                key={i}
                className="group transition-all duration-300 hover:-translate-y-1 p-8 rounded-2xl !bg-[#FBFCFD]"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(239,68,68,0.05)";
                  e.currentTarget.style.borderColor = "rgba(239,68,68,0.25)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                }}>

                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                  style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>

                  <Icon className="w-7 h-7" style={{ color: "#EF4444" }} />
                </div>
                <h3 className="text-xl font-bold mb-3 !text-[#0E1628]">{item.title}</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "#9CA3AF" }}>
                  {item.description}
                </p>
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold" style={{ color: "#4ADE80" }}>
                  <span>→</span>
                  <span>{item.stat}</span>
                </div>
              </div>);

          })}
        </div>
      </div>
    </section>);

};

export default WhyPanoptyc;