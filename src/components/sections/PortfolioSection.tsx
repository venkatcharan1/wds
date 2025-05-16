
import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the plugin
gsap.registerPlugin(ScrollTrigger);

interface PortfolioItemProps {
  index: number;
  title: string;
  projectLink: string;
  imageSrc: string;
}

const PortfolioItem: React.FC<PortfolioItemProps> = ({ 
  index, 
  title, 
  projectLink, 
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
        <Button 
          size="sm" 
          variant="outline" 
          className="text-white border-white hover:bg-white hover:text-black transition-colors"
          onClick={() => window.open(projectLink, '_blank')}
        >
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
      title: "onetooly",
      imageSrc: "https://res.cloudinary.com/dsgdashea/image/upload/v1747316458/Screenshot_2025-05-15_190658_l3fknm.png",
      projectLink: "https://onetooly.in/"
    },
    {
      title: "studentpep",
      imageSrc: "https://res.cloudinary.com/dsgdashea/image/upload/v1747316457/Screenshot_2025-05-15_190756_qta9zl.png",
      projectLink: "https://studentpep.netlify.app/"
    },
    {
      title: "resumewithv",
      imageSrc: "https://res.cloudinary.com/dsgdashea/image/upload/v1747316457/Screenshot_2025-05-15_190836_hbnhjd.png",
      projectLink: "https://resumewithv.netlify.app/"
    },
    {
      title: "samhithadegreecollege",
      imageSrc: "https://res.cloudinary.com/dsgdashea/image/upload/v1747316458/Screenshot_2025-05-15_190928_fbykrb.png",
      projectLink: "https://samhithadegreecollege.netlify.app/"
    },
    {
      title: "srilakshmiganapthi",
      imageSrc: "https://res.cloudinary.com/dsgdashea/image/upload/v1747316458/Screenshot_2025-05-15_191006_xzfeyw.png",
      projectLink: "https://srilakshmiganapathiaalayam.org/"
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
            Sample Projects
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
              projectLink={item.projectLink}
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
