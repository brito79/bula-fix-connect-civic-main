
import React, { useState, useEffect } from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Accessibility } from "lucide-react";

export const AccessibilityAlert: React.FC = () => {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    // Only show the alert if it's the user's first visit
    const hasSeenAlert = localStorage.getItem("accessibility-alert-seen");
    if (!hasSeenAlert) {
      setShowAlert(true);
    }
  }, []);

  const handleDismiss = () => {
    setShowAlert(false);
    localStorage.setItem("accessibility-alert-seen", "true");
  };

  if (!showAlert) return null;

  return (
    <Alert className="mb-4 border-bulafix-teal">
      <Accessibility className="h-4 w-4" />
      <AlertTitle>Accessibility Features Available</AlertTitle>
      <AlertDescription className="flex flex-col gap-2">
        <p>
          BulaFix offers accessibility options including text resizing, high contrast mode, 
          dyslexia-friendly fonts, and reduced motion. Click the accessibility icon in the navigation bar to customize your experience.
        </p>
        <div className="flex justify-end">
          <Button variant="outline" size="sm" onClick={handleDismiss}>
            Got it
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
};
