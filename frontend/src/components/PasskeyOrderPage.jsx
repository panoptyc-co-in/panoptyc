import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Shield, Truck, Banknote, Star, Check, Zap, Globe, Fingerprint, Smartphone, ShieldCheck, CheckCircle2, KeyRound, Lock, Package } from "lucide-react";

const PasskeyOrderPage = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    quantity: 1,
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const productImages = [
    "https://customer-assets.emergentagent.com/job_e9775db5-71a4-4634-9fae-4002de641895/artifacts/v674wuli_71UvDGzmzqL._SX679_.jpg",
    "https://customer-assets.emergentagent.com/job_e9775db5-71a4-4634-9fae-4002de641895/artifacts/6dixce0d_41JVBbHufAL._SX679_.jpg",
    "https://customer-assets.emergentagent.com/job_e9775db5-71a4-4634-9fae-4002de641895/artifacts/ktojs1o6_71B7zm0GKdL._SL1500_.jpg",
    "https://customer-assets.emergentagent.com/job_e9775db5-71a4-4634-9fae-4002de641895/artifacts/ph7koamf_713ii%2BJF5wL._SX679_.jpg",
    "https://customer-assets.emergentagent.com/job_e9775db5-71a4-4634-9fae-4002de641895/artifacts/xo6la2v5_711ALvLp1CL._SX679_.jpg",
  ];

  const keyFeatures = [
    {
      Icon: Zap,
      title: "USB-C + NFC",
      description: "Plug in via USB-C or tap on NFC-enabled devices"
    },
    {
      Icon: Shield,
      title: "Multi-Protocol Security",
      description: "FIDO2, WebAuthn, U2F, Smart Card, OTP, OpenPGP"
    },
    {
      Icon: Globe,
      title: "Widely Compatible",
      description: "Works with Google, Microsoft, Apple, password managers & 100s more"
    },
    {
      Icon: Fingerprint,
      title: "Passwordless Login",
      description: "Hardware-bound passkey for the strongest authentication"
    },
    {
      Icon: Smartphone,
      title: "Works with Phones",
      description: "NFC tap authentication on Android and iPhone"
    },
    {
      Icon: ShieldCheck,
      title: "Made in Sweden & USA",
      description: "Tamper-resistant, waterproof, crushproof - no batteries needed"
    }
  ];

  const compatibility = [
    "WebAuthn",
    "FIDO (CTAP 1, 2, 2.1)",
    "Universal Second Factor (U2F)",
    "Smart Card / PIV",
    "Yubico OTP",
    "OATH - HOTP (Event)",
    "OATH - TOTP (Time)",
    "OpenPGP",
    "Secure Static Passwords"
  ];

  const appCategories = [
    {
      title: "EMAIL & PRODUCTIVITY",
      apps: "Microsoft, Apple, Google, Dropbox, Proton"
    },
    {
      title: "PASSWORD MANAGERS",
      apps: "1Password, Bitwarden, KeePass, LastPass"
    },
    {
      title: "PERSONAL FINANCE",
      apps: "Vanguard, Coinbase, KeyBank, Kraken"
    },
    {
      title: "SOCIAL",
      apps: "Instagram, Facebook, X, YouTube"
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const API_URL = process.env.REACT_APP_BACKEND_URL;
      const response = await fetch(`${API_URL}/api/submit-passkey-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitted(true);
      } else {
        throw new Error(result.detail || "Failed to place order");
      }
    } catch (error) {
      console.error("Order error:", error);
      alert(`❌ Error: ${error.message}\n\nPlease try again or contact support.`);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-200">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5 bg-green-50 border border-green-200">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Order Placed Successfully!</h2>
          <p className="text-gray-600 mb-6">
            Thank you, {formData.fullName}! Your YubiKey order will be delivered within 3-5 business days. You'll pay ₹2,000 cash on delivery.
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-8 py-3 rounded-lg font-semibold text-white bg-green-500 hover:bg-green-600"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f8f9fa" }}>
      {/* Header */}
      <div className="sticky top-0 z-10" style={{ backgroundColor: "#f8f9fa" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="text-sm">Back</span>
          </button>
          <div className="flex items-center gap-3">
            <img 
              src="https://customer-assets.emergentagent.com/job_remote-lead-hiring/artifacts/yyk8ba47_Panoptyc-Logo-HiRes.jpg" 
              alt="Panoptyc" 
              className="h-7 w-auto"
            />
            <span className="text-gray-400 text-sm">Security Store</span>
          </div>
          <div className="flex items-center gap-1.5 text-green-600 text-sm">
            <Shield className="w-3.5 h-3.5" />
            <span className="font-medium">Secure</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Product */}
          <div>
            {/* Product Image */}
            <div className="bg-white border border-gray-100 rounded-lg p-12 mb-6 flex items-center justify-center shadow-sm" style={{ minHeight: "500px" }}>
              <img
                src={productImages[selectedImage]}
                alt="YubiKey"
                className="w-full h-auto max-h-[500px] object-contain"
              />
            </div>

            {/* Thumbnail Images */}
            <div className="flex gap-3 mb-6">
              {productImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`border-2 rounded-[8px] p-2 bg-white flex items-center justify-center overflow-hidden transition-all duration-200 ${
                    selectedImage === idx ? "border-[#4ADE80]" : "border-gray-100 shadow-[0_2px_8px_rgb(0,0,0,0.03)]"
                  }`}
                  style={{ width: "65px", height: "65px" }}
                >
                  <img src={img} alt={`View ${idx + 1}`} className="max-w-full max-h-full object-contain" />
                </button>
              ))}
            </div>

            {/* Badges, Info and Features Wrapper */}
            <div className="bg-white border border-gray-100 shadow-[0_2px_12px_rgb(0,0,0,0.02)] rounded-[16px] p-6 lg:p-8 mb-8">
              {/* Badges */}
              <div className="flex gap-2.5 mb-5 text-[11px] font-bold uppercase tracking-wide">
                <span className="px-3 py-1 bg-[#F0FDF4] text-[#16A34A] rounded-full">
                  BEST SELLER
                </span>
                <span className="px-3 py-1 bg-[#EFF6FF] text-[#2563EB] rounded-full">
                  OFFICIAL
                </span>
              </div>

              {/* Product Title */}
              <h1 className="text-[28px] font-bold text-[#0F172A] mb-2 leading-tight">
                Yubico YubiKey 5C NFC
              </h1>
              <p className="text-[#94A3B8] text-[15px] font-medium mb-4">
                Hardware Security Key - USB-C + NFC | Multi-Protocol | FIDO2/WebAuthn
              </p>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex gap-0.5">
                  {[...Array(4)].map((_, i) => (
                    <Star key={i} className="w-[18px] h-[18px] fill-[#FACC15] text-[#FACC15]" />
                  ))}
                  <Star className="w-[18px] h-[18px] fill-[#FEF08A] text-[#FEF08A]" />
                </div>
                <span className="text-[14px] font-medium text-[#64748B]">4.5 (6,070 ratings)</span>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-[36px] font-extrabold text-[#0F172A] tracking-tight">₹2,000</span>
                  <span className="text-[18px] font-bold text-[#94A3B8] line-through mt-2">₹6,109</span>
                  <span className="px-2.5 py-1 bg-red-50 text-red-600 text-[11px] font-bold rounded-full mt-1.5 tracking-wide">
                    67% OFF
                  </span>
                </div>
                <div className="bg-[#F0FDF4] border border-[#DCFCE7] rounded-xl p-4 flex items-center gap-4">
                  <Truck className="w-[20px] h-[20px] text-[#16A34A] flex-shrink-0" strokeWidth={2} />
                  <div>
                    <p className="text-[14px] font-bold text-[#166534] mb-[2px]">Cash on Delivery - ₹2,000</p>
                    <p className="text-[13px] text-[#15803D]">Pay when you receive the product at your doorstep</p>
                  </div>
                </div>
              </div>

              {/* Key Features */}
              <div className="pt-2">
                <h3 className="text-[15px] font-bold text-[#0F172A] mb-5">Key Features</h3>
                <div className="space-y-4">
                  {keyFeatures.map((feature, idx) => {
                    const IconComponent = feature.Icon;
                    return (
                      <div key={idx} className="flex items-start gap-4">
                        <div className="w-[36px] h-[36px] rounded-lg bg-[#F8FAFC] border border-gray-100 flex items-center justify-center flex-shrink-0">
                          <IconComponent className="w-[18px] h-[18px] text-[#64748B]" strokeWidth={1.5} />
                        </div>
                        <div className="pt-0.5">
                          <h4 className="font-bold text-[#0F172A] text-[14px] leading-snug">{feature.title}</h4>
                          <p className="text-[13px] text-[#64748B] mt-0.5">{feature.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Advanced Compatibility & App Categories Box */}
            <div className="bg-white border border-gray-100 shadow-[0_2px_12px_rgb(0,0,0,0.02)] rounded-[16px] p-6 lg:p-8 mb-8">
              <h3 className="text-[17px] font-bold text-[#0F172A] mb-6">Advanced Compatibility</h3>
              
              <div className="space-y-1">
                {compatibility.map((item, idx) => (
                  <div 
                    key={idx} 
                    className={`flex items-center justify-between px-4 py-3.5 rounded-lg ${idx % 2 === 0 ? 'bg-[#F8FAFC]' : 'bg-white'}`}
                  >
                    <span className="text-[15px] text-[#475569]">{item}</span>
                    <CheckCircle2 className="w-[18px] h-[18px] text-emerald-500 flex-shrink-0" strokeWidth={1.5} />
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                {appCategories.map((category, idx) => (
                  <div key={idx} className="bg-[#f0fdf4] border border-[#dcfce7] rounded-xl p-4">
                    <h4 className="text-[11px] font-bold text-[#166534] mb-[6px] uppercase tracking-wide">{category.title}</h4>
                    <p className="text-[14px] leading-[1.3] text-[#15803d]">{category.apps}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Order Form */}
          <div>
            <div className="bg-white shadow-[0_2px_12px_rgb(0,0,0,0.02)] border border-gray-100 rounded-[16px] p-6 lg:p-8 sticky top-24">
              {/* Order Now Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-[42px] h-[42px] rounded-full bg-[#DCFCE7] flex items-center justify-center flex-shrink-0">
                  <KeyRound className="w-[20px] h-[20px] text-[#166534]" strokeWidth={2} />
                </div>
                <div>
                  <h2 className="text-[18px] font-bold text-[#0F172A]">Order Now</h2>
                  <p className="text-[13px] text-[#64748B] font-medium mt-0.5">Cash on Delivery - ₹2,000</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-[13px] font-bold text-[#0F172A] mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Your full name"
                    className="w-full px-3 py-2.5 border border-gray-200/80 rounded-lg text-[14px] text-gray-900 placeholder-gray-400 focus:ring-1 focus:ring-green-500 focus:border-green-500 shadow-[0_1px_2px_rgb(0,0,0,0.01)]"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-[13px] font-bold text-[#0F172A] mb-2">
                    Phone Number *
                  </label>
                  <div className="flex">
                    <span className="px-3.5 py-2.5 bg-[#F8FAFC] border border-gray-200/80 border-r-0 rounded-l-lg text-[14px] text-gray-600 font-medium flex items-center">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="10 digit number"
                      className="flex-1 px-3 py-2.5 border border-gray-200/80 rounded-r-lg text-[14px] text-gray-900 placeholder-gray-400 focus:ring-1 focus:ring-green-500 focus:border-green-500 shadow-[0_1px_2px_rgb(0,0,0,0.01)]"
                    />
                  </div>
                </div>

                {/* Address Line 1 */}
                <div>
                  <label className="block text-[13px] font-bold text-[#0F172A] mb-2">
                    Address Line 1 *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.addressLine1}
                    onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
                    placeholder="House/Flat No., Building, Street"
                    className="w-full px-3 py-2.5 border border-gray-200/80 rounded-lg text-[14px] text-gray-900 placeholder-gray-400 focus:ring-1 focus:ring-green-500 focus:border-green-500 shadow-[0_1px_2px_rgb(0,0,0,0.01)]"
                  />
                </div>

                {/* Address Line 2 */}
                <div>
                  <label className="block text-[13px] font-bold text-[#0F172A] mb-2">
                    Address Line 2
                  </label>
                  <input
                    type="text"
                    value={formData.addressLine2}
                    onChange={(e) => setFormData({ ...formData, addressLine2: e.target.value })}
                    placeholder="Landmark, Area (optional)"
                    className="w-full px-3 py-2.5 border border-gray-200/80 rounded-lg text-[14px] text-gray-900 placeholder-gray-400 focus:ring-1 focus:ring-green-500 focus:border-green-500 shadow-[0_1px_2px_rgb(0,0,0,0.01)]"
                  />
                </div>

                {/* City and State */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[13px] font-bold text-[#0F172A] mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="City"
                      className="w-full px-3 py-2.5 border border-gray-200/80 rounded-lg text-[14px] text-gray-900 placeholder-gray-400 focus:ring-1 focus:ring-green-500 focus:border-green-500 shadow-[0_1px_2px_rgb(0,0,0,0.01)]"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] font-bold text-[#0F172A] mb-2">
                      State *
                    </label>
                    <select
                      required
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full px-3 py-2.5 border border-gray-200/80 rounded-lg text-[14px] text-gray-600 focus:ring-1 focus:ring-green-500 focus:border-green-500 shadow-[0_1px_2px_rgb(0,0,0,0.01)] bg-white"
                    >
                      <option value="">Select</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Gujarat">Gujarat</option>
                    </select>
                  </div>
                </div>

                {/* Pin Code */}
                <div>
                  <label className="block text-[13px] font-bold text-[#0F172A] mb-2">
                    Pin Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    placeholder="6 digit Pin Code"
                    className="w-full px-3 py-2.5 border border-gray-200/80 rounded-lg text-[14px] text-gray-900 placeholder-gray-400 focus:ring-1 focus:ring-green-500 focus:border-green-500 shadow-[0_1px_2px_rgb(0,0,0,0.01)]"
                  />
                </div>

                {/* Order Summary */}
                <div className="bg-[#F8FAFC] border border-gray-100 rounded-xl p-5 mt-8 mb-6 space-y-3">
                  <div className="flex justify-between text-[14px]">
                    <span className="text-[#64748B] font-medium">Product</span>
                    <span className="font-bold text-[#0F172A] tracking-tight">YubiKey 5C NFC</span>
                  </div>
                  <div className="flex justify-between text-[14px]">
                    <span className="text-[#64748B] font-medium">Quantity</span>
                    <span className="font-bold text-[#0F172A]">1</span>
                  </div>
                  <div className="flex justify-between text-[14px]">
                    <span className="text-[#64748B] font-medium">Delivery</span>
                    <span className="font-bold text-[#16A34A]">FREE</span>
                  </div>
                  <div className="flex justify-between text-[15px] font-bold pt-3 mt-1.5 border-t border-gray-200/80">
                    <span className="text-[#0F172A]">Total (COD)</span>
                    <span className="text-[#0F172A] text-[18px]">₹2,000</span>
                  </div>
                </div>

                {/* Place Order Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-[#83D199] hover:bg-[#6CC686] text-white font-bold text-[15px] rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 transition-colors shadow-sm cursor-pointer"
                >
                  {loading ? (
                    <>
                      <div className="w-[18px] h-[18px] border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Truck className="w-[18px] h-[18px]" strokeWidth={2.5} />
                      Place Order - ₹2,000 COD
                    </>
                  )}
                </button>

                {/* Trust Badges */}
                <div className="flex items-center justify-center gap-5 pt-3 mb-2">
                  <div className="flex items-center gap-1.5 text-[#9CA3AF]">
                    <Lock className="w-[13px] h-[13px]" strokeWidth={2.5} />
                    <span className="text-[11.5px] font-medium tracking-wide">Secure Order</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#9CA3AF]">
                    <Truck className="w-[13px] h-[13px]" strokeWidth={2.5} />
                    <span className="text-[11.5px] font-medium tracking-wide">Free Delivery</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#9CA3AF]">
                    <Package className="w-[13px] h-[13px]" strokeWidth={2.5} />
                    <span className="text-[11.5px] font-medium tracking-wide">COD Only</span>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasskeyOrderPage;
