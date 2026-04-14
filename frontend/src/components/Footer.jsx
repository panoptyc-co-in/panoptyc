import React from "react";
import { Linkedin, Globe, BadgeCheck, Sparkles, Mail, MapPin } from "lucide-react";

const Footer = () => {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer style={{ background: "#0B1120" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Column 1: Logo & Description */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl px-4 py-2 inline-block mb-6">
              <img 
                src="https://customer-assets.emergentagent.com/job_remote-lead-hiring/artifacts/yyk8ba47_Panoptyc-Logo-HiRes.jpg" 
                alt="Panoptyc" 
                className="h-7 w-auto"
              />
            </div>
            <p className="text-[#94A3B8] text-[13px] leading-relaxed mb-6 max-w-sm">
              AI-powered video surveillance protecting 20,000+ retail locations across the United States.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a 
                href="https://www.linkedin.com/company/panoptyc/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors border border-white/5"
              >
                <Linkedin className="w-[14px] h-[14px] text-gray-400" />
              </a>
              <a 
                href="https://twitter.com/panoptyc" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors border border-white/5"
              >
                <svg className="w-[14px] h-[14px] text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a 
                href="https://panoptyc.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors border border-white/5"
              >
                <Globe className="w-[14px] h-[14px] text-gray-400" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white text-[13px] font-bold mb-5">Quick Links</h3>
            <ul className="space-y-3.5">
              <li>
                <button onClick={() => scrollTo("about")} className="text-gray-400 hover:text-white transition-colors text-[13px]">
                  About Panoptyc
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo("role")} className="text-gray-400 hover:text-white transition-colors text-[13px]">
                  Job Role
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo("benefits")} className="text-gray-400 hover:text-white transition-colors text-[13px]">
                  Benefits
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo("faq")} className="text-gray-400 hover:text-white transition-colors text-[13px]">
                  FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h3 className="text-white text-[13px] font-bold mb-5">Company</h3>
            <ul className="space-y-3.5">
              <li>
                <a href="https://panoptyc.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors text-[13px] flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5 opacity-70" />
                  Panoptyc.com
                </a>
              </li>
              <li>
                <a href="mailto:support@panoptyc.com" className="text-gray-400 hover:text-white transition-colors text-[13px] flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 opacity-70" />
                  Contact
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/company/panoptyc/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors text-[13px] flex items-center gap-2">
                  <Linkedin className="w-3.5 h-3.5 opacity-70" />
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="text-white text-[13px] font-bold mb-5">Contact</h3>
            <ul className="space-y-3.5">
              <li>
                <a href="mailto:support@panoptyc.com" className="text-gray-400 hover:text-white transition-colors text-[13px] flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 opacity-70" />
                  support@panoptyc.com
                </a>
              </li>
              <li>
                <span className="text-gray-400 text-[13px] flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 opacity-70" />
                  United States
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div 
          className="mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <p className="text-gray-500 text-[12px]">
            © {new Date().getFullYear()} Panoptyc. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <BadgeCheck className="w-[14px] h-[14px] text-green-500" />
              <span className="text-gray-400 text-[12px]">Verified Employer</span>
            </div>
            <div className="flex items-center gap-2">
              <BadgeCheck className="w-[14px] h-[14px] text-blue-500" />
              <span className="text-gray-400 text-[12px]">Official Hiring</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;;
