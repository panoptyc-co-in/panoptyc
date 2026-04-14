import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Shield, Truck, Banknote, Star, Check, Zap, Globe, Fingerprint, Smartphone, ShieldCheck } from "lucide-react";

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
    await new Promise((res) => setTimeout(res, 1500));
    setLoading(false);
    setSubmitted(true);
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
            <div className="bg-white rounded-lg p-12 mb-6 flex items-center justify-center" style={{ minHeight: "500px" }}>
              <img
                src={productImages[selectedImage]}
                alt="YubiKey"
                className="w-full h-auto max-h-[500px] object-contain"
              />
            </div>

            {/* Thumbnail Images */}
            <div className="flex gap-3 mb-8 justify-center">
              {productImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`border-2 rounded-lg p-2 bg-white ${
                    selectedImage === idx ? "border-green-500" : "border-gray-200"
                  }`}
                  style={{ width: "70px", height: "70px" }}
                >
                  <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-contain" />
                </button>
              ))}
            </div>

            {/* Badges */}
            <div className="flex gap-2 mb-4">
              <span className="px-3 py-1.5 bg-green-50 text-green-600 text-xs font-bold rounded">
                BEST SELLER
              </span>
              <span className="px-3 py-1.5 bg-blue-50 text-blue-600 text-xs font-bold rounded">
                OFFICIAL
              </span>
            </div>

            {/* Product Title */}
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              Yubico YubiKey 5C NFC
            </h1>
            <p className="text-gray-500 text-base mb-4">
              Hardware Security Key - USB-C + NFC | Multi-Protocol | FIDO2/WebAuthn
            </p>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex">
                {[...Array(4)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
                <Star className="w-5 h-5 fill-yellow-300 text-yellow-300" />
              </div>
              <span className="text-base text-gray-500">4.5 (6,070 ratings)</span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-5xl font-bold text-gray-900">₹2,000</span>
                <span className="text-xl text-gray-400 line-through">₹6,109</span>
                <span className="px-2.5 py-1 bg-red-50 text-red-600 text-xs font-bold rounded">
                  67% OFF
                </span>
              </div>
              <div className="bg-green-50 rounded-lg p-4 flex items-start gap-3">
                <Truck className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-base font-bold text-green-700 mb-0.5">Cash on Delivery - ₹2,000</p>
                  <p className="text-sm text-green-600">Pay when you receive the product at your doorstep</p>
                </div>
              </div>
            </div>

            {/* Key Features */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-5">Key Features</h3>
              <div className="space-y-4">
                {keyFeatures.map((feature, idx) => {
                  const IconComponent = feature.Icon;
                  return (
                    <div key={idx} className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-6 h-6 text-gray-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-base mb-1">{feature.title}</h4>
                        <p className="text-sm text-gray-500">{feature.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Advanced Compatibility */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-5">Advanced Compatibility</h3>
              <div className="space-y-0">
                {compatibility.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0">
                    <span className="text-base text-gray-600">{item}</span>
                    <div className="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* App Categories */}
            <div className="grid grid-cols-2 gap-4">
              {appCategories.map((category, idx) => (
                <div key={idx} className="bg-green-50 rounded-xl p-5">
                  <h4 className="text-xs font-bold text-green-700 mb-2 uppercase tracking-wide">{category.title}</h4>
                  <p className="text-sm text-green-600">{category.apps}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Order Form */}
          <div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-24">
              {/* Order Now Header */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-start gap-3">
                <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h2 className="font-bold text-gray-900 mb-1 text-base">Order Now</h2>
                  <p className="text-xs text-gray-600">Cash on Delivery - ₹2,000</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Your full name"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm text-gray-900 placeholder-gray-400 focus:ring-1 focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    Phone Number *
                  </label>
                  <div className="flex gap-2">
                    <span className="px-3 py-2.5 bg-gray-50 border border-gray-300 rounded-md text-sm text-gray-600 font-medium">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="10 digit number"
                      className="flex-1 px-3 py-2.5 border border-gray-300 rounded-md text-sm text-gray-900 placeholder-gray-400 focus:ring-1 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                </div>

                {/* Address Line 1 */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    Address Line 1 *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.addressLine1}
                    onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
                    placeholder="House/Flat No., Building, Street"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm text-gray-900 placeholder-gray-400 focus:ring-1 focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                {/* Address Line 2 */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    Address Line 2
                  </label>
                  <input
                    type="text"
                    value={formData.addressLine2}
                    onChange={(e) => setFormData({ ...formData, addressLine2: e.target.value })}
                    placeholder="Landmark, Area (optional)"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm text-gray-900 placeholder-gray-400 focus:ring-1 focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                {/* City and State */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="City"
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm text-gray-900 placeholder-gray-400 focus:ring-1 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                      State *
                    </label>
                    <select
                      required
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm text-gray-600 focus:ring-1 focus:ring-green-500 focus:border-green-500"
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
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    Pin Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    placeholder="6 digit Pin Code"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm text-gray-900 placeholder-gray-400 focus:ring-1 focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                {/* Order Summary */}
                <div className="border-t border-gray-200 pt-4 space-y-2.5">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Product</span>
                    <span className="font-medium text-gray-900">YubiKey 5C NFC</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Quantity</span>
                    <span className="font-medium text-gray-900">1</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Delivery</span>
                    <span className="font-semibold text-green-600">FREE</span>
                  </div>
                  <div className="flex justify-between text-base font-bold pt-2 border-t border-gray-200">
                    <span className="text-gray-900">Total (COD)</span>
                    <span className="text-gray-900">₹2,000</span>
                  </div>
                </div>

                {/* Place Order Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-green-400 hover:bg-green-500 text-white font-semibold rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 transition-colors"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Banknote className="w-5 h-5" />
                      Place Order - ₹2,000 COD
                    </>
                  )}
                </button>

                {/* Trust Badges */}
                <div className="flex items-center justify-center gap-4 text-xs text-gray-400 pt-2">
                  <div className="flex items-center gap-1">
                    <Shield className="w-3.5 h-3.5" />
                    <span>Secure Order</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5" />
                    <span>Free Delivery</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Banknote className="w-3.5 h-3.5" />
                    <span>COD Only</span>
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
