
import React, { useState } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Sidebar } from "./Sidebar";
import { BellIcon, Home, MapPinIcon, Search, Settings, MessageSquare, FileText, Calendar } from "lucide-react";
import { LanguageSelector } from "../LanguageSelector";
import { ThemeToggle } from "../ThemeToggle";
import { AccessibilityMenu } from "../AccessibilityMenu";
import { Button } from "@/components/ui/button";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar 
        open={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        links={[
          { label: "Home", icon: <Home size={18} />, href: "/" },
          { label: "Map", icon: <MapPinIcon size={18} />, href: "/map" },
          { label: "Report Issue", icon: <MessageSquare size={18} />, href: "/report" },
          { label: "Transparency", icon: <FileText size={18} />, href: "/transparency" },
          { label: "Community", icon: <Calendar size={18} />, href: "/community" },
          { label: "Search", icon: <Search size={18} />, href: "/search" },
          { label: "Settings", icon: <Settings size={18} />, href: "/settings" },
        ]}
      />
      
      <div className="flex flex-col flex-1 w-full">
        <Navbar onMenuClick={() => setSidebarOpen(true)}>
          <div className="flex items-center space-x-2">
            <LanguageSelector />
            <ThemeToggle />
            <AccessibilityMenu />
            <Button variant="ghost" size="icon" className="relative">
              <BellIcon size={20} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-bulafix-yellow rounded-full"></span>
            </Button>
          </div>
        </Navbar>
        
        <main className="flex-1 px-4 py-6 md:px-6 lg:px-8">
          {children}
        </main>
        
        <Footer />
      </div>
    </div>
  );
};
