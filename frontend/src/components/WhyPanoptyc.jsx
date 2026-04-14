import React from "react";
import { ShoppingCart, TriangleAlert, Eye, TrendingUp } from "lucide-react";

const features = [
  {
    title: "Cashier Shrink",
    description: "AI-powered detection identifies cashier theft patterns including sweethearting, no-scans, and under-ringing across thousands of POS transactions daily.",
    highlight: "\u20b92.5L+ saved per store",
    icon: ShoppingCart,
  },
  {
    title: "Self-Checkout Theft",
    description: "Our platform monitors self-checkout stations in real-time, catching skip-scans, ticket switching, and walkouts before losses accumulate.",
    highlight: "60% theft reduction",
    icon: TriangleAlert,
  },
  {
    title: "Complete Visibility",
    description: "Retailers know shrink numbers but not where it comes from. Panoptyc pinpoints exact sources of loss with video evidence and analytics.",
    highlight: "30% shrink reduction",
    icon: Eye,
  },
];

const WhyPanoptyc = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-red-500 font-medium text-xs uppercase tracking-widest">What We Do</span>
          <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mt-3 font-['Outfit']">Why Panoptyc?</h2>
          <p className="text-slate-500 text-sm md:text-base mt-2 max-w-2xl mx-auto">
            Grocers and retail operators turn to Panoptyc to solve their biggest loss prevention challenges
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {features.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <div
                key={i}
                className="group bg-slate-50 rounded-2xl p-6 md:p-8 border border-slate-100 hover:shadow-lg hover:border-red-100 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-red-500 transition-colors">
                  <Icon className="w-6 h-6 text-red-500 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 font-['Outfit']">{feat.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">{feat.description}</p>
                <div className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                  <TrendingUp className="w-3 h-3" />
                  {feat.highlight}
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
