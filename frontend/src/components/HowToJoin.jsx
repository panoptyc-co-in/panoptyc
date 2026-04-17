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
        {/* Header */}
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

        {/* Steps */}
        <div className="relative max-w-5xl mx-auto">

          {/* Connecting line — runs between left edge of first icon and right edge of last icon,
              positioned at the BOTTOM of the 80px icon boxes */}
          <div
            className="hidden md:block absolute z-0"
            style={{
              top: "79px",          /* bottom of 80px icon box */
              left: "calc(12.5%)",  /* start at center of col 1 */
              right: "calc(12.5%)", /* end at center of col 4 */
              height: "1.5px",
              background: "#fecaca" /* red-200 */
            }}
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-x-8 gap-y-12 relative z-10">
            {steps.map((stepItem, idx) => {
              const IconComponent = stepItem.Icon;
              return (
                <div key={idx} className="flex flex-col items-center text-center">

                  {/* Icon Box — white bg, red border, rounded */}
                  <div
                    className="w-[80px] h-[80px] bg-white rounded-[20px] flex items-center justify-center mb-5 z-10 border border-red-100 shadow-sm"
                  >
                    <IconComponent
                      className="w-[28px] h-[28px] text-[#ef4444]"
                      strokeWidth={1.5}
                    />
                  </div>

                  {/* STEP XX */}
                  <span className="text-[10px] font-bold tracking-[0.12em] uppercase text-[#ef4444] mb-1.5">
                    STEP {stepItem.step}
                  </span>

                  {/* Title */}
                  <h3 className="text-[15px] font-bold text-[#0F172A] mb-2">
                    {stepItem.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[13px] text-[#64748B] leading-[1.65] px-1">
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