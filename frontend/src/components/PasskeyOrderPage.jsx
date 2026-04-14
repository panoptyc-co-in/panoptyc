import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Key, CreditCard, MapPin, Phone, Mail } from "lucide-react";

const PasskeyOrderPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    passkeyType: "standard",
    quantity: 1,
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((res) => setTimeout(res, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  const inputCls = "w-full rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all duration-200 focus:ring-2 focus:ring-red-500/40 border border-slate-300 bg-white";

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center border border-slate-200">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5 bg-green-50 border border-green-200">
            <Key className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Order Placed Successfully!</h2>
          <p className="text-slate-600 mb-6">
            Thank you, {formData.fullName}! Your passkey order has been received. We'll ship it to your address within 5-7 business days.
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
          {/* Icon & Title */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 bg-red-50 border border-red-200">
              <Key className="w-8 h-8 text-red-500" />
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Order Your Passkey</h1>
            <p className="text-slate-600">
              Security passkey for employee authentication and access control
            </p>
          </div>

          {/* Pricing Info */}
          <div className="mb-8 p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-slate-600">Standard Passkey</div>
                <div className="text-xs text-slate-500 mt-1">Hardware authentication device</div>
              </div>
              <div className="text-2xl font-bold text-slate-900">₹2,500</div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Details */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700 mb-3">Personal Details</h3>
              <div className="space-y-3">
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
              </div>
            </div>

            {/* Shipping Address */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700 mb-3">Shipping Address</h3>
              <div className="space-y-3">
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
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-600 mb-1.5">
                Quantity
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={formData.quantity}
                onChange={(e) => setFormData((p) => ({ ...p, quantity: parseInt(e.target.value) }))}
                className={inputCls}
              />
            </div>

            {/* Total */}
            <div className="p-4 rounded-xl bg-red-50 border border-red-200">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-700">Total Amount</span>
                <span className="text-2xl font-bold text-red-600">₹{(2500 * formData.quantity).toLocaleString()}</span>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-semibold text-white transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  Processing Order...
                </>
              ) : (
                <>
                  <CreditCard className="w-4 h-4" />
                  Place Order
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PasskeyOrderPage;
