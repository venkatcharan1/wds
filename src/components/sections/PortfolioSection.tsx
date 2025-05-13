
import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface PortfolioItemProps {
  index: number;
  title: string;
  category: string;
  imageSrc: string;
}

const PortfolioItem: React.FC<PortfolioItemProps> = ({ 
  index, 
  title, 
  category, 
  imageSrc 
}) => {
  const itemRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const item = itemRef.current;
    
    if (item) {
      // Parallax effect on scroll
      ScrollTrigger.create({
        trigger: item,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.to(item.querySelector('img'), {
            y: progress * 50,
            duration: 0.1,
            ease: "none"
          });
        }
      });
    }
  }, []);

  return (
    <div 
      ref={itemRef} 
      className="group relative overflow-hidden rounded-xl parallax-container"
    >
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center flex-col p-6 transition-opacity duration-300 z-10">
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-white/80 mb-4">{category}</p>
        <Button size="sm" variant="outline" className="text-white border-white hover:bg-white hover:text-black transition-colors">
          View Project
        </Button>
      </div>
      <img 
        src={imageSrc} 
        alt={title} 
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 parallax-item"
      />
    </div>
  );
};

const PortfolioSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const portfolioGridRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const portfolioGrid = portfolioGridRef.current;
    
    if (section && heading && portfolioGrid) {
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
        portfolioGrid.children,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          scrollTrigger: {
            trigger: portfolioGrid,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
    }
  }, []);

  const portfolioItems = [
    {
      title: "Eco Commerce Platform",
      category: "E-Commerce Design",
      imageSrc: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Mountain Travel App",
      category: "Mobile App Design",
      imageSrc: "https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Creative Agency Website",
      category: "Web Design",
      imageSrc: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Tech Blog Platform",
      category: "Web Development",
      imageSrc: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Fashion Brand Identity",
      category: "Branding",
      imageSrc: "https://images.unsplash.com/photo-1493397212122-2b85dda8106b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Forest Conservation Portal",
      category: "Web Development",
      imageSrc: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <section 
      id="portfolio"
      ref={sectionRef} 
      className="py-20 lg:py-28 bg-secondary/40 dark:bg-secondary/20"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 
            ref={headingRef}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Our Recent Projects
          </h2>
          <p className="text-muted-foreground">
            Explore our latest work showcasing the diversity of our skills and the quality of our execution.
          </p>
        </div>
        
        <div 
          ref={portfolioGridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {portfolioItems.map((item, index) => (
            <PortfolioItem
              key={index}
              index={index}
              title={item.title}
              category={item.category}
              imageSrc={item.imageSrc}
            />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="rounded-full px-8">
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
