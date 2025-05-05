
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PhoneCall, Lock, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

export const HelplineCard = () => {
  const emergencyNumbers = [
    { label: "Police Emergency", number: "+263 292 2710", icon: <ShieldAlert size={16} /> },
    { label: "City Council Hotline", number: "+263 292 71290", icon: <Lock size={16} /> },
    { label: "BulaFix Support", number: "+263 77 1234567", icon: <PhoneCall size={16} /> }
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-xl">
          <PhoneCall className="text-bulafix-teal" size={20} />
          Emergency Helplines
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {emergencyNumbers.map((item, index) => (
            <div key={index} className="flex justify-between items-center border-b pb-2 last:border-0">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">{item.icon}</span>
                <span>{item.label}</span>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex items-center text-bulafix-terracotta hover:text-bulafix-terracotta/80 hover:bg-bulafix-terracotta/10 font-medium"
                onClick={() => window.location.href = `tel:${item.number.replace(/\s/g, '')}`}
              >
                {item.number}
                <PhoneCall size={14} className="ml-1" />
              </Button>
            </div>
          ))}
          <p className="text-xs text-muted-foreground mt-2">
            These helplines are available 24/7 for emergency situations. For non-emergencies, please use the report form.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
