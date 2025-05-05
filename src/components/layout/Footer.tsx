
import React from "react";
import { Link } from "react-router-dom";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t bg-background/95 backdrop-blur">
      <div className="container flex flex-col md:flex-row items-center justify-between px-4 py-6 md:px-6">
        <div className="flex flex-col items-center md:items-start mb-4 md:mb-0">
          <Link to="/" className="flex items-center gap-2 mb-2">
            <div className="relative h-6 w-6 overflow-hidden rounded-full bg-bulafix-terracotta flex items-center justify-center">
              <span className="text-white font-bold text-xs">BF</span>
            </div>
            <span className="font-bold text-md">
              <span className="text-bulafix-terracotta">Bula</span>
              <span className="text-bulafix-teal">Fix</span>
            </span>
          </Link>
          <p className="text-xs text-muted-foreground text-center md:text-left">
            Empowering citizens to improve Bulawayo's services.
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-8 text-center md:text-left">
          <div className="flex flex-col gap-1">
            <h4 className="text-sm font-semibold mb-1">Platform</h4>
            <Link to="/about" className="text-xs text-muted-foreground hover:text-foreground">About</Link>
            <Link to="/how-it-works" className="text-xs text-muted-foreground hover:text-foreground">How it Works</Link>
            <Link to="/faqs" className="text-xs text-muted-foreground hover:text-foreground">FAQs</Link>
          </div>
          
          <div className="flex flex-col gap-1">
            <h4 className="text-sm font-semibold mb-1">Resources</h4>
            <Link to="/help" className="text-xs text-muted-foreground hover:text-foreground">Help Center</Link>
            <Link to="/guidelines" className="text-xs text-muted-foreground hover:text-foreground">Guidelines</Link>
            <Link to="/tutorials" className="text-xs text-muted-foreground hover:text-foreground">Tutorials</Link>
          </div>
          
          <div className="flex flex-col gap-1">
            <h4 className="text-sm font-semibold mb-1">Legal</h4>
            <Link to="/privacy" className="text-xs text-muted-foreground hover:text-foreground">Privacy</Link>
            <Link to="/terms" className="text-xs text-muted-foreground hover:text-foreground">Terms</Link>
            <Link to="/data-policy" className="text-xs text-muted-foreground hover:text-foreground">Data Policy</Link>
          </div>
          
          <div className="flex flex-col gap-1">
            <h4 className="text-sm font-semibold mb-1">Connect</h4>
            <a href="mailto:info@bulafix.org" className="text-xs text-muted-foreground hover:text-foreground">Contact</a>
            <a href="https://twitter.com/bulafixzw" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-foreground">Twitter</a>
            <a href="https://facebook.com/bulafixzw" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-foreground">Facebook</a>
          </div>
        </div>
      </div>
      
      <div className="container border-t">
        <div className="py-3 px-4 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} BulaFix. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
