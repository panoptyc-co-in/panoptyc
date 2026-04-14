import React from "react";
import { Star, Quote } from "lucide-react";
import { testimonials, customers } from "../mock";

const Testimonials = () => {
  return (
    <>
      {/* Testimonials Section */}
      <section className="py-24 !bg-[#FFFFFF]" style={{ backgroundColor: "#1a1f2e" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4" style={{ color: "#EF4444", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>
              Social Proof
            </span>
            <h2 className="text-4xl lg:text-5xl font-extrabold mb-4 !text-[#0E1628]">Hear From Our Customers</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) =>
            <div
              key={i}
              className="transition-all duration-200 hover:bg-white/5 p-8 rounded-2xl !bg-[#FBFCFD]"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>

                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) =>
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                )}
                </div>
                <Quote className="w-8 h-8 text-gray-600 mb-4" />
                <p className="text-sm leading-relaxed mb-6 italic" style={{ color: "#D1D5DB" }}>
                  {testimonial.text}
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white" style={{ background: "#1f2937" }}>
                    {testimonial.initials}
                  </div>
                  <div>
                    <div className="font-semibold text-white text-sm">{testimonial.name}</div>
                    <div className="text-xs" style={{ color: "#6B7280" }}>{testimonial.role}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Customers Section */}
      <section className="py-10" style={{ backgroundColor: "#14181f" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-xs uppercase tracking-widest mb-6">
            Some of Our Customers
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12">
            {customers.map((customer) =>
            <div
              key={customer}
              className="text-gray-600 text-lg font-semibold opacity-50 hover:opacity-100 transition-opacity">

                {customer}
              </div>
            )}
          </div>
        </div>
      </section>
    </>);

};

export default Testimonials;