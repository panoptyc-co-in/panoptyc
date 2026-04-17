import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, FileText, Copy, Check, CheckCircle, AlertCircle } from "lucide-react";

// Generate unique PAN employee code: PAN + YYMM + random 6 alphanumeric chars
const generateEmployeeCode = () => {
  const now = new Date();
  const year = String(now.getFullYear());
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let suffix = "";
  for (let i = 0; i < 4; i++) suffix += chars[Math.floor(Math.random() * chars.length)];
  return `PAN${year}${month}${day}${suffix}`;
};

const AgreementPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Redirect if no state (they circumvented the flow)
  useEffect(() => {
    if (!location.state) navigate("/");
  }, [location, navigate]);

  const { formData = {}, password = "" } = location.state || {};

  // Generate employee code once on mount
  const [employeeCode] = useState(generateEmployeeCode);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [copied, setCopied] = useState(false);

  // Signature Canvas Logic
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);

  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#000";
  };

  useEffect(() => {
    initCanvas();
  }, [canvasRef]);

  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    if (e.touches && e.touches.length > 0) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    }
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const startDrawing = (e) => {
    e.preventDefault();
    const { x, y } = getCoordinates(e);
    const ctx = canvasRef.current.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
    setHasSignature(true);
  };

  const draw = (e) => {
    e.preventDefault();
    if (!isDrawing) return;
    const { x, y } = getCoordinates(e);
    const ctx = canvasRef.current.getContext("2d");
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const finishDrawing = () => setIsDrawing(false);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(successData?.employeeCode || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async () => {
    if (!agreed) {
      alert("Please declare that you agree to the terms.");
      return;
    }
    if (!hasSignature) {
      alert("Please provide your signature before submitting.");
      return;
    }

    setLoading(true);
    const API_URL = process.env.REACT_APP_BACKEND_URL;
    try {
      // Get the signature as base64
      const signatureBase64 = canvasRef.current?.toDataURL("image/png") || "";

      // 1. Submit basic account info to Supabase
      if (password) {
        const setupResponse = await fetch(`${API_URL}/api/submit-profile-setup`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: formData.email, password }),
        });
        if (!setupResponse.ok) {
          console.error("Failed to complete basic setup");
        }
      }

      // 2. Submit complete profile with employeeCode, signature, termsAgreed
      const payload = {
        ...formData,
        employeeCode,
        signature: signatureBase64,
        termsAgreed: true,
      };

      const response = await fetch(`${API_URL}/api/submit-complete-profile`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (response.ok && result.success) {
        // Save full session to localStorage (all profile fields for the modal card)
        const session = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          mobile: formData.mobile,
          address: formData.address,
          education: formData.education,
          photo: formData.photo || "",
          employeeCode,
        };
        localStorage.setItem("panoptyc_employee", JSON.stringify(session));

        // Show success screen
        setSuccessData({
          firstName: formData.firstName,
          email: formData.email,
          employeeCode,
        });
      } else {
        throw new Error(result.detail || "Submission failed");
      }
    } catch (error) {
      alert(`❌ Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const today = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

  // ─── SUCCESS SCREEN ─────────────────────────────────────────────────────────
  if (successData) {
    return (
      <div
        className="fixed inset-0 flex items-center justify-center px-4"
        style={{ background: "#22c55e", fontFamily: "'Inter', sans-serif" }}
      >
        <div className="w-full max-w-[440px] bg-white rounded-[24px] shadow-2xl px-8 py-10 text-center">
          {/* Check Icon */}
          <div className="flex justify-center mb-5">
            <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
              <CheckCircle className="w-9 h-9 text-green-500" strokeWidth={2} />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-[24px] font-extrabold text-[#0f172a] mb-1">
            Congratulations, {successData.firstName}!
          </h1>
          <p className="text-[14px] text-gray-500 mb-7">
            Your registration is complete. Welcome to Panoptyc!
          </p>

          {/* Employee Code Box */}
          <div className="bg-[#0f172a] rounded-xl px-6 py-5 mb-6 flex flex-col items-center">
            <span className="text-[11px] text-gray-400 uppercase tracking-widest mb-2">Your Employee Code</span>
            <div className="flex items-center gap-3">
              <span className="text-[28px] font-bold tracking-widest" style={{ color: "#4ade80", fontFamily: "monospace" }}>
                {successData.employeeCode}
              </span>
              <button
                onClick={handleCopy}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                title="Copy Code"
              >
                {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} className="text-gray-300" />}
              </button>
            </div>
          </div>

          {/* Warning Note */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-4 mb-5 text-left">
            <div className="flex items-center gap-2 mb-1">
              <AlertCircle size={14} className="text-amber-500 flex-shrink-0" />
              <span className="text-[13px] font-semibold text-amber-700">Please save this code for future reference</span>
            </div>
            <p className="text-[12px] text-amber-600 pl-5">
              You will need this code for attendance, training, and all official communications.
            </p>
          </div>

          {/* Email note */}
          <p className="text-[13px] text-gray-500 mb-7">
            We have also sent this code to your email:{" "}
            <span className="font-bold text-gray-700">{successData.email}</span>
          </p>

          {/* Done Button */}
          <button
            onClick={() => navigate("/")}
            className="w-full py-3.5 rounded-full font-bold text-[16px] text-white transition-all hover:brightness-110 active:scale-[0.98]"
            style={{ background: "#ef4444" }}
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  // ─── AGREEMENT VIEW ──────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#eef2f6] flex flex-col items-center py-8 px-4" style={{ fontFamily: "'Inter', sans-serif" }}>
      
      {/* Top Bar */}
      <div className="w-full max-w-[800px] flex items-center mb-6">
        <button onClick={() => navigate(-1)} className="flex items-center text-[14px] text-gray-500 hover:text-gray-800 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </button>
      </div>

      {/* Main Document Card */}
      <div className="w-full max-w-[800px] bg-white shadow-lg overflow-hidden border-t-[8px] border-b-[8px] border-t-[#c1262d] border-b-[#c1262d] relative mb-12">
        <div className="px-10 py-12">

          {/* Header Section */}
          <div className="flex justify-between items-start mb-10">
            <div>
              <img
                src="https://customer-assets.emergentagent.com/job_remote-lead-hiring/artifacts/yyk8ba47_Panoptyc-Logo-HiRes.jpg"
                alt="Panoptyc"
                className="h-10 w-auto object-contain mix-blend-multiply mb-2"
              />
              <div className="text-[13px] text-gray-500 font-medium leading-tight">
                AI-Powered Video Surveillance<br />United States
              </div>
            </div>
            <div className="text-right">
              <h2 className="text-[16px] font-bold text-gray-800 tracking-wide uppercase">Employment Agreement</h2>
              <div className="text-[13px] text-gray-500 mt-1">
                Date: {today}<br />Ref: PAN/2026/EMP
              </div>
            </div>
          </div>

          {/* Employee Photo */}
          <div className="flex justify-end mb-6">
            <div className="w-[100px] flex flex-col items-center">
              <div className="w-24 h-24 bg-gray-100 rounded-sm border border-gray-300 overflow-hidden flex items-center justify-center">
                {formData.photo ? (
                  <img src={formData.photo} alt="Employee" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-[10px] text-gray-400">No Photo</span>
                )}
              </div>
              <span className="text-[8px] text-gray-400 mt-1 uppercase tracking-wide">Employee Photo</span>
            </div>
          </div>

          {/* Employee Details Box */}
          <div className="bg-[#f8fafd] border border-blue-100 rounded-lg p-6 mb-8">
            <h3 className="text-[13px] font-bold text-gray-700 uppercase tracking-wide mb-4">Employee Details</h3>
            <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-[14px]">
              <div><span className="text-gray-500">Name:</span> <span className="font-semibold text-gray-800">{formData.firstName} {formData.lastName}</span></div>
              <div><span className="text-gray-500">Email:</span> <span className="font-semibold text-gray-800">{formData.email}</span></div>
              <div><span className="text-gray-500">Mobile:</span> <span className="font-semibold text-gray-800">{formData.mobile ? `+91 ${formData.mobile}` : ""}</span></div>
              <div><span className="text-gray-500">Education:</span> <span className="font-semibold text-gray-800">{formData.education}</span></div>
              <div className="col-span-2"><span className="text-gray-500">Address:</span> <span className="font-semibold text-gray-800">{formData.address}</span></div>
            </div>
          </div>

          {/* Terms & Conditions */}
          <h3 className="text-[13px] font-bold text-gray-700 uppercase tracking-wide mb-2">Terms and Conditions</h3>
          <div className="relative border border-gray-200 rounded-lg p-6 mb-8 bg-white overflow-hidden min-h-[300px]">
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
              <img src="https://customer-assets.emergentagent.com/job_remote-lead-hiring/artifacts/yyk8ba47_Panoptyc-Logo-HiRes.jpg" alt="watermark" className="w-3/4 object-contain" />
            </div>
            <div className="relative z-10 text-[13px] leading-relaxed text-gray-700 space-y-4 font-medium">
              <p><strong>1. POSITION:</strong> Remote Video Surveillance Analyst</p>
              <p><strong>2. COMPENSATION:</strong> ₹35,000 (Thirty-Five Thousand Rupees) per month, payable by the 5th of each subsequent month.</p>
              <p><strong>3. WORK SCHEDULE:</strong> Full-time position with night shifts aligned with US retail store hours (approximately 8 hours per shift).</p>
              <p><strong>4. DUTIES:</strong> Monitor live and recorded video feeds, identify suspicious activities and theft incidents, document and report incidents using company software, maintain confidentiality of all surveillance data.</p>
              <p><strong>5. EQUIPMENT:</strong> Employee shall provide their own laptop/desktop with stable internet connection (minimum 10 Mbps).</p>
              <p><strong>6. CONFIDENTIALITY:</strong> Employee agrees to maintain strict confidentiality regarding all client information, surveillance footage, and proprietary company data.</p>
              <p><strong>7. TRAINING:</strong> Company shall provide comprehensive training on the AI surveillance platform at no cost to the employee.</p>
              <p><strong>8. TERMINATION:</strong> Either party may terminate this agreement with 15 days written notice.</p>
              <p><strong>9. CONDUCT:</strong> Employee shall maintain professional conduct, report to scheduled shifts punctually, and adhere to all company policies.</p>
            </div>
            <div className="absolute top-2 bottom-2 right-1.5 w-1.5 bg-gray-200 rounded-full"></div>
          </div>

          {/* Declaration Checkbox */}
          <div className="bg-[#fffdf0] border border-[#fde047] rounded-lg p-4 mb-10">
            <label className="flex items-start cursor-pointer gap-3">
              <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-1 w-4 h-4 cursor-pointer" />
              <span className="text-[13px] text-gray-700 leading-snug">
                I, <strong>{formData.firstName} {formData.lastName}</strong>, hereby declare that I have read, understood, and agree to all terms and conditions stated above. I commit to fulfilling my responsibilities professionally and ethically.
              </span>
            </label>
          </div>

          {/* Signatures Section */}
          <div className="grid grid-cols-2 gap-8 mb-12">
            {/* Employee Signature Canvas */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-[12px] font-bold text-gray-700">Employee Signature *</span>
                <button onClick={clearCanvas} className="text-[11px] text-red-500 hover:text-red-700 font-semibold transition-colors">Clear</button>
              </div>
              <div className="border border-gray-300 rounded overflow-hidden bg-[#fafafa]">
                <canvas
                  ref={canvasRef}
                  width={340}
                  height={120}
                  className="w-full h-[120px] cursor-crosshair touch-none"
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={finishDrawing}
                  onMouseOut={finishDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={finishDrawing}
                ></canvas>
              </div>
              <p className="text-[9px] text-gray-400 text-center mt-1.5 uppercase">Sign above using mouse or finger</p>
            </div>

            {/* Authorized Signatory */}
            <div className="flex flex-col">
              <div className="text-[13px] text-[#334155] mb-2 font-medium">Authorized Signatory</div>
              <div className="border border-[#cbd5e1] rounded-lg bg-[#f8fafc] h-[120px] flex flex-col items-center justify-center gap-2 px-4">
                <div className="text-[38px] leading-none" style={{ fontFamily: "'Dancing Script', 'Caveat', cursive", color: "#1e293b" }}>
                  Mac Bolak
                </div>
                <div className="w-[90%] h-px bg-[#cbd5e1]"></div>
                <div className="text-center">
                  <div className="text-[13px] font-bold text-[#1e293b]">Mac Bolak</div>
                  <div className="text-[12px] text-[#64748b]">Founder &amp; CEO, Panoptyc</div>
                </div>
              </div>
            </div>
          </div>

          {/* Official Seal */}
          <div className="flex justify-center mb-10">
            <div className="relative w-32 h-32 rounded-full border-[3px] border-red-600 flex items-center justify-center p-2 opacity-90 transform -rotate-12">
              <div className="w-full h-full rounded-full border border-red-500 flex flex-col items-center justify-center p-2 text-center text-red-600 font-bold bg-white">
                <span className="text-[10px] leading-tight mb-2 tracking-widest">PANOPTYC INC.</span>
                <img src="https://customer-assets.emergentagent.com/job_remote-lead-hiring/artifacts/yyk8ba47_Panoptyc-Logo-HiRes.jpg" alt="Panoptyc" className="h-3 w-auto object-contain mix-blend-multiply mb-1" />
                <span className="text-[7px] tracking-[0.2em] opacity-80 mt-1">OFFICIAL SEAL<br />UNITED STATES</span>
              </div>
              <div className="absolute bottom-[-10px] right-[-10px] bg-red-600 text-white text-[9px] font-bold tracking-wider py-1 px-3 rounded shadow-sm rotate-12">VERIFIED</div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-[#ec8181] hover:bg-[#de6666] text-white py-4 rounded-md font-bold text-[16px] transition-colors flex justify-center items-center gap-2 shadow-sm disabled:opacity-75 disabled:cursor-not-allowed"
          >
            <FileText size={18} />
            {loading ? "Submitting Agreement..." : "Sign & Submit Agreement"}
          </button>

          <div className="border-t border-gray-200 mt-8 pt-4 text-center">
            <p className="text-[11px] text-gray-500">
              This is a legally binding document. Please retain a copy for your records.<br />
              support@panoptyc.com | panoptyc.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgreementPage;
