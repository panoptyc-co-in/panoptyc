import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Lock, Eye, EyeOff, LogIn, AlertCircle } from "lucide-react";

const AdminLoginPage = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);
  const navigate = useNavigate();

  // If already authenticated, redirect to dashboard
  useEffect(() => {
    const token = sessionStorage.getItem("admin_token");
    if (token === btoa("panoptyc_admin_authenticated")) {
      navigate("/admin/dashboard");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Small delay for UX
    await new Promise((r) => setTimeout(r, 600));

    const ADMIN_PASSWORD = process.env.REACT_APP_ADMIN_PASSWORD || "";
    console.log("REACT ENV RAW PASSWORD LOADED:", ADMIN_PASSWORD);
    console.log("USER ENTERED:", password);

    if (password === ADMIN_PASSWORD) {
      // Store auth token in sessionStorage (expires on tab close)
      sessionStorage.setItem("admin_token", btoa("panoptyc_admin_authenticated"));
      navigate("/admin/dashboard");
    } else {
      setError("Invalid password. Access denied.");
      setShake(true);
      setPassword("");
      setTimeout(() => setShake(false), 600);
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0a0f1e 0%, #0f172a 50%, #0a0f1e 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Inter', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated background glow */}
      <div
        style={{
          position: "absolute",
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(239,68,68,0.08) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "300px",
          height: "300px",
          background: "radial-gradient(circle, rgba(239,68,68,0.05) 0%, transparent 70%)",
          top: "10%",
          right: "10%",
          pointerEvents: "none",
        }}
      />

      {/* Grid pattern overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          pointerEvents: "none",
        }}
      />

      {/* Login Card */}
      <div
        className={shake ? "shake-animation" : ""}
        style={{
          width: "100%",
          maxWidth: "440px",
          margin: "0 20px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Glass card */}
        <div
          style={{
            background: "rgba(255,255,255,0.04)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "24px",
            padding: "48px 40px",
            boxShadow: "0 25px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
          }}
        >
          {/* Shield icon */}
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <div
              style={{
                width: "72px",
                height: "72px",
                background: "linear-gradient(135deg, rgba(239,68,68,0.2), rgba(239,68,68,0.08))",
                border: "1px solid rgba(239,68,68,0.3)",
                borderRadius: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
                boxShadow: "0 0 30px rgba(239,68,68,0.15)",
              }}
            >
              <Shield size={32} color="#EF4444" />
            </div>

            <img
              src="https://customer-assets.emergentagent.com/job_remote-lead-hiring/artifacts/yyk8ba47_Panoptyc-Logo-HiRes.jpg"
              alt="Panoptyc"
              style={{ height: "32px", width: "auto", objectFit: "contain", marginBottom: "16px" }}
            />

            <h1
              style={{
                color: "#fff",
                fontSize: "22px",
                fontWeight: "700",
                margin: "0 0 6px",
                letterSpacing: "-0.3px",
              }}
            >
              Admin Portal
            </h1>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px", margin: 0 }}>
              Restricted access — authorized personnel only
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin}>
            {/* Password Field */}
            <div style={{ marginBottom: "16px" }}>
              <label
                style={{
                  display: "block",
                  color: "rgba(255,255,255,0.6)",
                  fontSize: "13px",
                  fontWeight: "500",
                  marginBottom: "8px",
                  letterSpacing: "0.3px",
                }}
              >
                ADMIN PASSWORD
              </label>
              <div style={{ position: "relative" }}>
                <Lock
                  size={16}
                  color="rgba(255,255,255,0.3)"
                  style={{
                    position: "absolute",
                    left: "16px",
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  required
                  autoFocus
                  style={{
                    width: "100%",
                    padding: "14px 48px 14px 44px",
                    background: "rgba(255,255,255,0.05)",
                    border: error
                      ? "1px solid rgba(239,68,68,0.6)"
                      : "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "12px",
                    color: "#fff",
                    fontSize: "15px",
                    outline: "none",
                    boxSizing: "border-box",
                    transition: "border-color 0.2s",
                    fontFamily: "'Inter', sans-serif",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "4px",
                    color: "rgba(255,255,255,0.3)",
                  }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "rgba(239,68,68,0.08)",
                  border: "1px solid rgba(239,68,68,0.2)",
                  borderRadius: "10px",
                  padding: "10px 14px",
                  marginBottom: "16px",
                  color: "#EF4444",
                  fontSize: "13px",
                }}
              >
                <AlertCircle size={14} />
                {error}
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading || !password}
              style={{
                width: "100%",
                padding: "14px",
                background:
                  loading || !password
                    ? "rgba(239,68,68,0.3)"
                    : "linear-gradient(135deg, #EF4444, #DC2626)",
                border: "none",
                borderRadius: "12px",
                color: "#fff",
                fontSize: "15px",
                fontWeight: "600",
                cursor: loading || !password ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                transition: "all 0.2s",
                fontFamily: "'Inter', sans-serif",
                boxShadow: loading || !password ? "none" : "0 4px 20px rgba(239,68,68,0.3)",
              }}
            >
              {loading ? (
                <>
                  <div
                    style={{
                      width: "16px",
                      height: "16px",
                      border: "2px solid rgba(255,255,255,0.3)",
                      borderTopColor: "#fff",
                      borderRadius: "50%",
                      animation: "spin 0.8s linear infinite",
                    }}
                  />
                  Authenticating...
                </>
              ) : (
                <>
                  <LogIn size={16} />
                  Access Dashboard
                </>
              )}
            </button>
          </form>

          {/* Footer note */}
          <p
            style={{
              textAlign: "center",
              color: "rgba(255,255,255,0.2)",
              fontSize: "12px",
              marginTop: "24px",
              marginBottom: 0,
            }}
          >
            🔒 Session expires when tab is closed
          </p>
        </div>
      </div>

      {/* Inline styles for animations */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-10px); }
          40% { transform: translateX(10px); }
          60% { transform: translateX(-6px); }
          80% { transform: translateX(6px); }
        }
        .shake-animation { animation: shake 0.5s ease-in-out; }
        input::placeholder { color: rgba(255,255,255,0.2); }
        input:focus { border-color: rgba(239,68,68,0.5) !important; box-shadow: 0 0 0 3px rgba(239,68,68,0.1); }
      `}</style>
    </div>
  );
};

export default AdminLoginPage;
