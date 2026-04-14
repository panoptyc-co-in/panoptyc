import React from "react";
import { Navigation2, ExternalLink } from "lucide-react";

const CTASection = ({ onApply }) => {
  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-br from-red-50 via-white to-slate-50">
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-6 text-red-600 bg-red-100 border border-red-200">
          Positions filling fast
        </span>

        <h2 className="text-4xl lg:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
          Ready to Start Your Career<br />
          <span className="text-red-500">with Panoptyc?</span>
        </h2>

        <p className="text-xl mb-10 max-w-2xl mx-auto text-slate-600">
          Join our growing team of remote analysts and help protect thousands of retail stores. Apply today — it only takes 2 minutes.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onApply}
            className="inline-flex items-center justify-center gap-2.5 px-10 py-4 rounded-xl font-bold text-white text-lg transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg bg-red-500 hover:bg-red-600"
          >
            <Navigation2 className="w-5 h-5" />
            Apply Now
          </button>
          <a
            href="https://panoptyc.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 px-10 py-4 rounded-xl font-bold text-slate-700 text-lg transition-all duration-200 hover:bg-slate-100 bg-white border border-slate-300"
          >
            Visit Panoptyc.com
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
