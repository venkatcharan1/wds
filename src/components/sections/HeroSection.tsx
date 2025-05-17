import React, { useRef, useEffect, useLayoutEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import ThreeDAnimation from "@/components/ThreeDAnimation";
import gsap from "gsap";
import { useIsMobile } from "@/hooks/use-mobile";
import styles from "./HeroSection.module.css";

const HeroSection: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useLayoutEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.2 }
    )
    .fromTo(
      subtitleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power4.out" },
      "-=0.4"
    )
    .fromTo(
      ctaRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.0, ease: "power3.out", delay: 0.4 },
      "-=0.4"
    );
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen pt-20 overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-gradient-to-br from-agency-purple/10 via-agency-indigo/10 to-agency-blue/10 dark:from-agency-purple/20 dark:via-agency-indigo/20 dark:to-agency-blue/20"
      />

      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between h-[calc(100vh-80px)] gap-8">
        <div className={`lg:w-1/2 z-10 ${isMobile ? 'text-center' : ''}`}>
          <h1
            ref={titleRef}
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 bg-gradient-to-br from-agency-purple via-agency-indigo to-agency-blue bg-clip-text text-transparent"
          >
            Web Design Services
          </h1>
          <p
            ref={subtitleRef}
            className={`text-lg md:text-xl text-muted-foreground mb-4 ${isMobile ? 'mx-auto' : ''} max-w-xl`}
          >
            Creating Digital Experiences That Inspire.
          </p>
          <div ref={ctaRef} className={`flex ${isMobile ? 'justify-center' : ''} flex-wrap gap-4`}>
            <Button
              size="lg"
              className="rounded-full px-8 group"
              onClick={() => scrollToSection("services")}
            >
              Explore Services
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full px-8"
              onClick={() => scrollToSection("portfolio")}
            >
              View Portfolio
            </Button>
          </div>
        </div>

        <div className="lg:w-1/2 h-[400px] lg:h-[500px] w-full mt-8 lg:mt-0 relative">
          <div className="w-full h-full">
            <div className={`wds-container ${styles['mobile-wds-container']}`} style={{ position: 'absolute', top: isMobile ? '25%' : '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '200px' }}>
              <ThreeDAnimation />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#about" className="text-muted-foreground hover:text-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
