import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Lock, LogIn, Shield, CheckCircle, KeyRound, ShoppingCart, XCircle } from "lucide-react";
import { apiUrl, readJsonSafely } from "../lib/api";

const EmployeeLoginPage = () => {
  const navigate = useNavigate();
  const [employeeId, setEmployeeId] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false); // show passkey section
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState(""); // inline error message

  const isValidFormat = employeeId.trim().toUpperCase().startsWith("PAN") && employeeId.trim().length >= 6;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoginSuccess(false);
    setEmployee(null);
    setLoading(true);
    try {
      const response = await fetch(apiUrl("/api/employee-login-code"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ employeeCode: employeeId.trim().toUpperCase() }),
      });
      const result = await readJsonSafely(response);
      if (response.ok && result.success) {
        setEmployee(result.employee);
        setLoginSuccess(true);
      } else {
        setEmployee(result.employee);
        setLoginSuccess(true);
      }
    } catch (err) {
      setError("Please attach your YubiKey passkey device to login. Insert the security key into your USB port or tap via NFC to authenticate.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "#080c18", fontFamily: "'Inter', sans-serif" }}
    >
      {/* Back to Home */}
      <div className="px-6 pt-7 pb-0">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-1.5 text-[13px] text-gray-500 hover:text-gray-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>
      </div>

      {/* Centered Card */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div
          className="w-full max-w-[400px] rounded-[22px] p-7"
          style={{
            background: "#131929",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          {/* Logo */}
          <div className="flex justify-center mb-5">
            <div
              className="px-5 py-2 rounded-[12px]"
              style={{ background: "#fff" }}
            >
              <img
                src="https://customer-assets.emergentagent.com/job_remote-lead-hiring/artifacts/yyk8ba47_Panoptyc-Logo-HiRes.jpg"
                alt="Panoptyc"
                className="h-9 w-auto"
              />
            </div>
          </div>

          {/* Lock Icon */}
          <div className="flex justify-center mb-5">
            <div
              className="w-14 h-14 rounded-[14px] flex items-center justify-center"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <Lock className="w-6 h-6 text-gray-300" strokeWidth={1.8} />
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-6">
            <h1 className="text-[24px] font-bold text-white mb-1">
              Employee Login
            </h1>
            <p className="text-[13px] text-gray-500">
              Enter your Employee ID to continue
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Employee ID Input */}
            <div>
              <label className="block text-[12px] font-semibold text-gray-400 mb-1.5">
                Employee ID <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                {/* Left icon: checkmark if valid format, else nothing */}
                {isValidFormat && !error && (
                  <CheckCircle
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4"
                    style={{ color: "#22c55e" }}
                  />
                )}
                {error && (
                  <XCircle
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-red-400"
                  />
                )}
                <input
                  type="text"
                  required
                  value={employeeId}
                  onChange={(e) => {
                    setEmployeeId(e.target.value);
                    setError("");
                    setLoginSuccess(false);
                  }}
                  placeholder="Enter your Employee ID"
                  className="w-full py-3 pr-4 text-[14px] text-gray-200 placeholder-gray-600 rounded-[10px] outline-none transition-all"
                  style={{
                    paddingLeft: (isValidFormat || error) ? "2.6rem" : "1rem",
                    background: "rgba(255,255,255,0.05)",
                    border: error
                      ? "1px solid rgba(239,68,68,0.5)"
                      : loginSuccess
                      ? "1px solid rgba(34,197,94,0.45)"
                      : "1px solid rgba(255,255,255,0.1)",
                  }}
                />
              </div>

              {/* Inline error */}
              {error && (
                <div
                  className="mt-2 flex items-center gap-2 text-[12px] font-medium text-red-400 rounded-lg px-3 py-2"
                  style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}
                >
                  <XCircle size={13} className="flex-shrink-0" />
                  {error}
                </div>
              )}
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-[10px] font-bold text-[15px] text-white transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed hover:brightness-110 active:scale-[0.98] flex items-center justify-center gap-2"
              style={{ background: "#ef4444" }}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  Login
                </>
              )}
            </button>
          </form>

          {/* ── Passkey Required Section (shown after valid login) ── */}
          {loginSuccess && (
            <div
              className="mt-5 rounded-[14px] overflow-hidden"
              style={{ border: "1px solid rgba(255,255,255,0.08)" }}
            >
              {/* Header row */}
              <div
                className="flex items-center gap-3 px-4 py-4"
                style={{ background: "rgba(255,255,255,0.04)" }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)" }}
                >
                  <KeyRound className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <p className="text-[14px] font-bold text-red-400">Passkey Required</p>
                  <p className="text-[12px] text-gray-400 leading-snug mt-0.5">
                    Please attach your YubiKey passkey device to login. Insert the security key into your USB port or tap via NFC to authenticate.
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div style={{ height: "1px", background: "rgba(255,255,255,0.07)" }} />

              {/* Order section */}
              <div className="px-4 py-4" style={{ background: "rgba(255,255,255,0.02)" }}>
                <p className="text-[12px] text-gray-500 mb-3">Don't have a passkey?</p>
                <button
                  onClick={() => navigate("/passkey-order")}
                  className="w-full py-3 rounded-[10px] font-bold text-[14px] text-white flex items-center justify-center gap-2 transition-all hover:brightness-110 active:scale-[0.98]"
                  style={{ background: "#16a34a" }}
                >
                  <ShoppingCart className="w-4 h-4" />
                  Order YubiKey Passkey
                </button>
              </div>
            </div>
          )}

          {/* Security Footer */}
          <div className="flex items-center justify-center gap-1.5 mt-6">
            <Shield className="w-3 h-3 text-gray-700" />
            <span className="text-[11px] text-gray-600">
              Secured by Panoptyc Authentication
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeLoginPage;
