
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Accessibility, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const AccessibilityMenu: React.FC = () => {
  const [fontSize, setFontSize] = useState(100);
  const [highContrast, setHighContrast] = useState(false);
  const [dyslexicFont, setDyslexicFont] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const { toast } = useToast();

  const handleFontSizeChange = (value: number[]) => {
    setFontSize(value[0]);
    document.documentElement.style.fontSize = `${value[0]}%`;
    toast({
      title: "Font size updated",
      description: `Text size set to ${value[0]}%`,
    });
  };

  const handleHighContrastChange = (checked: boolean) => {
    setHighContrast(checked);
    if (checked) {
      document.documentElement.classList.add("high-contrast");
      toast({
        title: "High contrast mode enabled",
        description: "The display now has increased contrast for better visibility",
      });
    } else {
      document.documentElement.classList.remove("high-contrast");
      toast({
        title: "High contrast mode disabled",
        description: "Display returned to normal contrast",
      });
    }
  };

  const handleDyslexicFontChange = (checked: boolean) => {
    setDyslexicFont(checked);
    if (checked) {
      document.documentElement.classList.add("dyslexic-font");
      toast({
        title: "Dyslexia-friendly font enabled",
        description: "Using a font that's easier to read for people with dyslexia",
      });
    } else {
      document.documentElement.classList.remove("dyslexic-font");
      toast({
        title: "Dyslexia-friendly font disabled",
        description: "Reverted to default font",
      });
    }
  };

  const handleReducedMotionChange = (checked: boolean) => {
    setReducedMotion(checked);
    if (checked) {
      document.documentElement.classList.add("reduced-motion");
      toast({
        title: "Reduced motion enabled",
        description: "Animations have been minimized for better accessibility",
      });
    } else {
      document.documentElement.classList.remove("reduced-motion");
      toast({
        title: "Reduced motion disabled",
        description: "Animations restored to normal",
      });
    }
  };

  const activateScreenReader = () => {
    toast({
      title: "Screen reader instructions",
      description: "Press Alt+T to enable your device's screen reader (instructions will vary by operating system)",
      duration: 5000,
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Accessibility options">
          <Accessibility size={20} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Accessibility Options</h3>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="font-size">Text Size: {fontSize}%</Label>
            </div>
            <Slider
              id="font-size"
              min={75}
              max={200}
              step={25}
              defaultValue={[100]}
              onValueChange={handleFontSizeChange}
              aria-label="Adjust text size"
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="high-contrast">High Contrast</Label>
            <Switch
              id="high-contrast"
              checked={highContrast}
              onCheckedChange={handleHighContrastChange}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="dyslexic-font">Dyslexia-friendly Font</Label>
            <Switch
              id="dyslexic-font"
              checked={dyslexicFont}
              onCheckedChange={handleDyslexicFontChange}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="reduced-motion">Reduced Motion</Label>
            <Switch
              id="reduced-motion"
              checked={reducedMotion}
              onCheckedChange={handleReducedMotionChange}
            />
          </div>

          <Button variant="outline" className="w-full" onClick={activateScreenReader}>
            Screen Reader Instructions
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
