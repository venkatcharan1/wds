
import React, { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, ShoppingBag, Palette } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay?: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    
    if (card) {
      // Tilt effect on mouse move
      card.addEventListener("mousemove", (e) => {
        const { left, top, width, height } = card.getBoundingClientRect();
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;
        
        // Calculate rotation based on mouse position
        const tiltX = (y - 0.5) * 10; // Max 5 degree tilt
        const tiltY = (0.5 - x) * 10; // Max 5 degree tilt
        
        gsap.to(card, {
          rotationX: tiltX,
          rotationY: tiltY,
          transformPerspective: 1000,
          duration: 0.4,
          ease: "power2.out"
        });
      });
      
      // Reset on mouse leave
      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          rotationX: 0,
          rotationY: 0,
          duration: 0.7,
          ease: "elastic.out(1, 0.5)"
        });
      });
    }
  }, []);

  return (
    <Card 
      ref={cardRef} 
      className="bg-card-gradient glass-card border-primary/10 overflow-hidden h-full transition-transform duration-300 hover:translate-y-[-5px]"
    >
      <CardContent className="p-8 h-full flex flex-col">
        <div className="bg-primary/10 p-4 rounded-2xl w-fit mb-6">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-4">{title}</h3>
        <p className="text-muted-foreground mb-6 flex-grow">{description}</p>
        <Button variant="ghost" className="group justify-start p-0">
          Learn more 
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </CardContent>
    </Card>
  );
};

const ServicesSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const cards = cardsRef.current;
    
    if (section && heading && cards) {
      gsap.fromTo(
        heading,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            toggleActions: "play none none none"
          }
        }
      );
      
      gsap.fromTo(
        cards.children,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: cards,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
    }
  }, []);

  return (
    <section 
      id="services"
      ref={sectionRef} 
      className="py-20 lg:py-28"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 
            ref={headingRef}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            What We Offer
          </h2>
          <p className="text-muted-foreground">
            We provide comprehensive digital solutions tailored to your unique business needs, from stunning websites to complete branding packages.
          </p>
        </div>
        
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <ServiceCard
            icon={<Code className="h-8 w-8 text-primary" />}
            title="Responsive Web Design"
            description="We create custom, mobile-first websites that look stunning and function flawlessly across all devices and browsers."
          />
          <ServiceCard
            icon={<ShoppingBag className="h-8 w-8 text-primary" />}
            title="E-Commerce Integration"
            description="Transform your online presence into a powerful sales channel with our custom e-commerce solutions and payment gateways."
          />
          <ServiceCard
            icon={<Palette className="h-8 w-8 text-primary" />}
            title="Graphic Design & Branding"
            description="Establish a cohesive brand identity with our comprehensive branding services, from logos to complete brand guidelines."
          />
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
