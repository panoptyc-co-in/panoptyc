import React from "react";

const HowToJoin = ({ onApply }) => {
  const steps = [
    {
      step: "01",
      title: "Apply Online",
      description: "Fill the application form with your basic details. It only takes 2 minutes."
    },
    {
      step: "02",
      title: "Complete Profile",
      description: "Set up your profile with personal details, education info, and passport photo."
    },
    {
      step: "03",
      title: "Sign Agreement",
      description: "Review and sign the employment agreement digitally on our platform."
    },
    {
      step: "04",
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

        {/* Test tube style steps */}
        <div className="relative max-w-6xl mx-auto">
          {/* Horizontal pink bar at bottom */}
          <div 
            className="absolute bottom-0 left-0 right-0 rounded-full"
            style={{ 
              height: '12px',
              background: 'linear-gradient(90deg, rgba(251,207,232,0.5) 0%, #fbcfe8 25%, #fbcfe8 75%, rgba(251,207,232,0.5) 100%)',
              marginLeft: '6%',
              marginRight: '6%'
            }} 
          />
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-6">
            {steps.map((stepItem, idx) => (
              <div key={idx} className="flex flex-col items-center relative">
                {/* Pink rounded cap at top */}
                <div 
                  className="w-32 h-8 rounded-t-full mb-1"
                  style={{
                    background: 'linear-gradient(180deg, #fbcfe8 0%, rgba(251,207,232,0.6) 100%)',
                  }}
                />
                
                {/* Main white pill/tube body */}
                <div 
                  className="relative bg-white rounded-[4px] flex flex-col items-center"
                  style={{
                    width: '128px',
                    height: '520px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                    border: '1px solid rgba(0,0,0,0.02)'
                  }}
                >
                  {/* Red vertical line (liquid inside tube) */}
                  <div 
                    className="absolute left-1/2 -translate-x-1/2 rounded-full"
                    style={{
                      top: '60px',
                      width: '20px',
                      height: '280px',
                      background: 'linear-gradient(180deg, #ef4444 0%, #dc2626 50%, #b91c1c 100%)',
                      boxShadow: '0 2px 8px rgba(239,68,68,0.3)'
                    }}
                  />
                  
                  {/* Content inside pill */}
                  <div className="relative z-10 flex flex-col items-center w-full px-4 pt-8">
                    {/* Icon */}
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                      style={{ backgroundColor: 'rgba(251,207,232,0.3)' }}
                    >
                      <svg className="w-6 h-6" style={{ color: '#ef4444' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {idx === 0 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />}
                        {idx === 1 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />}
                        {idx === 2 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />}
                        {idx === 3 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />}
                      </svg>
                    </div>
                    
                    {/* Step label */}
                    <div className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#ef4444' }}>
                      STEP {stepItem.step}
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-center text-sm font-bold mb-2" style={{ color: '#0E1628' }}>
                      {stepItem.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-center text-xs leading-relaxed" style={{ color: '#9CA3AF' }}>
                      {stepItem.description}
                    </p>
                  </div>
                </div>
                
                {/* Pink rounded cap at bottom */}
                <div 
                  className="w-32 h-8 rounded-b-full mt-1"
                  style={{
                    background: 'linear-gradient(0deg, #fbcfe8 0%, rgba(251,207,232,0.6) 100%)',
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowToJoin;