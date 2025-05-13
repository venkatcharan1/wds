
import React, { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, onClick }) => (
  <a
    href={href}
    onClick={onClick}
    className="text-foreground hover:text-primary transition-colors duration-300 px-4 py-2"
  >
    {children}
  </a>
);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-4 bg-background/80 backdrop-blur-lg shadow-md"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <a href="#" className="flex items-center">
          <span className="text-foreground font-poppins font-bold text-xl">
            DigiCraft<span className="text-primary">Studios</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <NavLink href="#home" onClick={() => scrollToSection("home")}>
            Home
          </NavLink>
          <NavLink href="#about" onClick={() => scrollToSection("about")}>
            About
          </NavLink>
          <NavLink href="#services" onClick={() => scrollToSection("services")}>
            Our Services
          </NavLink>
          <NavLink href="#pricing" onClick={() => scrollToSection("pricing")}>
            Pricing
          </NavLink>
          <NavLink href="#contact" onClick={() => scrollToSection("contact")}>
            Contact Us
          </NavLink>
        </nav>

        <div className="flex items-center space-x-2">
          <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Search className="h-5 w-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Search</DialogTitle>
              </DialogHeader>
              <div className="flex items-center space-x-2 mt-4">
                <div className="grid flex-1 gap-2">
                  <Input
                    type="text"
                    placeholder="Search for anything..."
                    className="h-12"
                    autoFocus
                  />
                </div>
                <Button type="submit">Search</Button>
              </div>
            </DialogContent>
          </Dialog>

          <ThemeToggle />

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col mt-10 space-y-4">
                <NavLink href="#home" onClick={() => scrollToSection("home")}>
                  Home
                </NavLink>
                <NavLink href="#about" onClick={() => scrollToSection("about")}>
                  About
                </NavLink>
                <NavLink href="#services" onClick={() => scrollToSection("services")}>
                  Our Services
                </NavLink>
                <NavLink href="#pricing" onClick={() => scrollToSection("pricing")}>
                  Pricing
                </NavLink>
                <NavLink href="#contact" onClick={() => scrollToSection("contact")}>
                  Contact Us
                </NavLink>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
