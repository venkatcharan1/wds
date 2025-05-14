
import React, { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, MessageCircle, MapPin } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the plugin
gsap.registerPlugin(ScrollTrigger);

interface ContactCardProps {
  icon: React.ReactNode;
  title: string;
  details: string;
  link?: string;
}

const ContactCard: React.FC<ContactCardProps> = ({ icon, title, details, link }) => {
  return (
    <Card className="border-primary/10 bg-background shadow-md h-full">
      <CardContent className="p-6 flex flex-col items-center text-center">
        <div className="text-primary p-3 bg-primary/10 rounded-full mb-4">
          {icon}
        </div>
        <h3 className="font-medium mb-2">{title}</h3>
        {link ? (
          <a href={link} className="text-muted-foreground hover:text-primary transition-colors">
            {details}
          </a>
        ) : (
          <p className="text-muted-foreground">{details}</p>
        )}
      </CardContent>
    </Card>
  );
};

const ContactSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const cards = cardsRef.current;
    const form = formRef.current;
    
    if (section && heading && cards && form) {
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
          stagger: 0.15,
          scrollTrigger: {
            trigger: cards,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
      
      gsap.fromTo(
        form,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.2,
          scrollTrigger: {
            trigger: form,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
    }
  }, []);

  return (
    <section 
      id="contact"
      ref={sectionRef} 
      className="py-20 lg:py-28"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 
            ref={headingRef}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Get In Touch
          </h2>
          <p className="text-muted-foreground">
            Have a project in mind? We'd love to discuss how we can help bring your vision to life.
          </p>
        </div>
        
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          <ContactCard
            icon={<Mail className="h-6 w-6" />}
            title="Email Us"
            details="telugumobilecoder@gmail.com"
            link="mailto:telugumobilecoder@gmail.com"
          />
          <ContactCard
            icon={<MessageCircle className="h-6 w-6" />}
            title="WhatsApp Us"
            details="+91 6302158556"
            link="https://wa.me/+916302158556"
          />
          <ContactCard
            icon={<MapPin className="h-6 w-6" />}
            title="Visit Us"
            details="Andhra Pradesh, India"
          />
        </div>
        
        <div className="max-w-4xl mx-auto" ref={formRef}>
          <div className="visme_d" data-title="my portfolio" data-url="eprgzg7x-my-portfolio" data-domain="forms" data-full-page="false" data-min-height="500px" data-form-id="65786"></div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
