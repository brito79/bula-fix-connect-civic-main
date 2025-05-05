
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Circle, MapPin, MessageCircle, CheckCircle, CircleX } from "lucide-react";
import { cn } from "@/lib/utils";

export type ReportStatus = "reported" | "acknowledged" | "in-progress" | "resolved" | "rejected";

export interface Report {
  id: string;
  title: string;
  location: string;
  category: string;
  status: ReportStatus;
  date: string;
  description: string;
  imageUrl?: string;
  verificationCount: number;
  commentCount: number;
}

interface ReportCardProps {
  report: Report;
  className?: string;
  onClick?: () => void;
}

export const ReportCard: React.FC<ReportCardProps> = ({
  report,
  className,
  onClick,
}) => {
  const getStatusColor = (status: ReportStatus) => {
    switch (status) {
      case "reported":
        return "bg-orange-500 text-white";
      case "acknowledged":
        return "bg-blue-500 text-white";
      case "in-progress":
        return "bg-yellow-500 text-white";
      case "resolved":
        return "bg-green-500 text-white";
      case "rejected":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getStatusIcon = (status: ReportStatus) => {
    switch (status) {
      case "reported":
        return <Circle size={14} />;
      case "acknowledged":
        return <Circle size={14} />;
      case "in-progress":
        return <Circle size={14} />;
      case "resolved":
        return <CheckCircle size={14} />;
      case "rejected":
        return <CircleX size={14} />;
      default:
        return <Circle size={14} />;
    }
  };

  const formatStatus = (status: ReportStatus) => {
    return status.charAt(0).toUpperCase() + status.slice(1).replace("-", " ");
  };

  // Function to determine if we should blur the image (e.g., if it might contain people)
  const shouldUseDefaultImage = (imageUrl: string) => {
    // Check if the image is from unsplash and contains a person
    return imageUrl.includes("photo-1584677626646-7c8f83690304");
  };

  // Filter or replace certain images with our specific uploaded images
  const getImageUrl = (report: Report) => {
    if (!report.imageUrl) return undefined;
    
    // Replace the water pipe image with our sewage pipe image
    if (shouldUseDefaultImage(report.imageUrl)) {
      return "/lovable-uploads/c7ea83ed-0925-4d7d-a716-fdc698972198.png";
    }
    
    return report.imageUrl;
  };

  return (
    <Card className={cn("overflow-hidden hover:shadow-md transition-shadow", className)} onClick={onClick}>
      {report.imageUrl && (
        <div className="relative h-48 w-full overflow-hidden">
          <img
            src={getImageUrl(report)}
            alt={report.title}
            className="h-full w-full object-cover transition-transform hover:scale-105"
          />
          <Badge
            className={cn(
              "absolute top-2 right-2",
              getStatusColor(report.status)
            )}
          >
            <span className="flex items-center gap-1">
              {getStatusIcon(report.status)}
              {formatStatus(report.status)}
            </span>
          </Badge>
        </div>
      )}
      <CardContent className={cn("p-4", !report.imageUrl && "pt-4")}>
        {!report.imageUrl && (
          <Badge
            className={cn(
              "mb-2 inline-flex",
              getStatusColor(report.status)
            )}
          >
            <span className="flex items-center gap-1">
              {getStatusIcon(report.status)}
              {formatStatus(report.status)}
            </span>
          </Badge>
        )}
        
        <Badge variant="outline" className="mb-2 mr-2">
          {report.category}
        </Badge>
        
        <h3 className="font-bold leading-tight mb-1">{report.title}</h3>
        
        <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
          <MapPin size={12} />
          <span>{report.location}</span>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2">
          {report.description}
        </p>
      </CardContent>
      
      <CardFooter className="flex justify-between p-4 pt-0 text-xs">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="flex items-center gap-1">
            <CheckCircle size={12} />
            {report.verificationCount} verified
          </Badge>
          
          <span className="flex items-center gap-1 text-muted-foreground">
            <MessageCircle size={12} />
            {report.commentCount}
          </span>
        </div>
        
        <span className="text-muted-foreground">{report.date}</span>
      </CardFooter>
    </Card>
  );
};
