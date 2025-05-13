import React, { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, MessageCircle } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the plugin
gsap.registerPlugin(ScrollTrigger);

interface PricingFeature {
  text: string;
  included: boolean;
}

interface PricingPlanProps {
  title: string;
  price: string;
  description: string;
  features: PricingFeature[];
  popular?: boolean;
  buttonText?: string;
}

const PricingPlan: React.FC<PricingPlanProps> = ({
  title,
  price,
  description,
  features,
  popular = false,
  buttonText = "Get Started"
}) => {
  return (
    <Card 
      className={`border shadow-lg h-full transition-transform duration-300 hover:translate-y-[-5px] ${
        popular 
          ? 'border-primary relative overflow-hidden' 
          : 'border-border'
      }`}
    >
      {popular && (
        <div className="absolute top-0 right-0">
          <div className="bg-primary text-primary-foreground font-medium py-1 px-4 text-sm rounded-bl-lg">
            Popular
          </div>
        </div>
      )}
      
      <CardHeader className="pb-4">
        <CardTitle className="text-xl">{title}</CardTitle>
        <div className="mt-4 flex items-baseline text-5xl font-extrabold">
          {price}
        </div>
        <CardDescription className="mt-4">
          {description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <span className={`mr-2 mt-1 ${feature.included ? 'text-primary' : 'text-muted-foreground'}`}>
                <Check className="h-5 w-5" />
              </span>
              <span className={`${!feature.included && 'text-muted-foreground'}`}>
                {feature.text}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
      
      <CardFooter>
        <a href="https://wa.me/+916302158556" className="w-full">
          <Button variant={popular ? "default" : "outline"} className="w-full">
            <MessageCircle className="mr-2 h-4 w-4" />
            {buttonText}
          </Button>
        </a>
      </CardFooter>
    </Card>
  );
};

const PricingSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const plansRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const tabs = tabsRef.current;
    const plans = plansRef.current;
    
    if (section && heading && tabs && plans) {
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
        tabs,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.2,
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            toggleActions: "play none none none"
          }
        }
      );
      
      gsap.fromTo(
        plans.children,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: plans,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
    }
  }, []);

  const websitePlans = [
    {
      title: "Basic",
      price: "₹4000",
      description: "Perfect for small businesses just getting started with an online presence.",
      features: [
        { text: "3 Custom Pages", included: true },
        { text: "Responsive Design", included: true },
        { text: "Contact Form", included: true },
        { text: "1 Revision", included: true },
        { text: "Basic SEO Setup", included: true },
        { text: "Social Media Integration", included: false },
        { text: "Content Management System", included: false },
        { text: "Custom Animations", included: false }
      ]
    },
    {
      title: "Standard",
      price: "₹5000",
      description: "Our most popular plan, ideal for established businesses looking to grow.",
      features: [
        { text: "5 Custom Pages", included: true },
        { text: "Responsive Design", included: true },
        { text: "Contact Form", included: true },
        { text: "3 Revisions", included: true },
        { text: "Advanced SEO Setup", included: true },
        { text: "Social Media Integration", included: true },
        { text: "Content Management System", included: true },
        { text: "Custom Animations", included: false }
      ],
      popular: true
    },
    {
      title: "Premium",
      price: "₹6000",
      description: "For businesses seeking a comprehensive digital presence with all features.",
      features: [
        { text: "10 Custom Pages", included: true },
        { text: "Responsive Design", included: true },
        { text: "Contact Form", included: true },
        { text: "Unlimited Revisions", included: true },
        { text: "Advanced SEO Setup", included: true },
        { text: "Social Media Integration", included: true },
        { text: "Content Management System", included: true },
        { text: "Custom Animations", included: true }
      ]
    }
  ];

  const ecommercePlans = [
    {
      title: "Basic E-Commerce",
      price: "₹6000",
      description: "Start selling online with a straightforward e-commerce website.",
      features: [
        { text: "Up to 20 Products", included: true },
        { text: "Responsive Design", included: true },
        { text: "Basic Payment Gateway", included: true },
        { text: "Product Categories", included: true },
        { text: "Order Management", included: true },
        { text: "Customer Accounts", included: false },
        { text: "Inventory Management", included: false },
        { text: "Marketing Integrations", included: false }
      ]
    },
    {
      title: "Standard E-Commerce",
      price: "₹7000",
      description: "Grow your online store with enhanced features and capabilities.",
      features: [
        { text: "Up to 100 Products", included: true },
        { text: "Responsive Design", included: true },
        { text: "Multiple Payment Gateways", included: true },
        { text: "Advanced Product Categories", included: true },
        { text: "Order Management", included: true },
        { text: "Customer Accounts", included: true },
        { text: "Inventory Management", included: true },
        { text: "Marketing Integrations", included: false }
      ],
      popular: true
    },
    {
      title: "Premium E-Commerce",
      price: "₹8000",
      description: "Enterprise-level online store with all features for maximum growth.",
      features: [
        { text: "Unlimited Products", included: true },
        { text: "Responsive Design", included: true },
        { text: "Multiple Payment Gateways", included: true },
        { text: "Advanced Product Categories", included: true },
        { text: "Order Management", included: true },
        { text: "Customer Accounts", included: true },
        { text: "Inventory Management", included: true },
        { text: "Marketing Integrations", included: true }
      ]
    }
  ];

  return (
    <section 
      id="pricing"
      ref={sectionRef} 
      className="py-20 lg:py-28 bg-secondary/40 dark:bg-secondary/20"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 
            ref={headingRef}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Our Pricing
          </h2>
          <p className="text-muted-foreground">
            Choose the perfect package for your business needs. All plans include ongoing support and maintenance.
          </p>
        </div>
        
        <Tabs defaultValue="website" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="website">Small Business Website</TabsTrigger>
              <TabsTrigger value="ecommerce">E-Commerce Store</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="website">
            <div 
              ref={plansRef}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {websitePlans.map((plan, index) => (
                <PricingPlan
                  key={index}
                  title={plan.title}
                  price={plan.price}
                  description={plan.description}
                  features={plan.features}
                  popular={plan.popular}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="ecommerce">
            <div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {ecommercePlans.map((plan, index) => (
                <PricingPlan
                  key={index}
                  title={plan.title}
                  price={plan.price}
                  description={plan.description}
                  features={plan.features}
                  popular={plan.popular}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Need a custom solution for your specific requirements?
          </p>
          <a href="https://wa.me/+916302158556">
            <Button size="lg" className="rounded-full px-8">
              <MessageCircle className="mr-2 h-5 w-5" />
              Contact Us for Custom Quote
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
