import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Lock, Eye, EyeOff } from "lucide-react";

const EmployeeLoginModal = ({ open, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((res) => setTimeout(res, 1500));
    setLoading(false);
    // Mock login - in real app would authenticate
    alert("Login functionality coming soon!");
  };

  const handleClose = () => {
    setEmail("");
    setPassword("");
    setShowPassword(false);
    onClose();
  };

  const inputCls = "w-full rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-gray-500 outline-none transition-all duration-200 focus:ring-2 focus:ring-red-500/40";
  const inputStyle = { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className="max-w-md"
        style={{ background: "#1a1f2e", border: "1px solid rgba(255,255,255,0.1)" }}
      >
        <DialogHeader>
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>
            <Lock className="w-7 h-7" style={{ color: "#EF4444" }} />
          </div>
          <DialogTitle className="text-2xl font-bold text-white text-center">
            Employee Login
          </DialogTitle>
          <DialogDescription className="text-gray-400 text-sm text-center">
            Sign in to access your employee dashboard
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* Email */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1.5">
              Employee Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@panoptyc.com"
              className={inputCls}
              style={inputStyle}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className={inputCls}
                style={inputStyle}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Forgot password link */}
          <div className="text-right">
            <button
              type="button"
              className="text-xs font-medium"
              style={{ color: "#EF4444" }}
            >
              Forgot password?
            </button>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold text-white transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
            style={{ backgroundColor: "#EF4444" }}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                Signing In...
              </div>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            Don't have an account?{" "}
            <button className="font-medium" style={{ color: "#EF4444" }}>
              Apply Now
            </button>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmployeeLoginModal;