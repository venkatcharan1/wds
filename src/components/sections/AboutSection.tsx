
import React, { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const text = textRef.current;
    const stats = statsRef.current;
    
    if (section && heading && text && stats) {
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
      
      gsap.fromTo(
        stats.children,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: stats,
            start: "top 85%",
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
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 
            ref={headingRef}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Crafting Digital Excellence Since 2015
          </h2>
          <div ref={textRef} className="space-y-4 text-muted-foreground">
            <p>
              At DigiCraft Studios, we're passionate about transforming visions into captivating digital realities. With a team of talented designers, developers, and strategists, we've helped hundreds of businesses achieve their digital goals.
            </p>
            <p>
              We believe great design is more than aesthetics – it's about creating meaningful experiences that engage, inspire, and deliver results. Our human-centered approach ensures every project is tailored to meet the unique needs of your audience.
            </p>
          </div>
        </div>
        
        <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard number="850+" label="Projects Completed" />
          <StatCard number="250+" label="Happy Clients" />
          <StatCard number="15+" label="Industry Awards" />
          <StatCard number="8+" label="Years Experience" />
        </div>
      </div>
    </section>
  );
};

interface StatCardProps {
  number: string;
  label: string;
}

const StatCard: React.FC<StatCardProps> = ({ number, label }) => {
  return (
    <Card className="glass-card border-2 border-primary/10 overflow-hidden">
      <CardContent className="p-6 text-center">
        <p className="text-4xl md:text-5xl font-bold text-primary mb-2">{number}</p>
        <p className="text-muted-foreground">{label}</p>
      </CardContent>
    </Card>
  );
};

export default AboutSection;
