import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { CheckCircle, Navigation2 } from "lucide-react";

const inputCls = "w-full rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-gray-500 outline-none transition-all duration-200 focus:ring-2 focus:ring-red-500/40" ;
const inputStyle = { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" };

const ApplyModal = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    education: "",
    internetSpeed: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((res) => setTimeout(res, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    setFormData({ fullName: "", email: "", phone: "", city: "", state: "", education: "", internetSpeed: "" });
    onClose();
  };

  const set = (key) => (val) => setFormData((p) => ({ ...p, [key]: val }));

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className="max-w-lg max-h-[92vh] overflow-y-auto text-white"
        style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.1)" }}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white">
            Apply to{" "}
            <span style={{ color: "#EF4444" }}>Panoptyc</span>
          </DialogTitle>
          <DialogDescription className="text-gray-400 text-sm">
            Remote Video Surveillance Analyst — ₹35,000/month · 100% Work From Home
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="py-10 text-center">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5"
              style={{ background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.3)" }}
            >
              <CheckCircle className="w-10 h-10" style={{ color: "#4ADE80" }} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Application Submitted!</h3>
            <p className="text-gray-400 mb-6 max-w-xs mx-auto">
              Thank you, {formData.fullName || "there"}! We'll review your application and reach out within 2–3 business days.
            </p>
            <button
              onClick={handleClose}
              className="px-8 py-3 rounded-xl font-semibold text-white transition-all duration-200 hover:scale-105"
              style={{ backgroundColor: "#EF4444" }}
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            {/* Full name + Phone */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1.5">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData((p) => ({ ...p, fullName: e.target.value }))}
                  placeholder="Your full name"
                  className={inputCls}
                  style={inputStyle}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1.5">Phone *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                  placeholder="+91 XXXXX XXXXX"
                  className={inputCls}
                  style={inputStyle}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1.5">Email Address *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                placeholder="your@email.com"
                className={inputCls}
                style={inputStyle}
              />
            </div>

            {/* City + State */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1.5">City *</label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData((p) => ({ ...p, city: e.target.value }))}
                  placeholder="Mumbai"
                  className={inputCls}
                  style={inputStyle}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1.5">State *</label>
                <input
                  type="text"
                  required
                  value={formData.state}
                  onChange={(e) => setFormData((p) => ({ ...p, state: e.target.value }))}
                  placeholder="Maharashtra"
                  className={inputCls}
                  style={inputStyle}
                />
              </div>
            </div>

            {/* Education */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1.5">Highest Education *</label>
              <Select required value={formData.education} onValueChange={set("education")}>
                <SelectTrigger
                  className="rounded-xl text-sm text-white"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: formData.education ? "white" : "#6B7280" }}
                >
                  <SelectValue placeholder="Select education level" />
                </SelectTrigger>
                <SelectContent style={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.1)" }}>
                  {["10th Pass", "12th Pass", "Graduate", "Post Graduate"].map((opt) => (
                    <SelectItem key={opt} value={opt} className="text-white hover:bg-white/10">
                      {opt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Internet speed */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1.5">Internet Speed *</label>
              <Select required value={formData.internetSpeed} onValueChange={set("internetSpeed")}>
                <SelectTrigger
                  className="rounded-xl text-sm text-white"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: formData.internetSpeed ? "white" : "#6B7280" }}
                >
                  <SelectValue placeholder="Select internet speed" />
                </SelectTrigger>
                <SelectContent style={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.1)" }}>
                  {["10–25 Mbps", "25–50 Mbps", "50–100 Mbps", "100+ Mbps"].map((opt) => (
                    <SelectItem key={opt} value={opt} className="text-white hover:bg-white/10">
                      {opt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Night shift acknowledgment */}
            <div className="rounded-xl p-3.5" style={{ background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.2)" }}>
              <p className="text-xs" style={{ color: "#FCA5A5" }}>
                <span className="font-semibold">Note:</span> This role requires working US night hours (approx. 6:30 PM – 6:30 AM IST). Please ensure you are comfortable with this schedule.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-semibold text-white transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
              style={{ backgroundColor: "#EF4444" }}
              onMouseEnter={(e) => !loading && (e.currentTarget.style.backgroundColor = "#DC2626")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#EF4444")}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Navigation2 className="w-4 h-4" />
                  Submit Application
                </>
              )}
            </button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ApplyModal;
