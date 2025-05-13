
import React, { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  MessageSquare, 
  Lightbulb, 
  PenTool, 
  Laptop, 
  CheckCircle, 
  HeartHandshake 
} from "lucide-react";

// Register the plugin
gsap.registerPlugin(ScrollTrigger);

interface ProcessStepProps {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const ProcessStep: React.FC<ProcessStepProps> = ({ 
  number, 
  title, 
  description, 
  icon 
}) => {
  return (
    <Card className="border border-primary/10 dark:border-primary/30 bg-background relative overflow-hidden">
      <div className="absolute -right-5 -top-5 w-20 h-20 bg-primary/10 rounded-full"></div>
      <CardContent className="p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-start">
        <div className="bg-primary/10 dark:bg-primary/20 p-4 rounded-full text-primary">
          {icon}
        </div>
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl font-bold text-primary/20 dark:text-primary/40">{number}</span>
            <h3 className="text-xl font-bold">{title}</h3>
          </div>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

const ProcessSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const timeline = timelineRef.current;
    
    if (section && heading && timeline) {
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
        timeline.children,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: timeline,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
    }
  }, []);

  const processSteps = [
    {
      number: "01",
      title: "Initial Consultation",
      description: "We start by understanding your business, goals, and target audience to align our approach with your vision.",
      icon: <MessageSquare className="h-6 w-6" />
    },
    {
      number: "02",
      title: "Concept Development",
      description: "Our team creates detailed wireframes and prototypes based on research and your requirements.",
      icon: <Lightbulb className="h-6 w-6" />
    },
    {
      number: "03",
      title: "Design & Development",
      description: "We transform concepts into visually stunning designs and functional code with attention to detail.",
      icon: <PenTool className="h-6 w-6" />
    },
    {
      number: "04",
      title: "Feedback & Revisions",
      description: "We collaborate closely with you, incorporating your feedback until the design meets your expectations.",
      icon: <Laptop className="h-6 w-6" />
    },
    {
      number: "05",
      title: "Quality Assurance",
      description: "Rigorous testing across devices and browsers ensures your website functions flawlessly.",
      icon: <CheckCircle className="h-6 w-6" />
    },
    {
      number: "06",
      title: "Ongoing Support",
      description: "Our relationship continues after launch with maintenance, updates, and support as your business grows.",
      icon: <HeartHandshake className="h-6 w-6" />
    }
  ];

  return (
    <section 
      id="process"
      ref={sectionRef} 
      className="py-20 lg:py-28"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 
            ref={headingRef}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Our Work Process
          </h2>
          <p className="text-muted-foreground">
            We follow a proven methodology that ensures quality results and client satisfaction at every step.
          </p>
        </div>
        
        <div 
          ref={timelineRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 relative"
        >
          {/* Timeline connector */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-primary/20 -translate-x-1/2"></div>
          
          {processSteps.map((step, index) => (
            <div 
              key={index} 
              className={`${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12 md:translate-y-24'}`}
            >
              <ProcessStep
                number={step.number}
                title={step.title}
                description={step.description}
                icon={step.icon}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
