import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
} from "./ui/dialog";
import { Mail, Lock, UserPlus, LogIn, CheckCircle, Copy, Check, AlertCircle, LogOut, User, Phone, MapPin, GraduationCap } from "lucide-react";
import { apiUrl, readJsonSafely } from "../lib/api";

// ─── Reusable Employee Success Card ──────────────────────────────────────────
export const EmployeeSuccessCard = ({ session, onClose, onLogout }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(session.employeeCode || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="px-5 py-6" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Header: Photo + Name */}
      <div className="flex items-center gap-4 mb-5">
        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200 flex-shrink-0 bg-gray-100 flex items-center justify-center">
          {session.photo
            ? <img src={session.photo} alt="Profile" className="w-full h-full object-cover" />
            : <User className="w-7 h-7 text-gray-400" />}
        </div>
        <div>
          <h2 className="text-[18px] font-extrabold text-[#0f172a] leading-tight">
            {session.firstName} {session.lastName}
          </h2>
          <p className="text-[12px] text-gray-500 mt-0.5">{session.email}</p>
          <div className="flex items-center gap-1 mt-1">
            <CheckCircle size={12} className="text-green-500" />
            <span className="text-[11px] text-green-600 font-semibold">Verified Employee</span>
          </div>
        </div>
      </div>

      {/* Employee Code */}
      <div className="bg-[#0f172a] rounded-xl px-4 py-3 mb-4 flex items-center justify-between">
        <div>
          <span className="text-[9px] text-gray-500 uppercase tracking-widest block mb-1">Employee Code</span>
          <span className="text-[16px] font-bold tracking-widest" style={{ color: "#4ade80", fontFamily: "monospace" }}>
            {session.employeeCode || "—"}
          </span>
        </div>
        {session.employeeCode && (
          <button
            onClick={handleCopy}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            title="Copy Code"
          >
            {copied
              ? <Check size={14} className="text-green-400" />
              : <Copy size={14} className="text-gray-300" />}
          </button>
        )}
      </div>

      {/* Profile Details Grid */}
      <div className="bg-gray-50 rounded-xl p-4 mb-4 space-y-2.5">
        {session.mobile && (
          <div className="flex items-center gap-2.5">
            <Phone size={13} className="text-gray-400 flex-shrink-0" />
            <div>
              <span className="text-[10px] text-gray-400 uppercase tracking-wide block">Mobile</span>
              <span className="text-[13px] font-semibold text-gray-800">+91 {session.mobile}</span>
            </div>
          </div>
        )}
        {session.education && (
          <div className="flex items-center gap-2.5">
            <GraduationCap size={13} className="text-gray-400 flex-shrink-0" />
            <div>
              <span className="text-[10px] text-gray-400 uppercase tracking-wide block">Education</span>
              <span className="text-[13px] font-semibold text-gray-800">{session.education}</span>
            </div>
          </div>
        )}
        {session.address && (
          <div className="flex items-start gap-2.5">
            <MapPin size={13} className="text-gray-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] text-gray-400 uppercase tracking-wide block">Address</span>
              <span className="text-[13px] font-semibold text-gray-800">{session.address}</span>
            </div>
          </div>
        )}
      </div>

      {/* Warning Note */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl px-3 py-2.5 mb-4 text-left">
        <div className="flex items-center gap-1.5">
          <AlertCircle size={12} className="text-amber-500 flex-shrink-0" />
          <span className="text-[11px] font-semibold text-amber-700">Save your code for attendance &amp; official communications.</span>
        </div>
      </div>

      {/* Logout + Close */}
      <div className="flex flex-col gap-2">
        <button
          onClick={onClose}
          className="w-full py-3 rounded-full font-bold text-[15px] text-white transition-all hover:brightness-110 active:scale-[0.98]"
          style={{ background: "#ef4444" }}
        >
          Close
        </button>
        <button
          onClick={onLogout}
          className="w-full py-2.5 rounded-full font-semibold text-[14px] text-gray-500 hover:text-red-500 hover:bg-red-50 transition-all flex items-center justify-center gap-2"
        >
          <LogOut size={15} />
          Logout
        </button>
      </div>
    </div>
  );
};

