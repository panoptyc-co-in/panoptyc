import React from "react";
import { Navigation2, ExternalLink } from "lucide-react";

const Footer = ({ onApply }) => {
  const footerLinks = [
    { label: "About", href: "#about" },
    { label: "Role", href: "#role" },
    { label: "Benefits", href: "#benefits" },
    { label: "FAQ", href: "#faq" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ];

  const scrollTo = (id) => {
    if (id.startsWith("#") && id.length > 1) {
      const el = document.getElementById(id.slice(1));
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Brand */}
          <div className="text-center lg:text-left">
            <div
              className="text-2xl font-extrabold tracking-tight mb-2 text-red-500"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              panoptyc
            </div>
            <p className="text-sm text-slate-600">
              AI-Powered Retail Loss Prevention<br />
              <span className="text-xs">Protecting 20,000+ stores worldwide</span>
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {footerLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className="text-sm transition-colors duration-200 hover:text-slate-900 text-slate-600"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* CTA */}
          <button
            onClick={onApply}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-white text-sm transition-all duration-200 hover:scale-105 bg-red-500 hover:bg-red-600"
          >
            <Navigation2 className="w-4 h-4" />
            Apply Now
          </button>
        </div>

        <div
          className="mt-10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs border-t border-slate-200 text-slate-500"
        >
          <p>&copy; {new Date().getFullYear()} Panoptyc Inc. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Remote jobs in India for</span>
            <a
              href="https://panoptyc.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-700 transition-colors flex items-center gap-1"
            >
              panoptyc.com <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
