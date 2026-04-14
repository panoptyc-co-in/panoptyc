import React from "react";
import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      text: "Before Panoptyc, investigating potential theft meant retrieving DVRs and spending hours reviewing footage. Now our supervisors can focus on growing our business instead of chasing shrink.",
      name: "Jeff Hemp",
      role: "Store Operations Director",
      company: "Verified Customer",
      initials: "JH",
    },
    {
      text: "Panoptyc's AI platform has transformed how we handle loss prevention. The real-time alerts and video evidence make it easy to take action immediately. We've seen a 35% reduction in shrink.",
      name: "Sarah Mitchell",
      role: "VP Loss Prevention",
      company: "Retail Chain",
      initials: "SM",
    },
    {
      text: "The remote analysts at Panoptyc are incredibly thorough. They catch things our in-store cameras alone never would. It's like having an extra set of expert eyes on every transaction.",
      name: "David Chen",
      role: "Regional Manager",
      company: "Grocery Network",
      initials: "DC",
    },
  ];

  const customers = [
    "Bernick's",
    "Premier Canteen",
    "Mattress Firm",
    "FreshMart",
    "QuickStop"
  ];

  return (
    <>
    <section className="py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.15em] mb-4 text-[#ef4444]">
            SOCIAL PROOF
          </span>
          <h2 className="text-[36px] md:text-[42px] font-extrabold text-[#0F172A] tracking-tight">
            Hear From Our Customers
          </h2>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <div
              key={i}
              className="bg-white rounded-[24px] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 flex flex-col h-full"
            >
              {/* Stars */}
              <div className="flex gap-1.5 mb-5">
                {[...Array(5)].map((_, idx) => (
                  <Star 
                    key={idx} 
                    className="w-[18px] h-[18px] fill-[#FBBF24] text-[#FBBF24]" 
                    strokeWidth={1} 
                  />
                ))}
              </div>
              
              {/* Quote Icon */}
              <div className="mb-5">
                <Quote 
                  className="w-[36px] h-[36px] text-[#FCA5A5] opacity-60" 
                  strokeWidth={1.5} 
                />
              </div>
              
              {/* Testimonial Text */}
              <p className="text-[14px] leading-[1.75] text-[#64748B] italic mb-8">
                "{testimonial.text}"
              </p>
              
              {/* Author / Divider */}
              <div className="mt-auto border-t border-gray-100 pt-6 flex flex-row items-center gap-4">
                <div className="w-[42px] h-[42px] rounded-full bg-[#0F172A] flex items-center justify-center font-bold text-white text-[13px] tracking-wide flex-shrink-0">
                  {testimonial.initials}
                </div>
                <div>
                  <div className="font-bold text-[#0F172A] text-[14px] leading-tight">
                    {testimonial.name}
                  </div>
                  <div className="text-[11px] sm:text-[12px] text-[#9CA3AF] mt-1 font-medium leading-tight">
                    {testimonial.role} · {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Customer Logos Text List */}
        <div>
          <div className="text-center mb-10">
            <span className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] text-[#9CA3AF]">
              SOME OF OUR CUSTOMERS
            </span>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-14 lg:gap-20">
            {customers.map((brand, idx) => (
              <span 
                key={idx} 
                className="text-[18px] md:text-[22px] font-bold text-[#CBD5E1] tracking-tight hover:text-[#94A3B8] transition-colors cursor-default"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default Testimonials;
