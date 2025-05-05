
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ToggleLeft, ToggleRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const ThemeToggle: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user has a preference in localStorage
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      toast({
        title: "Light mode activated",
        description: "Switched to light mode for better daytime visibility",
      });
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      toast({
        title: "Dark mode activated",
        description: "Switched to dark mode for reduced eye strain",
      });
    }
    setDarkMode(!darkMode);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {darkMode ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}
      <span className="sr-only">{darkMode ? "Switch to light mode" : "Switch to dark mode"}</span>
    </Button>
  );
};
