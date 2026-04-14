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

  return (
    <section className="py-24 !bg-[#FFFFFF]" style={{ backgroundColor: "#FAFAFA" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-bold uppercase tracking-widest mb-4 text-red-400">
            SOCIAL PROOF
          </span>
          <h2 className="text-4xl lg:text-5xl font-extrabold !text-[#0E1628] mb-4">Hear From Our Customers</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-8 transition-all duration-200 hover:shadow-lg"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              
              {/* Quote Icon */}
              <div className="mb-6">
                <Quote className="w-12 h-12 text-red-100" strokeWidth={1} />
              </div>
              
              {/* Testimonial Text */}
              <p className="text-sm leading-relaxed mb-8 text-gray-600">
                "{testimonial.text}"
              </p>
              
              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center font-bold text-white flex-shrink-0">
                  {testimonial.initials}
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-sm">{testimonial.name}</div>
                  <div className="text-xs text-gray-500">{testimonial.role} · {testimonial.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
