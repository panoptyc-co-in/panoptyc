import React from "react";
import { Star, Quote } from "lucide-react";
import { testimonials, customers } from "../mock";

const Testimonials = () => {
  return (
    <>
      {/* Testimonials */}
      <section className="py-24" style={{ backgroundColor: "#0a0a0a" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4" style={{ color: "#EF4444", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>
              Social Proof
            </span>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">
              Hear From Our Customers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="flex flex-col p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, si) => (
                    <Star key={si} className="w-4 h-4 fill-current" style={{ color: "#F59E0B" }} />
                  ))}
                </div>

                {/* Quote icon */}
                <Quote className="w-8 h-8 mb-4 flex-shrink-0" style={{ color: "rgba(239,68,68,0.4)" }} />

                {/* Quote text */}
                <p className="text-sm leading-relaxed flex-1 mb-8" style={{ color: "#D1D5DB" }}>
                  "{t.quote}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                    style={{ backgroundColor: "#EF4444" }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">{t.name}</div>
                    <div className="text-xs" style={{ color: "#9CA3AF" }}>
                      {t.role} &middot; {t.company}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer logos */}
      <section className="py-14" style={{ backgroundColor: "#0d0d0d", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-bold uppercase tracking-widest mb-10" style={{ color: "#6B7280" }}>
            Some of Our Customers
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-14">
            {customers.map((customer) => (
              <div
                key={customer}
                className="text-xl font-bold tracking-tight opacity-40 hover:opacity-70 transition-opacity duration-300"
                style={{ color: "#9CA3AF" }}
              >
                {customer}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Testimonials;
