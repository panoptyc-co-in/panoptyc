import React from "react";
import { industries } from "../mock";
import { ArrowRight } from "lucide-react";

const Industries = () => {
  return (
    <section className="py-24" style={{ backgroundColor: "#0d0d0d" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4" style={{ color: "#EF4444", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>
            Industries
          </span>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">Who We Serve</h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "#9CA3AF" }}>
            Panoptyc's AI solution protects assets across these retail segments
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((industry, i) => (
            <div
              key={i}
              className="group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1"
              style={{ border: "1px solid rgba(255,255,255,0.08)" }}
            >
              {/* Image */}
              <div className="relative overflow-hidden" style={{ height: "220px" }}>
                <img
                  src={industry.image}
                  alt={industry.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div
                  className="absolute inset-0 transition-opacity duration-300"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.1) 100%)" }}
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "rgba(239,68,68,0.15)" }}
                />
              </div>

              {/* Text overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="flex items-end justify-between">
                  <div>
                    <h3 className="text-white text-lg font-bold mb-1">{industry.title}</h3>
                    <p className="text-xs leading-relaxed max-w-xs" style={{ color: "#D1D5DB" }}>{industry.description}</p>
                  </div>
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ml-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0"
                    style={{ backgroundColor: "#EF4444" }}
                  >
                    <ArrowRight className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Industries;
