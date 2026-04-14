import React from "react";
import { Star, Quote } from "lucide-react";
import { testimonials, customers } from "../mock";

const Testimonials = () => {
  return (
    <>
      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-red-500 font-medium text-xs uppercase tracking-widest">Social Proof</span>
            <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mt-3 font-['Outfit']">
              Hear From Our Customers
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100 hover:shadow-lg transition-shadow flex flex-col"
              >
                {/* Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, si) => (
                    <Star key={si} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <Quote className="w-8 h-8 text-red-100 mb-3" />

                <p className="text-slate-600 text-sm leading-relaxed mb-6 italic flex-1">
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">{t.name}</p>
                    <p className="text-slate-500 text-xs">{t.role} &middot; {t.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer logos */}
      <section className="py-10 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-slate-400 text-xs uppercase tracking-widest mb-6">
            Some of Our Customers
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {customers.map((customer) => (
              <div
                key={customer}
                className="text-slate-300 font-bold text-lg md:text-xl font-['Outfit'] hover:text-slate-500 transition-colors cursor-default"
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
