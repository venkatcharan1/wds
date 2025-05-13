
import React, { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
  const formRef = useRef<HTMLFormElement>(null);
  
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted");
  };

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
            icon={<Phone className="h-6 w-6" />}
            title="Call Us"
            details="+91 6302158556"
            link="tel:+916302158556"
          />
          <ContactCard
            icon={<MapPin className="h-6 w-6" />}
            title="Visit Us"
            details="Andhra Pradesh, India"
          />
        </div>
        
        <Card className="max-w-4xl mx-auto border-primary/10 overflow-hidden bg-card shadow-xl">
          <CardContent className="p-0">
            <div className="grid grid-cols-1 lg:grid-cols-5">
              <div className="lg:col-span-2 bg-primary p-8 text-primary-foreground flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-4">Let's start a conversation</h3>
                <p className="mb-6">Fill out the form and we'll get back to you within 24 hours.</p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5" />
                    <span>telugumobilecoder@gmail.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5" />
                    <span>+91 6302158556</span>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-3 p-8">
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Name
                      </label>
                      <Input id="name" placeholder="Your name" required />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <Input id="email" type="email" placeholder="Your email" required />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <Input id="subject" placeholder="Project inquiry" required />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <Textarea 
                      id="message" 
                      placeholder="Tell us about your project and requirements..." 
                      className="min-h-[150px]"
                      required
                    />
                  </div>
                  
                  <Button type="submit" size="lg" className="w-full">
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ContactSection;
