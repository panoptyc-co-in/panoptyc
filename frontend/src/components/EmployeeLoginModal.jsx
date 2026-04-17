import React, { useState } from "react";
import { Lock, LogIn, ArrowLeft, Shield, User } from "lucide-react";

const EmployeeLoginModal = ({ open, onClose }) => {
  const [employeeId, setEmployeeId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((res) => setTimeout(res, 1500));
    setLoading(false);
    alert("Login functionality coming soon!");
  };

  const handleClose = () => {
    setEmployeeId("");
    onClose();
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center"
      style={{ background: "rgba(5, 8, 20, 0.97)" }}
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
    >
      {/* Back to Home */}
      <button
        onClick={handleClose}
        className="absolute top-8 left-8 flex items-center gap-1.5 text-[13px] text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </button>

      {/* Card */}
      <div
        className="w-full max-w-[400px] mx-4 rounded-[20px] p-8 flex flex-col items-center"
        style={{
          background: "#161b2e",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        {/* Logo */}
        <div
          className="mb-6 px-5 py-2.5 rounded-[10px]"
          style={{ background: "#1f2540", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <img
            src="https://customer-assets.emergentagent.com/job_remote-lead-hiring/artifacts/yyk8ba47_Panoptyc-Logo-HiRes.jpg"
            alt="Panoptyc"
            className="h-8 w-auto"
          />
        </div>

        {/* Lock Icon */}
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center mb-5"
          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
        >
          <Lock className="w-5 h-5 text-gray-300" strokeWidth={1.5} />
        </div>

        {/* Title */}
        <h2 className="text-[22px] font-bold text-white mb-1.5">
          Employee Login
        </h2>
        <p className="text-[13px] text-gray-400 mb-7">
          Enter your Employee ID to continue
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          {/* Employee ID field */}
          <div>
            <label className="block text-[12px] font-semibold text-gray-300 mb-1.5">
              Employee ID <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                required
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                placeholder="Enter your Employee ID"
                className="w-full pl-10 pr-4 py-3 text-[14px] text-white placeholder-gray-600 rounded-[10px] outline-none transition-all duration-200 focus:border-red-500/50"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              />
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-[10px] font-semibold text-[15px] text-white transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed hover:brightness-110 active:scale-[0.98] flex items-center justify-center gap-2 mt-1"
            style={{ backgroundColor: "#b91c1c" }}
          >
            {loading ? (
              <>
                <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                Logging In...
              </>
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                Login
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="flex items-center gap-1.5 mt-7">
          <Shield className="w-3 h-3 text-gray-600" />
          <span className="text-[11px] text-gray-600">
            Secured by Panoptyc Authentication
          </span>
        </div>
      </div>
    </div>
  );
};

export default EmployeeLoginModal;