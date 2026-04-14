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
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? "rgba(248, 249, 250, 0.95)" : "rgba(248, 249, 250, 0.8)",
        backdropFilter: "blur(10px)"
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
              className="h-10 w-auto"
            />
          </a>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="px-3.5 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200 rounded-lg hover:bg-gray-100"
              >
                {link.label}
              </button>
            ))}
            <div className="w-px h-5 bg-gray-300 mx-2" />
            <button
              onClick={() => navigate("/passkey-order")}
              className="flex items-center gap-1.5 px-3.5 py-2 text-sm text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-all duration-200"
            >
              <Key className="w-3.5 h-3.5" />
              Passkey Order
            </button>
            <button
              onClick={onEmployeeLogin}
              className="flex items-center gap-1.5 px-3.5 py-2 text-sm text-cyan-600 hover:text-cyan-700 hover:bg-cyan-50 rounded-lg transition-all duration-200"
            >
              <Lock className="w-3.5 h-3.5" />
              Employee Login
            </button>
          </div>

          {/* Desktop CTA buttons */}
          <div className="hidden md:flex items-center gap-2">
            <button 
              onClick={() => navigate("/profile-setup")}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 border border-gray-300 hover:border-gray-400 hover:bg-gray-100 transition-all duration-200"
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
            className="md:hidden text-gray-700 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden py-4 px-4" style={{ backgroundColor: "rgba(248, 249, 250, 0.98)" }}>
          <div className="space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="block w-full text-left px-4 py-2.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors"
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
              className="flex items-center gap-2 w-full text-left px-4 py-2.5 text-sm text-cyan-600 hover:bg-cyan-50 rounded-xl transition-colors"
            >
              <Lock className="w-4 h-4" /> Employee Login
            </button>
            <div className="pt-3 flex flex-col gap-2">
              <button 
                onClick={() => { navigate("/profile-setup"); setMobileOpen(false); }}
                className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-gray-700 border border-gray-300 justify-center hover:bg-gray-100"
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
