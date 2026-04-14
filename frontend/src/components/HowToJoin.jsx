import React from "react";
import { Edit3, User, FileText, Rocket } from "lucide-react";

const HowToJoin = ({ onApply }) => {
  const steps = [
    {
      step: "01",
      icon: Edit3,
      title: "Apply Online",
      description: "Fill the application form with your basic details. It only takes 2 minutes."
    },
    {
      step: "02",
      icon: User,
      title: "Complete Profile",
      description: "Set up your profile with personal details, education info, and passport photo."
    },
    {
      step: "03",
      icon: FileText,
      title: "Sign Agreement",
      description: "Review and sign the employment agreement digitally on our platform."
    },
    {
      step: "04",
      icon: Rocket,
      title: "Start Working",
      description: "Receive your employee code and begin your paid training immediately."
    }
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

        {/* Steps with vertical connecting lines */}
        <div className="relative max-w-6xl mx-auto">
          {/* Horizontal bottom line connecting all steps */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-200 via-red-300 to-pink-200" style={{ bottom: "40px" }} />
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {steps.map((stepItem, idx) => {
              const IconComponent = stepItem.icon;
              return (
                <div key={idx} className="flex flex-col items-center relative">
                  {/* Circular number badge at top */}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-red-400 flex items-center justify-center mb-4 shadow-lg relative z-20">
                    <span className="text-white font-bold text-sm">{stepItem.step}</span>
                  </div>
                  
                  {/* Vertical connecting line */}
                  <div className="absolute top-12 left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-pink-300 via-red-200 to-pink-200" style={{ height: "calc(100% - 80px)" }} />
                  
                  {/* Vertical pill/capsule container */}
                  <div className="relative z-10 bg-white rounded-[40px] px-6 py-12 shadow-sm border border-gray-100 flex flex-col items-center text-center h-full w-full max-w-[200px]">
                    {/* Icon inside pill */}
                    <div className="w-16 h-16 rounded-full bg-pink-50 flex items-center justify-center mb-6">
                      <IconComponent className="w-8 h-8 text-red-400" strokeWidth={1.5} />
                    </div>
                    
                    {/* Step label */}
                    <div className="text-xs font-bold uppercase tracking-wider text-red-500 mb-3">
                      STEP {stepItem.step}
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-base font-bold !text-[#0E1628] mb-3">{stepItem.title}</h3>
                    
                    {/* Description */}
                    <p className="text-xs text-gray-500 leading-relaxed">
                      {stepItem.description}
                    </p>
                  </div>
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