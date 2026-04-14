import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Lock, LogIn, Shield } from "lucide-react";

const ProfileSetupPage = () => {
  const navigate = useNavigate();
  const [employeeId, setEmployeeId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((res) => setTimeout(res, 2000));
    setLoading(false);
    alert("Login functionality coming soon!");
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: "#0a0e1a" }}>
      {/* Background pattern */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)`,
          backgroundSize: "40px 40px"
        }}
      />

      {/* Back to Home link */}
      <div className="relative z-10 pt-8 px-4">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-gray-400 hover:text-gray-300 transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-12">
        <div 
          className="w-full max-w-md rounded-3xl p-12 shadow-2xl border"
          style={{ 
            background: "linear-gradient(135deg, #1a2332 0%, #0f1621 100%)",
            borderColor: "rgba(255,255,255,0.08)"
          }}
        >
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-2xl px-6 py-2">
              <img 
                src="https://customer-assets.emergentagent.com/job_remote-lead-hiring/artifacts/yyk8ba47_Panoptyc-Logo-HiRes.jpg" 
                alt="Panoptyc" 
                className="h-12 w-auto"
              />
            </div>
          </div>

          {/* Lock Icon */}
          <div className="flex justify-center mb-8">
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ 
                background: "rgba(30,41,59,0.8)",
                border: "1px solid rgba(255,255,255,0.1)"
              }}
            >
              <Lock className="w-8 h-8 text-gray-400" />
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-3">
            <h1 className="text-3xl font-extrabold text-white mb-3">Employee Login</h1>
            <p className="text-sm text-gray-400">
              Enter your Employee ID to continue
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {/* Employee ID */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-3">
                Employee ID *
              </label>
              <div className="relative">
                <Shield className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  required
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  placeholder="Enter your Employee ID"
                  className="w-full pl-12 pr-4 py-4 text-base text-gray-300 placeholder-gray-600 rounded-2xl outline-none transition-all duration-200 focus:ring-2 focus:ring-red-500/40"
                  style={{
                    background: "rgba(15,23,42,0.6)",
                    border: "1px solid rgba(255,255,255,0.08)"
                  }}
                />
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-full font-bold text-base text-white transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed hover:shadow-xl active:scale-[0.98] flex items-center justify-center gap-3"
              style={{ 
                background: "linear-gradient(135deg, #b91c1c 0%, #7f1d1d 100%)"
              }}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  Logging In...
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Login
                </>
              )}
            </button>
          </form>

          {/* Security Footer */}
          <div className="mt-8 pt-6 border-t border-gray-800">
            <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
              <Shield className="w-4 h-4" />
              <span>Secured by Panoptyc Authentication</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetupPage;
