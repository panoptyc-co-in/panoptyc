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

        {/* Steps Container */}
        <div className="relative max-w-5xl mx-auto">
          {/* Horizontal connecting line at bottom */}
          <div 
            className="absolute left-0 right-0 h-1" 
            style={{ 
              bottom: '0px',
              background: 'linear-gradient(90deg, rgba(244,114,182,0.3) 0%, rgba(244,114,182,0.8) 50%, rgba(244,114,182,0.3) 100%)',
              marginLeft: '12.5%',
              marginRight: '12.5%',
              width: '75%'
            }} 
          />
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
            {steps.map((stepItem, idx) => (
              <div key={idx} className="flex flex-col items-center px-4">
                {/* Step number circle at top */}
                <div 
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-8 relative z-20"
                  style={{
                    background: 'linear-gradient(135deg, #f472b6 0%, #ec4899 100%)',
                    boxShadow: '0 4px 12px rgba(236,72,153,0.3)'
                  }}
                >
                  <span className="text-white font-bold text-lg">{stepItem.step}</span>
                </div>
                
                {/* Vertical white pill/bar */}
                <div className="relative w-full max-w-[180px] mb-12">
                  {/* Vertical connecting line inside pill */}
                  <div 
                    className="absolute left-1/2 top-0 w-1 -translate-x-1/2"
                    style={{
                      height: '350px',
                      background: 'linear-gradient(180deg, rgba(244,114,182,0.4) 0%, rgba(244,114,182,0.2) 50%, rgba(244,114,182,0.1) 100%)'
                    }}
                  />
                  
                  {/* White pill container */}
                  <div 
                    className="relative bg-white rounded-[32px] p-6 pt-8 pb-12 shadow-sm"
                    style={{
                      minHeight: '350px',
                      border: '1px solid rgba(0,0,0,0.04)'
                    }}
                  >
                    {/* Icon placeholder - you can add lucide icons here */}
                    <div className="flex justify-center mb-6">
                      <div 
                        className="w-16 h-16 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: 'rgba(244,114,182,0.1)' }}
                      >
                        <svg className="w-8 h-8" style={{ color: '#ec4899' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          {idx === 0 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />}
                          {idx === 1 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />}
                          {idx === 2 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />}
                          {idx === 3 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />}
                        </svg>
                      </div>
                    </div>
                    
                    {/* Step label */}
                    <div className="text-center mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#ec4899' }}>
                        STEP {stepItem.step}
                      </span>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-center text-lg font-bold mb-3" style={{ color: '#0E1628' }}>
                      {stepItem.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-center text-sm leading-relaxed" style={{ color: '#6B7280' }}>
                      {stepItem.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowToJoin;