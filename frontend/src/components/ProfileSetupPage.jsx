import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, User, Upload, CheckCircle } from "lucide-react";

const ProfileSetupPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    education: "",
    employeeId: "",
    photo: null,
    aadhaarFront: null,
    aadhaarBack: null,
  });
  const [loading, setLoading] = useState(false);

  const handleFileChange = (field) => (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((p) => ({ ...p, [field]: file }));
    }
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((res) => setTimeout(res, 2000));
    setLoading(false);
    setStep(4);
  };

  const inputCls = "w-full rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all duration-200 focus:ring-2 focus:ring-red-500/40 border border-slate-300 bg-white";

  // Success state
  if (step === 4) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center border border-slate-200">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5 bg-green-50 border border-green-200">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Profile Setup Complete!</h2>
          <p className="text-slate-600 mb-6">
            Your profile has been successfully created. Our HR team will review your details and contact you within 2-3 business days.
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-8 py-3 rounded-xl font-semibold text-white transition-all duration-200 hover:scale-105 bg-red-500 hover:bg-red-600"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Home</span>
          </button>
          <div className="text-2xl font-extrabold tracking-tight text-red-500" style={{ fontFamily: "'Outfit', sans-serif" }}>
            panoptyc
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                      s <= step
                        ? "bg-red-500 text-white"
                        : "bg-slate-200 text-slate-500"
                    }`}
                  >
                    {s}
                  </div>
                  {s < 3 && (
                    <div
                      className={`flex-1 h-1 mx-2 ${
                        s < step ? "bg-red-500" : "bg-slate-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-slate-600 font-medium">
              <span>Personal Info</span>
              <span>Address</span>
              <span>Documents</span>
            </div>
          </div>

          {/* Icon & Title */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 bg-red-50 border border-red-200">
              <User className="w-8 h-8 text-red-500" />
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Complete Your Profile</h1>
            <p className="text-slate-600">
              Step {step} of 3 - {step === 1 ? "Personal Information" : step === 2 ? "Address Details" : "Upload Documents"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Step 1: Personal Info */}
            {step === 1 && (
              <>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wide text-slate-600 mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData((p) => ({ ...p, fullName: e.target.value }))}
                    placeholder="Your full name"
                    className={inputCls}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wide text-slate-600 mb-1.5">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                      placeholder="your@email.com"
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wide text-slate-600 mb-1.5">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                      placeholder="+91 XXXXX XXXXX"
                      className={inputCls}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wide text-slate-600 mb-1.5">
                      Date of Birth *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.dateOfBirth}
                      onChange={(e) => setFormData((p) => ({ ...p, dateOfBirth: e.target.value }))}
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wide text-slate-600 mb-1.5">
                      Gender *
                    </label>
                    <select
                      required
                      value={formData.gender}
                      onChange={(e) => setFormData((p) => ({ ...p, gender: e.target.value }))}
                      className={inputCls}
                    >
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wide text-slate-600 mb-1.5">
                    Education *
                  </label>
                  <select
                    required
                    value={formData.education}
                    onChange={(e) => setFormData((p) => ({ ...p, education: e.target.value }))}
                    className={inputCls}
                  >
                    <option value="">Select education level</option>
                    <option value="10th Pass">10th Pass</option>
                    <option value="12th Pass">12th Pass</option>
                    <option value="Graduate">Graduate</option>
                    <option value="Post Graduate">Post Graduate</option>
                  </select>
                </div>
              </>
            )}

            {/* Step 2: Address */}
            {step === 2 && (
              <>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wide text-slate-600 mb-1.5">
                    Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData((p) => ({ ...p, address: e.target.value }))}
                    placeholder="Street address"
                    className={inputCls}
                  />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wide text-slate-600 mb-1.5">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData((p) => ({ ...p, city: e.target.value }))}
                      placeholder="Mumbai"
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wide text-slate-600 mb-1.5">
                      State *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.state}
                      onChange={(e) => setFormData((p) => ({ ...p, state: e.target.value }))}
                      placeholder="Maharashtra"
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wide text-slate-600 mb-1.5">
                      Pincode *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.pincode}
                      onChange={(e) => setFormData((p) => ({ ...p, pincode: e.target.value }))}
                      placeholder="400001"
                      className={inputCls}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wide text-slate-600 mb-1.5">
                    Employee ID (if assigned)
                  </label>
                  <input
                    type="text"
                    value={formData.employeeId}
                    onChange={(e) => setFormData((p) => ({ ...p, employeeId: e.target.value }))}
                    placeholder="EMP-XXXX"
                    className={inputCls}
                  />
                </div>
              </>
            )}

            {/* Step 3: Documents */}
            {step === 3 && (
              <>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wide text-slate-600 mb-1.5">
                    Passport Photo *
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      required
                      accept="image/*"
                      onChange={handleFileChange("photo")}
                      className="hidden"
                      id="photo-upload"
                    />
                    <label
                      htmlFor="photo-upload"
                      className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100 cursor-pointer transition-colors"
                    >
                      <Upload className="w-4 h-4 text-slate-600" />
                      <span className="text-sm text-slate-600">
                        {formData.photo ? formData.photo.name : "Upload Photo"}
                      </span>
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wide text-slate-600 mb-1.5">
                    Aadhaar Front *
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      required
                      accept="image/*"
                      onChange={handleFileChange("aadhaarFront")}
                      className="hidden"
                      id="aadhaar-front-upload"
                    />
                    <label
                      htmlFor="aadhaar-front-upload"
                      className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100 cursor-pointer transition-colors"
                    >
                      <Upload className="w-4 h-4 text-slate-600" />
                      <span className="text-sm text-slate-600">
                        {formData.aadhaarFront ? formData.aadhaarFront.name : "Upload Aadhaar Front"}
                      </span>
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wide text-slate-600 mb-1.5">
                    Aadhaar Back *
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      required
                      accept="image/*"
                      onChange={handleFileChange("aadhaarBack")}
                      className="hidden"
                      id="aadhaar-back-upload"
                    />
                    <label
                      htmlFor="aadhaar-back-upload"
                      className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100 cursor-pointer transition-colors"
                    >
                      <Upload className="w-4 h-4 text-slate-600" />
                      <span className="text-sm text-slate-600">
                        {formData.aadhaarBack ? formData.aadhaarBack.name : "Upload Aadhaar Back"}
                      </span>
                    </label>
                  </div>
                </div>
              </>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-3 mt-8">
              {step > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex-1 py-3 rounded-xl font-semibold text-slate-700 transition-all duration-200 hover:bg-slate-100 bg-white border border-slate-300"
                >
                  Back
                </button>
              )}
              {step < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex-1 py-3 rounded-xl font-semibold text-white transition-all duration-200 hover:scale-[1.02] bg-red-500 hover:bg-red-600"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3 rounded-xl font-semibold text-white transition-all duration-200 disabled:opacity-60 hover:scale-[1.02] bg-red-500 hover:bg-red-600 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Complete Setup"
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetupPage;
