import React from "react";
import { Edit3, User, FileText, Rocket } from "lucide-react";

const HowToJoin = ({ onApply }) => {
  const steps = [
    {
      step: "01",
      icon: Edit3,
      title: "Apply Online",
      description: "Fill the application form with your basic details. It only takes 2 minutes.",
    },
    {
      step: "02",
      icon: User,
      title: "Complete Profile",
      description: "Set up your profile with personal details, education info, and passport photo.",
    },
    {
      step: "03",
      icon: FileText,
      title: "Sign Agreement",
      description: "Review and sign the employment agreement digitally on our platform.",
    },
    {
      step: "04",
      icon: Rocket,
      title: "Start Working",
      description: "Receive your employee code and begin your paid training immediately.",
    },
  ];

  return (
    <section className="py-24 !bg-[#FFFFFF]" style={{ backgroundColor: "#FAFAFA" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-bold uppercase tracking-widest mb-4 text-red-400">
            GETTING STARTED
          </span>
          <h2 className="text-4xl lg:text-5xl font-extrabold !text-[#0E1628] mb-4">How to Join Panoptyc</h2>
          <p className="text-lg text-gray-500">
            A simple 4-step process to start your career
          </p>
        </div>

        {/* Steps with connecting line */}
        <div className="relative max-w-5xl mx-auto mb-12">
          {/* Connecting Line */}
          <div className="absolute top-12 left-0 right-0 h-0.5 bg-red-200" style={{ left: "12%", right: "12%" }} />
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {steps.map((stepItem, idx) => {
              const IconComponent = stepItem.icon;
              return (
                <div key={idx} className="text-center">
                  {/* Icon */}
                  <div className="relative inline-block mb-6">
                    <div className="w-24 h-24 rounded-full bg-red-50 flex items-center justify-center mx-auto relative z-10">
                      <IconComponent className="w-10 h-10 text-red-400" strokeWidth={1.5} />
                    </div>
                  </div>
                  
                  {/* Step Number */}
                  <div className="text-xs font-bold uppercase tracking-wider text-red-500 mb-3">
                    STEP {stepItem.step}
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-lg font-bold !text-[#0E1628] mb-3">{stepItem.title}</h3>
                  
                  {/* Description */}
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {stepItem.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowToJoin;
