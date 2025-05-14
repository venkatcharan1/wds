
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServicesSection";
import PortfolioSection from "@/components/sections/PortfolioSection";
import ProcessSection from "@/components/sections/ProcessSection";
import PricingSection from "@/components/sections/PricingSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  useEffect(() => {
    // Initialize all reveal animations for elements with the 'reveal' class
    const revealElements = document.querySelectorAll(".reveal");
    
    revealElements.forEach((element) => {
      gsap.fromTo(
        element,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
    });

    // Parallax scroll effect for elements with 'parallax-item' class
    const parallaxItems = document.querySelectorAll(".parallax-item");
    
    parallaxItems.forEach((item) => {
      const depth = item.getAttribute("data-depth") || "0.2";
      
      ScrollTrigger.create({
        trigger: item.parentElement,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const yPos = self.progress * -50 * parseFloat(depth);
          gsap.to(item, {
            y: yPos,
            ease: "none",
            duration: 0.1
          });
        },
        scrub: true
      });
    });

    // Load the Visme form script
    const loadVismeScript = () => {
      const script = document.createElement('script');
      script.src = "https://static-bundles.visme.co/forms/vismeforms-embed.js";
      script.async = true;
      document.body.appendChild(script);
    };
    
    loadVismeScript();
    
    return () => {
      // We don't remove the script since it may be needed on page refresh
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <PortfolioSection />
      <ProcessSection />
      <PricingSection />
      <ContactSection />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
