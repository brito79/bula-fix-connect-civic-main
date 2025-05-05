
import React from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarLink {
  label: string;
  icon: React.ReactNode;
  href: string;
}

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  links: SidebarLink[];
}

export const Sidebar: React.FC<SidebarProps> = ({ open, onClose, links }) => {
  return (
    <>
      {/* Backdrop */}
      {open && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      
      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transform bg-sidebar transition-transform duration-300 ease-in-out md:translate-x-0 md:sticky md:top-0 md:h-screen",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between border-b px-4">
          <Link to="/" className="flex items-center gap-2" onClick={onClose}>
            <div className="relative h-8 w-8 overflow-hidden rounded-full bg-bulafix-terracotta flex items-center justify-center">
              <span className="text-white font-bold">BF</span>
            </div>
            <span className="font-bold text-xl">
              <span className="text-bulafix-terracotta">Bula</span>
              <span className="text-bulafix-teal">Fix</span>
            </span>
          </Link>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden" 
            onClick={onClose}
            aria-label="Close menu"
          >
            <X size={18} />
          </Button>
        </div>
        
        <nav className="flex flex-col gap-1 p-4">
          {links.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              onClick={onClose}
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>
        
        <div className="absolute bottom-4 left-4 right-4">
          <div className="ndebele-pattern rounded-md p-4 bg-sidebar-accent/50">
            <p className="text-xs font-medium">
              Making Bulawayo better, one report at a time.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
