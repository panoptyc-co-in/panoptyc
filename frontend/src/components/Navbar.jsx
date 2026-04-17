import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, Key, Lock, User, Navigation2, Send } from "lucide-react";

const Navbar = ({ onApply, onProfileSetup }) => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const navLinks = [
    { label: "About", id: "about" },
    { label: "Role", id: "role" },
    { label: "Benefits", id: "benefits" },
    { label: "FAQ", id: "faq" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(255, 255, 255, 0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(10px)" : "none"
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="/"
            className="flex items-center"
          >
            <img 
              src="https://customer-assets.emergentagent.com/job_remote-lead-hiring/artifacts/yyk8ba47_Panoptyc-Logo-HiRes.jpg" 
              alt="Panoptyc" 
              className="h-10 w-auto rounded-lg"
            />
          </a>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`px-3.5 py-2 text-sm transition-colors duration-200 rounded-lg ${
                  scrolled
                    ? "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    : "text-gray-300 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.label}
              </button>
            ))}
            <div className={`w-px h-5 mx-2 ${scrolled ? "bg-gray-300" : "bg-white/20"}`} />
            <button
              onClick={() => navigate("/passkey-order")}
              className={`flex items-center gap-1.5 px-3.5 py-2 text-sm transition-all duration-200 rounded-lg ${
                scrolled
                  ? "text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                  : "text-emerald-400 hover:text-emerald-300 hover:bg-white/10"
              }`}
            >
              <Key className="w-3.5 h-3.5" />
              Passkey Order
            </button>
            <button
              onClick={() => navigate("/employee-login")}
              className={`flex items-center gap-1.5 px-3.5 py-2 transition-all duration-200 ${
                scrolled
                  ? "text-[#4dabf5] hover:text-blue-500"
                  : "text-[#4dabf5] hover:text-blue-400"
              }`}
            >
              <Lock className="w-4 h-4" />
              <span className="text-[15px] font-medium">Employee Login</span>
            </button>
          </div>

          {/* Desktop CTA buttons */}
          <div className="hidden md:flex items-center gap-3 ml-2">
            <button 
              onClick={onProfileSetup}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-[15px] font-medium transition-all duration-200 border ${
                scrolled
                  ? "text-gray-700 border-gray-300 hover:bg-gray-100"
                  : "text-white border-white/20 bg-[#3b4252]/80 hover:bg-[#3b4252]"
              }`}
            >
              <User className="w-4 h-4" />
              Profile Setup
            </button>
            <button
              onClick={onApply}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-[15px] font-medium text-white transition-all duration-200 hover:scale-105 active:scale-95 bg-[#ef4444] hover:bg-[#dc2626]"
            >
              <Send className="w-4 h-4" />
              Apply Now
            </button>
          </div>

          {/* Mobile menu toggle */}
          <button
            className={`md:hidden p-2 rounded-xl transition-colors ${
              scrolled ? "text-gray-700 bg-gray-100/50 hover:bg-gray-100" : "text-white bg-[#3b4252]/50 border border-white/20"
            }`}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden absolute top-[72px] left-0 right-0 py-4 pb-6 bg-[#111827] shadow-xl border-t border-white/5">
          <div className="flex flex-col">
            <button 
              onClick={() => { navigate("/passkey-order"); setMobileOpen(false); }}
              className="flex items-center gap-4 w-full text-left px-6 py-4 text-[15px] font-medium text-white hover:bg-white/5 transition-colors"
            >
              <Key className="w-[18px] h-[18px] text-[#10b981]" /> Passkey Order
            </button>
            <button 
              onClick={() => { navigate("/employee-login"); setMobileOpen(false); }}
              className="flex items-center gap-4 w-full text-left px-6 py-4 text-[15px] font-medium text-white hover:bg-white/5 transition-colors"
            >
              <Lock className="w-[18px] h-[18px] text-[#3b82f6]" /> Employee Login
            </button>
            <button 
              onClick={() => { onProfileSetup(); setMobileOpen(false); }}
              className="flex items-center gap-4 w-full text-left px-6 py-4 text-[15px] font-medium text-white hover:bg-white/5 transition-colors"
            >
              <User className="w-[18px] h-[18px] text-white" /> Profile Setup
            </button>
            <button
              onClick={() => { onApply(); setMobileOpen(false); }}
              className="flex items-center gap-4 w-full text-left px-6 py-4 text-[15px] font-medium text-white hover:bg-white/5 transition-colors"
            >
              <Send className="w-[18px] h-[18px] text-[#ef4444]" /> Apply Now
            </button>
            
            <div className="h-px bg-white/10 my-4 mx-6" />

            <div className="flex flex-wrap gap-2.5 px-6 pt-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="px-5 py-2 text-[14px] font-medium text-gray-300 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

    </nav>
  );
};

export default Navbar;