// ─── Main Modal ───────────────────────────────────────────────────────────────
const ProfileSetupModal = ({ open, onClose }) => {
  const navigate = useNavigate();
  const [mode, setMode] = useState("login"); // "login" | "register"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState(null); // logged-in employee
  const sessionInvalidNotifiedRef = useRef(false);

  // Check localStorage for existing session on open
  useEffect(() => {
    if (open) {
      const stored = localStorage.getItem("panoptyc_employee");
      if (stored) {
        try {
          setSession(JSON.parse(stored));
        } catch {
          setSession(null);
        }
      } else {
        setSession(null);
      }
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;

    let isMounted = true;

    const validateStoredSession = async () => {
      const stored = localStorage.getItem("panoptyc_employee");
      if (!stored) return;

      try {
        const parsed = JSON.parse(stored);
        const email = (parsed?.email || "").trim().toLowerCase();
        if (!email) return;

        const response = await fetch(apiUrl("/api/deleted-records"));
        if (!response.ok) return;

        const deleted = await readJsonSafely(response);
        const disabledEmails = (deleted?.profile_setups || []).map((item) => String(item).trim().toLowerCase());

        if (disabledEmails.includes(email)) {
          localStorage.removeItem("panoptyc_employee");
          if (isMounted) {
            setSession(null);
            setMode("login");
            if (!sessionInvalidNotifiedRef.current) {
              sessionInvalidNotifiedRef.current = true;
              alert("Your account was removed by admin. Please contact support.");
            }
          }
        }
      } catch {
        // Ignore transient parse/network issues and retry on next check.
      }
    };

    validateStoredSession();
    const intervalId = setInterval(validateStoredSession, 10000);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
      sessionInvalidNotifiedRef.current = false;
    };
  }, [open]);

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleClose = () => {
    resetForm();
    setMode("login");
    onClose();
  };

  const handleLogout = () => {
    localStorage.removeItem("panoptyc_employee");
    setSession(null);
    resetForm();
    setMode("login");
  };

  const switchMode = (newMode) => {
    resetForm();
    setMode(newMode);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Register: skip API, go straight to complete profile flow
    if (mode === "register") {
      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      handleClose();
      navigate("/complete-profile", { state: { email, password } });
      return;
    }

    // Login
    setLoading(true);
    try {
      const response = await fetch(apiUrl("/api/employee-login"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const result = await readJsonSafely(response);
      if (response.ok && result.success) {
        // Save full session to localStorage (includes all profile fields)
        const newSession = {
          firstName: result.employee.firstName,
          lastName: result.employee.lastName,
          email: result.employee.email,
          mobile: result.employee.mobile || "",
          address: result.employee.address || "",
          education: result.employee.education || "",
          photo: result.employee.photo || "",
          employeeCode: result.employee.employeeCode,
        };
        localStorage.setItem("panoptyc_employee", JSON.stringify(newSession));
        setSession(newSession);
        resetForm();
      } else {
        throw new Error(result.detail || "Login failed");
      }
    } catch (error) {
      alert(`❌ Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="w-[95vw] sm:max-w-[460px] bg-white p-0 gap-0 border-none rounded-[20px] shadow-2xl overflow-y-auto max-h-[90vh]">

        {/* ── If logged in: show employee card ── */}
        {session ? (
          <EmployeeSuccessCard
            session={session}
            onClose={handleClose}
            onLogout={handleLogout}
          />
        ) : (
          <>
            {/* Logo */}
            <div className="flex justify-center pt-6 sm:pt-8 pb-0">
              <div className="bg-gray-100 rounded-[12px] px-4 sm:px-6 py-2 sm:py-2.5">
                <img
                  src="https://customer-assets.emergentagent.com/job_remote-lead-hiring/artifacts/yyk8ba47_Panoptyc-Logo-HiRes.jpg"
                  alt="Panoptyc"
                  className="h-7 sm:h-9 w-auto"
                />
              </div>
            </div>

            {/* Title */}
            <div className="text-center px-4 sm:px-8 pt-4 sm:pt-6 pb-2">
              <h2 className="text-[22px] sm:text-[26px] font-extrabold text-gray-900">
                {mode === "login" ? "Login to Your Account" : "Create Your Account"}
              </h2>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="px-4 sm:px-8 pt-4 pb-6 sm:pb-8 space-y-4">

              {/* Email Address */}
              <div>
                <label className="block text-[14px] font-semibold text-gray-800 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" style={{ width: "18px", height: "18px" }} />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-3 text-[14px] text-gray-800 placeholder-gray-400 border border-gray-300 rounded-[10px] outline-none transition-all duration-200 focus:border-red-400 focus:ring-2 focus:ring-red-100 bg-white"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-[14px] font-semibold text-gray-800 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" style={{ width: "18px", height: "18px" }} />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-4 py-3 text-[14px] text-gray-800 placeholder-gray-400 border border-gray-300 rounded-[10px] outline-none transition-all duration-200 focus:border-red-400 focus:ring-2 focus:ring-red-100 bg-white"
                  />
                </div>
              </div>

              {/* Confirm Password — register only */}
              {mode === "register" && (
                <div>
                  <label className="block text-[14px] font-semibold text-gray-800 mb-1.5">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" style={{ width: "18px", height: "18px" }} />
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm your password"
                      className="w-full pl-10 pr-4 py-3 text-[14px] text-gray-800 placeholder-gray-400 border border-gray-300 rounded-[10px] outline-none transition-all duration-200 focus:border-red-400 focus:ring-2 focus:ring-red-100 bg-white"
                    />
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-full font-bold text-[16px] text-white transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed hover:brightness-110 active:scale-[0.98] flex items-center justify-center gap-2.5 mt-1"
                style={{ backgroundColor: "#ef4444" }}
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    {mode === "login" ? "Logging In..." : "Continuing..."}
                  </>
                ) : mode === "login" ? (
                  <>
                    <LogIn className="w-5 h-5" />
                    Login
                  </>
                ) : (
                  <>
                    <UserPlus className="w-5 h-5" />
                    Continue to Profile
                  </>
                )}
              </button>

              {/* Toggle Link */}
              {mode === "login" ? (
                <p className="text-center text-[14px] text-gray-500 pt-1">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => switchMode("register")}
                    className="font-bold text-red-500 hover:text-red-600"
                  >
                    Register
                  </button>
                </p>
              ) : (
                <p className="text-center text-[14px] text-gray-500 pt-1">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => switchMode("login")}
                    className="font-bold text-red-500 hover:text-red-600"
                  >
                    Login
                  </button>
                </p>
              )}

            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ProfileSetupModal;
