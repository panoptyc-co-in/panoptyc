import React from "react";
import {
  Monitor, Eye, FileText, Shield, BarChart3, Users,
  GraduationCap, Globe, Wifi, Laptop, Moon,
  Navigation2, Wifi as WifiIcon, IndianRupee
} from "lucide-react";
import { roleResponsibilities } from "../mock";

const respIcons = [Monitor, Eye, FileText, Shield, BarChart3, Users];

const requirements = [
  { title: "Education", description: "Minimum 12th pass or Graduate degree", icon: GraduationCap },
  { title: "English", description: "Basic English reading and writing skills", icon: Globe },
  { title: "Internet", description: "Stable internet connection (minimum 10 Mbps)", icon: Wifi },
  { title: "Equipment", description: "Own laptop or desktop with webcam", icon: Laptop },
  { title: "Night Shifts", description: "Comfortable working US night hours (IST)", icon: Moon },
  { title: "Attention", description: "Strong attention to detail and observation skills", icon: Eye },
];

const RoleSection = ({ onApply }) => {
  return (
    <>
      {/* Role Section */}
      <section id="role" className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            {/* Left: Responsibilities */}
            <div>
              <span className="text-red-500 font-medium text-xs uppercase tracking-widest">Your Role</span>
              <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mt-3 mb-4 font-['Outfit']">
                Remote Video Surveillance Analyst
              </h2>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-6">
                As a Remote Video Surveillance Analyst, you'll be the frontline defender protecting retail stores across the United States. Using our cutting-edge AI platform, you'll monitor live feeds, catch theft in real-time, and make a direct impact on loss prevention.
              </p>
              <div className="space-y-3">
                {roleResponsibilities.map((resp, i) => {
                  const Icon = respIcons[i] || Monitor;
                  return (
                    <div key={i} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-slate-100">
                      <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon className="w-4 h-4 text-red-500" />
                      </div>
                      <p className="text-slate-700 text-sm">{resp}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Image with floating badges */}
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3987020/pexels-photo-3987020.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Remote surveillance analyst working from home"
                className="rounded-2xl shadow-2xl w-full"
              />
              {/* Bottom-left badge */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-xl p-4 border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <WifiIcon className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">100% Remote</p>
                    <p className="text-xs text-slate-500">Work from anywhere in India</p>
                  </div>
                </div>
              </div>
              {/* Top-right badge */}
              <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-xl p-4 border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <IndianRupee className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">₹35,000/mo</p>
                    <p className="text-xs text-slate-500">Competitive salary</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-red-500 font-medium text-xs uppercase tracking-widest">What We Need</span>
            <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mt-3 font-['Outfit']">Requirements</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
            {requirements.map((req, i) => {
              const Icon = req.icon;
              return (
                <div
                  key={i}
                  className="flex items-start gap-3 p-4 md:p-5 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-md hover:border-red-100 transition-all"
                >
                  <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{req.title}</h4>
                    <p className="text-slate-500 text-xs mt-0.5">{req.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default RoleSection;
