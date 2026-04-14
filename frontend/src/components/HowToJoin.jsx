import React from "react";
import { Send, User, FileText, Rocket } from "lucide-react";

const HowToJoin = ({ onApply }) => {
  const steps = [
    {
      step: "01",
      title: "Apply Online",
      description: "Fill the application form with your basic details. It only takes 2 minutes.",
      Icon: Send
    },
    {
      step: "02",
      title: "Complete Profile",
      description: "Set up your profile with personal details, education info, and passport photo.",
      Icon: User
    },
    {
      step: "03",
      title: "Sign Agreement",
      description: "Review and sign the employment agreement digitally on our platform.",
      Icon: FileText
    },
    {
      step: "04",
      title: "Start Working",
      description: "Receive your employee code and begin your paid training immediately.",
      Icon: Rocket
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.15em] mb-4 text-[#ef4444]">
            GETTING STARTED
          </span>
          <h2 className="text-[36px] md:text-[42px] font-extrabold text-[#0F172A] mb-4 tracking-tight">
            How to Join Panoptyc
          </h2>
          <p className="text-[16px] text-[#64748B]">
            A simple 4-step process to start your career
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Connecting Red Line (desktop only) */}
          <div className="hidden md:block absolute top-[40px] left-[12.5%] right-[12.5%] h-[1px] bg-red-200 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-x-6 gap-y-12 relative z-10">
            {steps.map((stepItem, idx) => {
              const IconComponent = stepItem.Icon;
              return (
                <div key={idx} className="flex flex-col items-center text-center">
                  {/* Icon Box */}
                  <div 
                    className="w-[80px] h-[80px] bg-white rounded-[24px] flex items-center justify-center mb-6 z-10 border-[1.5px] border-red-100"
                  >
                    <IconComponent 
                      className="w-[30px] h-[30px] text-[#ef4444]" 
                      strokeWidth={1.5} 
                    />
                  </div>
                  
                  {/* Step Num */}
                  <h4 className="text-[11px] font-bold tracking-[0.08em] mb-2 uppercase text-[#ef4444]">
                    STEP {stepItem.step}
                  </h4>
                  
                  {/* Title */}
                  <h3 className="text-[15px] font-bold text-[#0F172A] mb-2.5">
                    {stepItem.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-[13px] text-[#64748B] leading-[1.6] px-2 md:px-0 lg:px-3">
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