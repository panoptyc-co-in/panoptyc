import React from "react";
import {
  IndianRupee, Home, BookOpen, TrendingUp, Users, Cpu
} from "lucide-react";
import { benefits } from "../mock";

const iconMap = { IndianRupee, Home, BookOpen, TrendingUp, Users, Cpu };

const Benefits = ({ onApply }) => {
  return (
    <section id="benefits" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4 text-red-600 bg-red-50 border border-red-200">
            Perks &amp; Benefits
          </span>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4">
            Why You'll Love Working Here
          </h2>
          <p className="text-lg max-w-xl mx-auto text-slate-600">
            We invest in our team's success and well-being from day one
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {benefits.map((benefit, i) => {
            const Icon = iconMap[benefit.icon] || IndianRupee;
            return (
              <div
                key={i}
                className="group p-7 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg bg-slate-50 border border-slate-200"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 bg-red-50 border border-red-200"
                >
                  <Icon className="w-7 h-7 text-red-500" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{benefit.title}</h3>
                <p className="text-sm leading-relaxed text-slate-600">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
