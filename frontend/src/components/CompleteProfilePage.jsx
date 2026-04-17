import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, User, Mail, ChevronDown, ArrowRight } from "lucide-react";

const CompleteProfilePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    address: "",
    education: "",
    photo: null
  });
  const [photoPreview, setPhotoPreview] = useState(null);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (location.state) {
      if (location.state.email) setFormData(prev => ({ ...prev, email: location.state.email }));
      if (location.state.password) setPassword(location.state.password);
    }
  }, [location]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert("Image must be smaller than 5MB");
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setFormData({ ...formData, photo: base64String });
        setPhotoPreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.photo) {
      alert("Please upload your passport size photo.");
      return;
    }
    if (!formData.mobile || formData.mobile.replace(/\D/g, "").length !== 10) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }
    if (!formData.firstName || !formData.lastName || !formData.address || !formData.education) {
      alert("Please fill all required fields before continuing.");
      return;
    }
    // Pass the formData and password securely to the agreement page for final submission
    navigate("/agreement", { state: { formData, password } });
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col items-center py-8 px-4" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Top Bar */}
      <div className="w-full max-w-[460px] flex items-center mb-6">
        <button 
          onClick={() => navigate("/")}
          className="flex items-center text-[14px] text-gray-500 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </button>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-[460px] bg-white rounded-[24px] shadow-[0_4px_40px_rgb(0,0,0,0.06)] px-8 py-10 relative overflow-hidden">
        
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="bg-[#f8f9fa] rounded-xl px-4 py-2 border border-gray-100">
            <img
              src="https://customer-assets.emergentagent.com/job_remote-lead-hiring/artifacts/yyk8ba47_Panoptyc-Logo-HiRes.jpg"
              alt="Panoptyc"
              className="h-8 w-auto mix-blend-multiply"
            />
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mb-4">
          <h1 className="text-[28px] font-extrabold text-[#0a1128] tracking-tight mb-1">
            Complete Your Profile
          </h1>
          <p className="text-[13px] font-medium text-gray-500">
            Step 1 of 2 - Personal Information
          </p>
        </div>

        {/* Progress Bar */}
        <div className="flex gap-2 mb-8">
          <div className="h-1.5 w-1/2 rounded-full bg-[#ef4444]"></div>
          <div className="h-1.5 w-1/2 rounded-full bg-[#e5e7eb]"></div>
        </div>

        {/* Form Body */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Passport Photo */}
          <div className="flex flex-col items-center">
            <label className="text-[13px] font-bold text-gray-900 mb-2">
              Passport Size Photo <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className={`w-[120px] h-[80px] rounded-xl flex flex-col items-center justify-center overflow-hidden transition-all ${
                photoPreview
                  ? "border-none"
                  : "border-[2px] border-dashed border-red-300 hover:bg-red-50"
              }`}>
                {photoPreview ? (
                  <img src={photoPreview} alt="Passport preview" className="w-full h-full object-cover" />
                ) : (
                  <>
                    <User className="w-8 h-8 text-red-300 mb-0.5" strokeWidth={1.5} />
                    <span className="text-[11px] font-medium text-red-400">Required *</span>
                  </>
                )}
              </div>
            </div>
            {!photoPreview && <p className="text-[11px] text-red-400 mt-1">Photo is required</p>}
          </div>

          {/* Name Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[13px] font-bold text-gray-900 mb-1.5">First Name *</label>
              <input 
                type="text" 
                name="firstName"
                required
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name" 
                className="w-full px-4 py-3 text-[14px] text-gray-800 placeholder-gray-400 border border-gray-200 rounded-xl outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100"
              />
            </div>
            <div>
              <label className="block text-[13px] font-bold text-gray-900 mb-1.5">Last Name *</label>
              <input 
                type="text" 
                name="lastName"
                required
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name" 
                className="w-full px-4 py-3 text-[14px] text-gray-800 placeholder-gray-400 border border-gray-200 rounded-xl outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100"
              />
            </div>
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-[13px] font-bold text-gray-900 mb-1.5">Email Address *</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="email" 
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                autoComplete="off"
                placeholder="Enter your email"
                className="w-full pl-11 pr-4 py-3 text-[14px] text-gray-800 placeholder-gray-400 border border-gray-200 rounded-xl outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100"
              />
            </div>
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block text-[13px] font-bold text-gray-900 mb-1.5">Mobile Number *</label>
            <div className="flex border border-gray-200 rounded-xl overflow-hidden focus-within:border-red-400 focus-within:ring-2 focus-within:ring-red-100 transition-colors">
              <div className="bg-[#f8f9fa] px-4 py-3 text-[14px] font-medium text-gray-600 border-r border-gray-200 flex items-center">
                +91
              </div>
              <input
                type="tel"
                name="mobile"
                required
                maxLength={10}
                pattern="[0-9]{10}"
                inputMode="numeric"
                value={formData.mobile}
                onChange={(e) => {
                  const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
                  setFormData({ ...formData, mobile: digits });
                }}
                placeholder="10 digit number"
                className="flex-1 px-4 py-3 text-[14px] text-gray-800 placeholder-gray-400 border-none outline-none"
              />
            </div>
            {formData.mobile && formData.mobile.length !== 10 && (
              <p className="text-[11px] text-red-400 mt-1">Please enter exactly 10 digits</p>
            )}
          </div>

          {/* Full Address */}
          <div>
            <label className="block text-[13px] font-bold text-gray-900 mb-1.5">Full Address *</label>
            <textarea 
              name="address"
              required
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your complete address" 
              rows={3}
              className="w-full px-4 py-3 text-[14px] text-gray-800 placeholder-gray-400 border border-gray-200 rounded-xl outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 resize-none"
            />
          </div>

          {/* Education */}
          <div>
            <label className="block text-[13px] font-bold text-gray-900 mb-1.5">Education *</label>
            <div className="relative">
              <select 
                name="education"
                required
                value={formData.education}
                onChange={handleChange}
                className="w-full px-4 py-3 text-[14px] text-[#64748b] bg-white border border-gray-200 rounded-xl appearance-none outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100"
              >
                <option value="">Select your education</option>
                <option value="10th">10th Pass</option>
                <option value="12th">12th Pass</option>
                <option value="pursuing">Pursuing Graduation</option>
                <option value="graduated">Graduated</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            </div>
          </div>
          
          <div className="pt-2">
            <button 
              type="submit" 
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full font-bold text-[15px] text-white bg-[#fca5a5] hover:bg-[#ef4444] transition-colors relative disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? "Submitting..." : "Continue to Agreement"}
              {!loading && <ArrowRight className="w-4 h-4 ml-1" />}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CompleteProfilePage;

