
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the plugin
gsap.registerPlugin(ScrollTrigger);

const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const text = textRef.current;
    
    if (section && heading && text) {
      gsap.fromTo(
        heading,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
      
      gsap.fromTo(
        text,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.2,
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            toggleActions: "play none none none"
          }
        }
      );
    }
  }, []);

  return (
    <section 
      id="about"
      ref={sectionRef} 
      className="py-20 lg:py-28 bg-secondary/40 dark:bg-secondary/20"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 
            ref={headingRef}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            About Us
          </h2>
          <div ref={textRef} className="space-y-4 text-muted-foreground">
            <p>
              At Web Design Studio, we specialize in crafting stunning, responsive websites that not only look great but perform seamlessly across all devices. Based in Andhra Pradesh, India, our mission is to create digital experiences that inspire and deliver real results.
            </p>
            <p>
              From intuitive web design and e-commerce integration to impactful graphic design and branding, we offer comprehensive services tailored to meet the unique needs of each client. With a streamlined process—from initial consultation and concept development to quality assurance and ongoing support—we ensure every project is delivered with precision and creativity.
            </p>
            <p>
              Whether you're a small business or an online store, our affordable pricing packages and dedicated team make building your online presence simple, effective, and engaging.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
