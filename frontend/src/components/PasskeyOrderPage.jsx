import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Shield, Truck, Banknote, Star, Check } from "lucide-react";

const PasskeyOrderPage = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
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
      icon: "🔌",
      title: "USB-C + NFC",
      description: "Plug in via USB-C or tap on NFC-enabled devices"
    },
    {
      icon: "🔒",
      title: "Multi-Protocol Security",
      description: "FIDO2, WebAuthn, U2F, Smart Card, OTP, OpenPGP"
    },
    {
      icon: "🌐",
      title: "Widely Compatible",
      description: "Works with Google, Microsoft, Apple, password managers & 100s more"
    },
    {
      icon: "🔑",
      title: "Passwordless Login",
      description: "Hardware-bound passkey for the strongest authentication"
    },
    {
      icon: "📱",
      title: "Works with Phones",
      description: "NFC tap authentication on Android and iPhone"
    },
    {
      icon: "🇸🇪",
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back</span>
          </button>
          <div className="flex items-center gap-3">
            <img 
              src="https://customer-assets.emergentagent.com/job_remote-lead-hiring/artifacts/yyk8ba47_Panoptyc-Logo-HiRes.jpg" 
              alt="Panoptyc" 
              className="h-8 w-auto"
            />
            <span className="text-gray-400 text-sm">Security Store</span>
          </div>
          <div className="flex items-center gap-1.5 text-green-600 text-sm">
            <Shield className="w-4 h-4" />
            <span className="font-medium">Secure</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Product Details */}
          <div>
            {/* Product Image */}
            <div className="bg-yellow-50 rounded-lg p-8 mb-4">
              <div className="bg-white rounded-lg p-4">
                <img
                  src={productImages[selectedImage]}
                  alt="YubiKey"
                  className="w-full h-auto max-h-96 object-contain"
                />
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="flex gap-2 mb-8">
              {productImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`flex-1 border-2 rounded-lg p-2 ${
                    selectedImage === idx ? "border-green-500" : "border-gray-200"
                  }`}
                >
                  <img src={img} alt={`View ${idx + 1}`} className="w-full h-16 object-contain" />
                </button>
              ))}
            </div>

            {/* Badges */}
            <div className="flex gap-2 mb-4">
              <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded">
                BEST SELLER
              </span>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded">
                OFFICIAL
              </span>
            </div>

            {/* Product Title */}
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Yubico YubiKey 5C NFC
            </h1>
            <p className="text-gray-600 text-sm mb-3">
              Hardware Security Key - USB-C + NFC | Multi-Protocol | FIDO2/WebAuthn
            </p>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-sm text-gray-600">4.5 (6,070 ratings)</span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-3xl font-bold text-gray-900">₹2,000</span>
                <span className="text-lg text-gray-400 line-through">₹5,100</span>
                <span className="px-2 py-1 bg-red-100 text-red-600 text-xs font-bold rounded">
                  67% OFF
                </span>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-start gap-2">
                <Banknote className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-green-700">Cash on Delivery - ₹2,000</p>
                  <p className="text-xs text-green-600">Pay when you receive the product at your doorstep</p>
                </div>
              </div>
            </div>

            {/* Key Features */}
            <div className="mb-6">
              <h3 className="font-bold text-gray-900 mb-4">Key Features</h3>
              <div className="space-y-3">
                {keyFeatures.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="text-2xl">{feature.icon}</span>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">{feature.title}</h4>
                      <p className="text-xs text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Advanced Compatibility */}
            <div className="mb-6">
              <h3 className="font-bold text-gray-900 mb-4">Advanced Compatibility</h3>
              <div className="space-y-2">
                {compatibility.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-700">{item}</span>
                    <Check className="w-5 h-5 text-green-500" />
                  </div>
                ))}
              </div>
            </div>

            {/* App Categories */}
            <div className="grid grid-cols-2 gap-4">
              {appCategories.map((category, idx) => (
                <div key={idx} className="bg-green-50 rounded-lg p-4">
                  <h4 className="text-xs font-bold text-green-700 mb-1">{category.title}</h4>
                  <p className="text-xs text-gray-600">{category.apps}</p>
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
                  <h2 className="font-bold text-gray-900 mb-1">Order Now</h2>
                  <p className="text-xs text-gray-600">Cash on Delivery - ₹2,000</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Your full name"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Phone Number *
                  </label>
                  <div className="flex gap-2">
                    <span className="px-3 py-2.5 bg-gray-100 border border-gray-300 rounded-lg text-sm text-gray-700">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="10 digit number"
                      className="flex-1 px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Address Line 1 */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Address Line 1 *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.addressLine1}
                    onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
                    placeholder="House/Flat No., Building, Street"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                {/* Address Line 2 */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Address Line 2
                  </label>
                  <input
                    type="text"
                    value={formData.addressLine2}
                    onChange={(e) => setFormData({ ...formData, addressLine2: e.target.value })}
                    placeholder="Landmark, Area (optional)"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                {/* City and State */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="City"
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      State *
                    </label>
                    <select
                      required
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Pin Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    placeholder="6 digit Pin Code"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                {/* Order Summary */}
                <div className="border-t border-gray-200 pt-4 space-y-2">
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
                  <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
                    <span className="text-gray-900">Total (COD)</span>
                    <span className="text-gray-900">₹2,000</span>
                  </div>
                </div>

                {/* Place Order Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg flex items-center justify-center gap-2 disabled:opacity-50"
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
                <div className="flex items-center justify-center gap-4 text-xs text-gray-500 pt-2">
                  <div className="flex items-center gap-1">
                    <Shield className="w-4 h-4" />
                    <span>Secure Order</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Truck className="w-4 h-4" />
                    <span>Free Delivery</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Banknote className="w-4 h-4" />
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
