import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
} from "./ui/dialog";
import { User, MapPin, Send, X } from "lucide-react";

const ApplyModal = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    city: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((res) => setTimeout(res, 1500));
    setLoading(false);
    alert("Application submitted successfully!");
    handleClose();
  };

  const handleClose = () => {
    setFormData({ fullName: "", phone: "", city: "" });
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
          <h2 className="text-4xl font-extrabold text-gray-900">Quick Apply</h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-6">
          {/* Full Name */}
          <div>
            <label className="block text-base font-bold text-gray-900 mb-3">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData((p) => ({ ...p, fullName: e.target.value }))}
                placeholder="Enter your full name"
                className="w-full pl-12 pr-4 py-4 text-base text-gray-900 placeholder-gray-400 border-2 border-gray-300 rounded-full outline-none transition-all duration-200 focus:border-red-400 focus:ring-4 focus:ring-red-100"
              />
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-base font-bold text-gray-900 mb-3">
              Phone Number
            </label>
            <div className="flex gap-2">
              <div className="bg-gray-100 rounded-full px-5 py-4 text-base font-medium text-gray-600 flex items-center">
                +91
              </div>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                placeholder="Enter 10 digit number"
                className="flex-1 px-6 py-4 text-base text-gray-900 placeholder-gray-400 border-2 border-gray-300 rounded-full outline-none transition-all duration-200 focus:border-red-400 focus:ring-4 focus:ring-red-100"
              />
            </div>
          </div>

          {/* City */}
          <div>
            <label className="block text-base font-bold text-gray-900 mb-3">
              City
            </label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                required
                value={formData.city}
                onChange={(e) => setFormData((p) => ({ ...p, city: e.target.value }))}
                placeholder="Enter your city"
                className="w-full pl-12 pr-4 py-4 text-base text-gray-900 placeholder-gray-400 border-2 border-gray-300 rounded-full outline-none transition-all duration-200 focus:border-red-400 focus:ring-4 focus:ring-red-100"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-full font-bold text-lg text-white transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed hover:shadow-xl active:scale-[0.98] flex items-center justify-center gap-3 mt-2"
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