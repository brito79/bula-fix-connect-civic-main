
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MainLayout } from "@/components/layout/MainLayout";
import { MapPin } from "lucide-react";

const NotFound: React.FC = () => {
  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
        <div className="mb-6 relative">
          <div className="w-24 h-24 rounded-full bg-bulafix-terracotta/20 flex items-center justify-center">
            <MapPin size={48} className="text-bulafix-terracotta" />
          </div>
          <div className="absolute top-0 right-0 w-8 h-8 rounded-full bg-bulafix-teal/20 flex items-center justify-center -mr-1">
            <span className="text-bulafix-teal font-bold">?</span>
          </div>
        </div>
        
        <h1 className="text-4xl font-bold mb-2">Page Not Found</h1>
        
        <p className="text-muted-foreground max-w-md mb-8">
          We couldn't locate the page you're looking for. It may have been moved or doesn't exist.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Button asChild>
            <Link to="/">Return to Home</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/map">View Report Map</Link>
          </Button>
        </div>
        
        <div className="mt-12 p-6 bg-muted rounded-lg max-w-lg mx-auto">
          <h2 className="font-semibold mb-2">Looking to report an issue?</h2>
          <p className="text-sm text-muted-foreground mb-4">
            You can easily report municipal service problems like water leaks, potholes, and more through our platform.
          </p>
          <Button asChild variant="outline">
            <Link to="/report">Report a Problem</Link>
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default NotFound;
