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
import HowToJoin from "./components/HowToJoin";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";
import ApplyModal from "./components/ApplyModal";
import EmployeeLoginModal from "./components/EmployeeLoginModal";
import PasskeyOrderPage from "./components/PasskeyOrderPage";
import ProfileSetupPage from "./components/ProfileSetupPage";

const HomePage = ({ onApply, onEmployeeLogin }) => (
  <>
    <Navbar onApply={onApply} onEmployeeLogin={onEmployeeLogin} />
    <main>
      <Hero onApply={onApply} />
      <StatsAndTrust />
      <WhyPanoptyc />
      <Industries />
      <RoleSection onApply={onApply} />
      <Benefits />
      <HowToJoin onApply={onApply} />
      <Testimonials />
      <FAQ />
      <CTASection onApply={onApply} />
      <Footer onApply={onApply} />
    </main>
  </>
);

function App() {
  const [applyOpen, setApplyOpen] = useState(false);
  const [employeeLoginOpen, setEmployeeLoginOpen] = useState(false);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0f1419", fontFamily: "'Inter', sans-serif" }}>
      <BrowserRouter>
        <Routes>
          <Route 
            path="/" 
            element={
              <HomePage 
                onApply={() => setApplyOpen(true)} 
                onEmployeeLogin={() => setEmployeeLoginOpen(true)}
              />
            } 
          />
          <Route path="/passkey-order" element={<PasskeyOrderPage />} />
          <Route path="/profile-setup" element={<ProfileSetupPage />} />
        </Routes>
        <ApplyModal open={applyOpen} onClose={() => setApplyOpen(false)} />
        <EmployeeLoginModal open={employeeLoginOpen} onClose={() => setEmployeeLoginOpen(false)} />
      </BrowserRouter>
    </div>
  );
}

export default App;