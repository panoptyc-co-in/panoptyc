import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, Key, Lock, User, Navigation2 } from "lucide-react";

const Navbar = ({ onApply, onEmployeeLogin }) => {
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#1a1f2e]/95 backdrop-blur-md shadow-xl"
          : "bg-[#1a1f2e]/60 backdrop-blur-sm"
      }`}
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
              className="h-10 w-auto"
            />
          </a>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="px-3.5 py-2 text-sm text-gray-300 hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/5"
              >
                {link.label}
              </button>
            ))}
            <div className="w-px h-5 bg-white/20 mx-2" />
            <button
              onClick={() => navigate("/passkey-order")}
              className="flex items-center gap-1.5 px-3.5 py-2 text-sm text-emerald-400 hover:text-emerald-300 hover:bg-white/5 rounded-lg transition-all duration-200"
            >
              <Key className="w-3.5 h-3.5" />
              Passkey Order
            </button>
            <button
              onClick={onEmployeeLogin}
              className="flex items-center gap-1.5 px-3.5 py-2 text-sm text-cyan-400 hover:text-cyan-300 hover:bg-white/5 rounded-lg transition-all duration-200"
            >
              <Lock className="w-3.5 h-3.5" />
              Employee Login
            </button>
          </div>

          {/* Desktop CTA buttons */}
          <div className="hidden md:flex items-center gap-2">
            <button 
              onClick={() => navigate("/profile-setup")}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all duration-200"
            >
              <User className="w-4 h-4" />
              Profile Setup
            </button>
            <button
              onClick={onApply}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all duration-200 hover:scale-105 active:scale-95 bg-[#EF4444] hover:bg-[#DC2626]"
            >
              <Navigation2 className="w-4 h-4" />
              Apply Now
            </button>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#1a1f2e]/98 border-t border-white/10 py-4 px-4">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="block w-full text-left px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
              >
                {link.label}
              </button>
            ))}
            <button 
              onClick={() => { navigate("/passkey-order"); setMobileOpen(false); }}
              className="flex items-center gap-2 w-full text-left px-4 py-2.5 text-sm text-emerald-400 hover:bg-white/5 rounded-xl transition-colors"
            >
              <Key className="w-4 h-4" /> Passkey Order
            </button>
            <button 
              onClick={() => { onEmployeeLogin(); setMobileOpen(false); }}
              className="flex items-center gap-2 w-full text-left px-4 py-2.5 text-sm text-cyan-400 hover:bg-white/5 rounded-xl transition-colors"
            >
              <Lock className="w-4 h-4" /> Employee Login
            </button>
            <div className="pt-3 flex flex-col gap-2">
              <button 
                onClick={() => { navigate("/profile-setup"); setMobileOpen(false); }}
                className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-white border border-white/20 justify-center"
              >
                <User className="w-4 h-4" /> Profile Setup
              </button>
              <button
                onClick={() => { onApply(); setMobileOpen(false); }}
                className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-white justify-center bg-[#EF4444]"
              >
                <Navigation2 className="w-4 h-4" /> Apply Now
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
