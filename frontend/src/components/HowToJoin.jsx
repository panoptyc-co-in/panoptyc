import React from "react";
import { Send, User, FileText, Rocket, Navigation2 } from "lucide-react";

const steps = [
  { number: "01", title: "Apply Online", description: "Fill the application form with your basic details. It only takes 2 minutes.", icon: Send },
  { number: "02", title: "Complete Profile", description: "Set up your profile with personal details, education info, and passport photo.", icon: User },
  { number: "03", title: "Sign Agreement", description: "Review and sign the employment agreement digitally on our platform.", icon: FileText },
  { number: "04", title: "Start Working", description: "Receive your employee code and begin your paid training immediately.", icon: Rocket },
];

const HowToJoin = ({ onApply }) => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-red-500 font-medium text-xs uppercase tracking-widest">Getting Started</span>
          <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mt-3 font-['Outfit']">How to Join Panoptyc</h2>
          <p className="text-slate-500 text-sm md:text-base mt-2">A simple 4-step process to start your career</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-16 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-red-200 via-red-400 to-red-200" />

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={i} className="relative text-center">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border-2 border-red-100 relative z-10 bg-white">
                  <Icon className="w-6 h-6 md:w-7 md:h-7 text-red-500" />
                </div>
                <div className="text-red-500 text-xs font-bold mb-1">STEP {step.number}</div>
                <h3 className="text-sm md:text-base font-bold text-slate-900 font-['Outfit'] mb-1">{step.title}</h3>
                <p className="text-slate-500 text-xs md:text-sm">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowToJoin;
