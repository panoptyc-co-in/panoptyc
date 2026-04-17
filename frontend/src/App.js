import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import StatsAndTrust from "./components/StatsAndTrust";
import WhyPanoptyc from "./components/WhyPanoptyc";
import Industries from "./components/Industries";
import RoleSection from "./components/RoleSection";
import Benefits from "./components/Benefits";
import Requirements from "./components/Requirements";
import HowToJoin from "./components/HowToJoin";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";
import ApplyModal from "./components/ApplyModal";
import ProfileSetupModal from "./components/ProfileSetupPage";
import PasskeyOrderPage from "./components/PasskeyOrderPage";
import EmployeeLoginPage from "./components/EmployeeLoginPage";
import AdminLoginPage from "./components/AdminLoginPage";
import AdminDashboard from "./components/AdminDashboard";
import CompleteProfilePage from "./components/CompleteProfilePage";
import AgreementPage from "./components/AgreementPage";

const HomePage = ({ onApply, onProfileSetup }) => (
  <>
    <Navbar onApply={onApply} onProfileSetup={onProfileSetup} />
    <main>
      <Hero onApply={onApply} />
      <StatsAndTrust />
      <WhyPanoptyc />
      <Industries />
      <RoleSection onApply={onApply} />
      <Requirements />
      <Benefits />
      <HowToJoin onApply={onApply} />
      <Testimonials />
      <FAQ />
      <CTASection onApply={onApply} />
      <Footer onApply={onApply} />
    </main>
    <div className="md:hidden fixed bottom-6 right-6 z-[60]">
      <button
        onClick={onApply}
        className="flex items-center gap-2 px-5 py-3 rounded-full font-semibold text-[15px] text-white bg-[#ef4444] shadow-2xl active:scale-95 transition-transform"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-4 h-4"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
        Apply Now
      </button>
    </div>
  </>
);

function App() {
  const [applyOpen, setApplyOpen] = useState(false);
  const [profileSetupOpen, setProfileSetupOpen] = useState(false);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0f172a", fontFamily: "'Inter', sans-serif" }}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                onApply={() => setApplyOpen(true)}
                onProfileSetup={() => setProfileSetupOpen(true)}
              />
            }
          />
          <Route path="/passkey-order" element={<PasskeyOrderPage />} />
          <Route path="/employee-login" element={<EmployeeLoginPage />} />
          <Route path="/complete-profile" element={<CompleteProfilePage />} />
          <Route path="/agreement" element={<AgreementPage />} />

          {/* ── Admin Routes ── */}
          <Route path="/admin" element={<AdminLoginPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
        <ApplyModal open={applyOpen} onClose={() => setApplyOpen(false)} />
        <ProfileSetupModal open={profileSetupOpen} onClose={() => setProfileSetupOpen(false)} />
      </BrowserRouter>
    </div>
  );
}

export default App;