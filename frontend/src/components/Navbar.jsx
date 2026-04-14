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
          ? "bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200"
          : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="/"
            className="text-2xl font-extrabold tracking-tight text-red-500"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            panoptyc
          </a>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="px-3.5 py-2 text-sm text-slate-600 hover:text-slate-900 transition-colors duration-200 rounded-lg hover:bg-slate-100"
              >
                {link.label}
              </button>
            ))}
            <div className="w-px h-5 bg-slate-300 mx-2" />
            <button
              onClick={() => navigate("/passkey-order")}
              className="flex items-center gap-1.5 px-3.5 py-2 text-sm text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-all duration-200"
            >
              <Key className="w-3.5 h-3.5" />
              Passkey Order
            </button>
            <button
              onClick={onEmployeeLogin}
              className="flex items-center gap-1.5 px-3.5 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all duration-200"
            >
              <Lock className="w-3.5 h-3.5" />
              Employee Login
            </button>
          </div>

          {/* Desktop CTA buttons */}
          <div className="hidden md:flex items-center gap-2">
            <button 
              onClick={() => navigate("/profile-setup")}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-700 border border-slate-300 hover:border-slate-400 hover:bg-slate-50 transition-all duration-200"
            >
              <User className="w-4 h-4" />
              Profile Setup
            </button>
            <button
              onClick={onApply}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all duration-200 hover:scale-105 active:scale-95 bg-red-500 hover:bg-red-600"
            >
              <Navigation2 className="w-4 h-4" />
              Apply Now
            </button>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-slate-900 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 py-4 px-4 shadow-lg">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="block w-full text-left px-4 py-2.5 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
              >
                {link.label}
              </button>
            ))}
            <button 
              onClick={() => { navigate("/passkey-order"); setMobileOpen(false); }}
              className="flex items-center gap-2 w-full text-left px-4 py-2.5 text-sm text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors"
            >
              <Key className="w-4 h-4" /> Passkey Order
            </button>
            <button 
              onClick={() => { onEmployeeLogin(); setMobileOpen(false); }}
              className="flex items-center gap-2 w-full text-left px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              <Lock className="w-4 h-4" /> Employee Login
            </button>
            <div className="pt-3 flex flex-col gap-2">
              <button 
                onClick={() => { navigate("/profile-setup"); setMobileOpen(false); }}
                className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-slate-700 border border-slate-300 justify-center hover:bg-slate-50"
              >
                <User className="w-4 h-4" /> Profile Setup
              </button>
              <button
                onClick={() => { onApply(); setMobileOpen(false); }}
                className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-white justify-center bg-red-500 hover:bg-red-600"
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
