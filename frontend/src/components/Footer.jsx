import React from "react";
import { Linkedin, Globe, BadgeCheck, Sparkles } from "lucide-react";

const Footer = ({ onApply }) => {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer style={{ background: "#0f1621", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: Logo & Description */}
          <div>
            <div className="bg-white rounded-xl px-4 py-2 inline-block mb-6">
              <img 
                src="https://customer-assets.emergentagent.com/job_remote-lead-hiring/artifacts/yyk8ba47_Panoptyc-Logo-HiRes.jpg" 
                alt="Panoptyc" 
                className="h-10 w-auto"
              />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              AI-powered video surveillance protecting 20,000+ retail locations across the United States.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a 
                href="https://www.linkedin.com/company/panoptyc/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
              >
                <Linkedin className="w-5 h-5 text-gray-400" />
              </a>
              <a 
                href="https://twitter.com/panoptyc" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
              >
                <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a 
                href="https://panoptyc.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
              >
                <Globe className="w-5 h-5 text-gray-400" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollTo("about")}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  About Panoptyc
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("role")}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Job Role
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("benefits")}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Benefits
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("faq")}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h3 className="text-white text-lg font-bold mb-6">Company</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://panoptyc.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-1"
                >
                  <Globe className="w-4 h-4" />
                  Panoptyc.com
                </a>
              </li>
              <li>
                <a
                  href="mailto:support@panoptyc.com"
                  className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/company/panoptyc/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-1"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="text-white text-lg font-bold mb-6">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:support@panoptyc.com"
                  className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  support@panoptyc.com
                </a>
              </li>
              <li>
                <span className="text-gray-400 text-sm flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  United States
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div 
          className="mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Panoptyc. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                <BadgeCheck className="w-4 h-4 text-green-500" />
              </div>
              <span className="text-gray-400 text-sm font-medium">Verified Employer</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-blue-500" />
              </div>
              <span className="text-gray-400 text-sm font-medium">Official Hiring</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
