
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

interface NavbarProps {
  onMenuClick: () => void;
  children?: React.ReactNode;
}

export const Navbar: React.FC<NavbarProps> = ({ onMenuClick, children }) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden" 
            onClick={onMenuClick}
            aria-label="Open menu"
          >
            <Menu size={20} />
          </Button>
          
          <Link to="/" className="flex items-center gap-2">
            <div className="relative h-8 w-8 overflow-hidden rounded-full bg-bulafix-terracotta flex items-center justify-center">
              <span className="text-white font-bold">BF</span>
            </div>
            <span className="hidden font-bold text-xl md:inline-block">
              <span className="text-bulafix-terracotta">Bula</span>
              <span className="text-bulafix-teal">Fix</span>
            </span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-5">
          <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">
            Home
          </Link>
          <Link to="/map" className="text-sm font-medium transition-colors hover:text-primary">
            Map
          </Link>
          <Link to="/report" className="text-sm font-medium transition-colors hover:text-primary">
            Report Issue
          </Link>
          <Link to="/transparency" className="text-sm font-medium transition-colors hover:text-primary">
            Transparency
          </Link>
          <Link to="/community" className="text-sm font-medium transition-colors hover:text-primary">
            Community
          </Link>
        </nav>
        
        <div className="flex items-center gap-2">
          {children}
        </div>
      </div>
    </header>
  );
};
