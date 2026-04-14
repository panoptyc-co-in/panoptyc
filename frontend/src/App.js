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

const HomePage = ({ onApply }) => (
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
);

function App() {
  const [applyOpen, setApplyOpen] = useState(false);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0a0a0a", fontFamily: "'Inter', sans-serif" }}>
      <BrowserRouter>
        <Navbar onApply={() => setApplyOpen(true)} />
        <Routes>
          <Route path="/" element={<HomePage onApply={() => setApplyOpen(true)} />} />
        </Routes>
        <ApplyModal open={applyOpen} onClose={() => setApplyOpen(false)} />
      </BrowserRouter>
    </div>
  );
}

export default App;
