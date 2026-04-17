import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
} from "./ui/dialog";
import { User, MapPin, Send, X, Mail } from "lucide-react";
import { apiUrl, readJsonSafely } from "../lib/api";

const ApplyModal = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    city: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch(apiUrl("/api/submit-application"), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await readJsonSafely(response);
      
      if (response.ok && result.success) {
        alert(`✅ ${result.message}\n\nThank you, ${formData.fullName}! Your application has been submitted successfully.`);
        handleClose();
      } else {
        throw new Error(result.detail || 'Failed to submit application');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert(`❌ Error: ${error.message}\n\nPlease try again or contact support.`);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({ fullName: "", phone: "", email: "", city: "" });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="w-[95vw] max-w-xl bg-white p-0 gap-0 border-none rounded-3xl shadow-2xl overflow-y-auto max-h-[85vh] sm:max-h-[90vh]">
        {/* Logo */}
        <div className="flex justify-center pt-6 sm:pt-8 pb-4 sm:pb-6">
          <div className="bg-gray-100 rounded-2xl px-6 sm:px-8 py-3">
            <img 
              src="https://customer-assets.emergentagent.com/job_remote-lead-hiring/artifacts/yyk8ba47_Panoptyc-Logo-HiRes.jpg" 
              alt="Panoptyc" 
              className="h-8 sm:h-10 w-auto"
            />
          </div>
        </div>

        {/* Title */}
        <div className="text-center px-4 sm:px-8 pb-4 sm:pb-8">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900">Quick Apply</h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-4 sm:px-8 pb-4 sm:pb-8 space-y-3 sm:space-y-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm sm:text-base font-bold text-gray-900 mb-1 sm:mb-3">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData((p) => ({ ...p, fullName: e.target.value }))}
                placeholder="Enter your full name"
                className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-4 text-sm sm:text-base text-gray-900 placeholder-gray-400 border-2 border-gray-300 rounded-full outline-none transition-all duration-200 focus:border-red-400 focus:ring-4 focus:ring-red-100"
              />
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm sm:text-base font-bold text-gray-900 mb-1 sm:mb-3">
              Phone Number
            </label>
            <div className="flex gap-2">
              <div className="bg-gray-100 rounded-full px-4 sm:px-5 py-2.5 sm:py-4 text-sm sm:text-base font-medium text-gray-600 flex items-center">
                +91
              </div>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                placeholder="Enter 10 digit number"
                className="flex-1 px-4 sm:px-6 py-2.5 sm:py-4 text-sm sm:text-base text-gray-900 placeholder-gray-400 border-2 border-gray-300 rounded-full outline-none transition-all duration-200 focus:border-red-400 focus:ring-4 focus:ring-red-100"
              />
            </div>
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-sm sm:text-base font-bold text-gray-900 mb-1 sm:mb-3">
              Email Address <span className="text-xs sm:text-sm font-normal text-gray-500">(Optional)</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                placeholder="Enter your email"
                className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-4 text-sm sm:text-base text-gray-900 placeholder-gray-400 border-2 border-gray-300 rounded-full outline-none transition-all duration-200 focus:border-red-400 focus:ring-4 focus:ring-red-100"
              />
            </div>
          </div>

          {/* City */}
          <div>
            <label className="block text-sm sm:text-base font-bold text-gray-900 mb-1 sm:mb-3">
              City
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              <input
                type="text"
                required
                value={formData.city}
                onChange={(e) => setFormData((p) => ({ ...p, city: e.target.value }))}
                placeholder="Enter your city"
                className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-4 text-sm sm:text-base text-gray-900 placeholder-gray-400 border-2 border-gray-300 rounded-full outline-none transition-all duration-200 focus:border-red-400 focus:ring-4 focus:ring-red-100"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg text-white transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed hover:shadow-xl active:scale-[0.98] flex items-center justify-center gap-2 sm:gap-3 mt-2"
            style={{ backgroundColor: "#EF4444" }}
          >
            {loading ? (
              <>
                <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Submit Application
              </>
            )}
          </button>

          {/* Disclaimer */}
          <p className="text-center text-sm text-gray-500 pt-2">
            By submitting, you agree to be contacted regarding this job opportunity.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ApplyModal;