import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { CircleCheck, Image, MapPin, Mic, CheckCircle, MessageSquare, Trash, CarFront, PhoneCall } from "lucide-react";
import { useData } from "@/context/DataContext";
import { AccessibilityAlert } from "@/components/AccessibilityAlert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { HelplineCard } from "@/components/HelplineCard";
import { SuggestionBox } from "@/components/SuggestionBox";

const ReportPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addReport } = useData();
  
  const [reportMethod, setReportMethod] = useState<string>("form");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [recording, setRecording] = useState(false);

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Simulate location detection
  const detectLocation = () => {
    setLoading(true);
    // Simulate geolocation API
    setTimeout(() => {
      setLocation("CBD, Bulawayo (auto-detected)");
      setLoading(false);
      toast({
        title: "Location Detected",
        description: "Your current location has been detected.",
      });
    }, 1500);
  };

  // Toggle voice recording
  const toggleRecording = () => {
    if (recording) {
      // Stop recording
      setRecording(false);
      toast({
        title: "Recording Saved",
        description: "Your voice recording has been attached to the report.",
      });
    } else {
      // Start recording
      setRecording(true);
      toast({
        title: "Recording Started",
        description: "Speak clearly to describe the issue you're reporting.",
      });
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !category || !location || !description) {
      toast({
        title: "Missing Information",
        description: "Please fill out all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    // Add report to data context
    addReport({
      title,
      location,
      category,
      description,
      status: "reported",
      imageUrl: imagePreview || undefined,
    });
    
    // Simulate API call delay
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Report Submitted",
        description: "Your report has been successfully submitted.",
      });
      navigate("/map");
    }, 1500);
  };

  // Quick report selection based on common issues
  const handleQuickReport = (issueType: string) => {
    setCategory(issueType);
    
    let defaultTitle = "";
    let defaultImage = "";
    
    switch (issueType) {
      case "Sanitation":
        defaultTitle = "Sewage Burst";
        defaultImage = "/lovable-uploads/c7ea83ed-0925-4d7d-a716-fdc698972198.png";
        setDescription("Sewage flowing into the road from a burst pipe.");
        break;
      case "Roads":
        defaultTitle = "Pothole";
        defaultImage = "/lovable-uploads/2cb3bbfe-a8e3-4a26-8ce1-471fc6665891.png";
        setDescription("Dangerous pothole damaging vehicles on the road.");
        break;
      default:
        return;
    }
    
    setTitle(defaultTitle);
    setImagePreview(defaultImage);
    toast({
      title: "Quick Report Selected",
      description: `Reporting ${defaultTitle.toLowerCase()}. You can add more details.`,
    });
  };

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto">
        <AccessibilityAlert />
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Report an Issue</h1>
          <p className="text-muted-foreground">
            Help improve Bulawayo by reporting issues with city services and infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="relative overflow-hidden rounded-lg border cursor-pointer group"
            onClick={() => handleQuickReport("Sanitation")}>
            <div className="h-36 overflow-hidden">
              <img 
                src="/lovable-uploads/c7ea83ed-0925-4d7d-a716-fdc698972198.png" 
                alt="Sewage issue" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
              <div className="flex items-center gap-2 text-white mb-1">
                <Trash size={16} />
                <span className="font-semibold">Report Sewage Issue</span>
              </div>
              <p className="text-xs text-white/80">Tap to report sewage problems</p>
            </div>
          </div>
          
          <div className="relative overflow-hidden rounded-lg border cursor-pointer group"
            onClick={() => handleQuickReport("Roads")}>
            <div className="h-36 overflow-hidden">
              <img 
                src="/lovable-uploads/2cb3bbfe-a8e3-4a26-8ce1-471fc6665891.png" 
                alt="Pothole issue" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
              <div className="flex items-center gap-2 text-white mb-1">
                <CarFront size={16} />
                <span className="font-semibold">Report Pothole</span>
              </div>
              <p className="text-xs text-white/80">Tap to report road damage</p>
            </div>
          </div>
          
          <div className="relative overflow-hidden rounded-lg border cursor-pointer group"
            onClick={() => window.location.href = 'tel:+2632992710'}>
            <div className="h-36 bg-bulafix-teal/10 flex items-center justify-center">
              <PhoneCall size={48} className="text-bulafix-teal" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
              <div className="flex items-center gap-2 text-white mb-1">
                <PhoneCall size={16} />
                <span className="font-semibold">Emergency Helpline</span>
              </div>
              <p className="text-xs text-white/80">Call for urgent assistance</p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg border shadow-sm p-6 mb-8">
          <Tabs defaultValue="form" onValueChange={setReportMethod}>
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="form" className="flex flex-col items-center py-3">
                <MessageSquare size={16} className="mb-1" />
                <span className="text-xs">Form</span>
              </TabsTrigger>
              <TabsTrigger value="photo" className="flex flex-col items-center py-3">
                <Image size={16} className="mb-1" />
                <span className="text-xs">Photo</span>
              </TabsTrigger>
              <TabsTrigger value="voice" className="flex flex-col items-center py-3">
                <Mic size={16} className="mb-1" />
                <span className="text-xs">Voice</span>
              </TabsTrigger>
              <TabsTrigger value="location" className="flex flex-col items-center py-3">
                <MapPin size={16} className="mb-1" />
                <span className="text-xs">Location</span>
              </TabsTrigger>
            </TabsList>

            <form onSubmit={handleSubmit}>
              <TabsContent value="form" className="space-y-4 mt-0">
                <div className="space-y-2">
                  <Label htmlFor="title">Issue Title</Label>
                  <Input
                    id="title"
                    placeholder="E.g., Burst Water Pipe, Pothole, Street Light Out"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Water">Water</SelectItem>
                      <SelectItem value="Roads">Roads</SelectItem>
                      <SelectItem value="Electricity">Electricity</SelectItem>
                      <SelectItem value="Sanitation">Sanitation</SelectItem>
                      <SelectItem value="Drainage">Drainage</SelectItem>
                      <SelectItem value="Public Spaces">Public Spaces</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="location">Location</Label>
                    <Button 
                      type="button"
                      variant="link" 
                      size="sm" 
                      className="h-auto p-0 text-xs"
                      onClick={detectLocation}
                      disabled={loading}
                    >
                      Detect My Location
                    </Button>
                  </div>
                  <Input
                    id="location"
                    placeholder="E.g., Main Street near City Hall, Nkulumane 12"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Please describe the issue in detail..."
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </TabsContent>

              <TabsContent value="photo" className="space-y-4 mt-0">
                <div className="border-2 border-dashed rounded-lg p-6 text-center">
                  {imagePreview ? (
                    <div className="space-y-4">
                      <img 
                        src={imagePreview} 
                        alt="Issue preview" 
                        className="mx-auto max-h-48 rounded-md" 
                      />
                      <Button 
                        type="button"
                        variant="outline" 
                        onClick={() => setImagePreview(null)}
                      >
                        Remove Image
                      </Button>
                    </div>
                  ) : (
                    <>
                      <Image size={48} className="mx-auto text-muted-foreground mb-4" />
                      <p className="mb-2 text-sm text-muted-foreground">
                        Take a photo or upload an image of the issue
                      </p>
                      <Input
                        id="photo"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                      <Label 
                        htmlFor="photo" 
                        className="inline-flex h-9 cursor-pointer items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
                      >
                        Upload Photo
                      </Label>
                    </>
                  )}
                </div>
                
                <p className="text-xs text-muted-foreground">
                  Photos help the authorities better understand and address the issue. Please ensure your photos clearly show the problem.
                </p>
              </TabsContent>

              <TabsContent value="voice" className="space-y-4 mt-0">
                <div className="border-2 border-dashed rounded-lg p-6 text-center">
                  <div className={`w-16 h-16 mx-auto rounded-full ${recording ? 'bg-red-500' : 'bg-bulafix-terracotta'} text-white flex items-center justify-center mb-4 ${recording ? 'voice-ripple' : ''}`}>
                    <Mic size={32} />
                  </div>
                  <p className="mb-4 text-sm text-muted-foreground">
                    {recording 
                      ? "Recording... Speak clearly about the issue" 
                      : "Use voice recording to describe the issue"
                    }
                  </p>
                  <Button 
                    type="button"
                    variant={recording ? "destructive" : "default"}
                    onClick={toggleRecording}
                  >
                    {recording ? "Stop Recording" : "Start Recording"}
                  </Button>
                </div>
                
                <p className="text-xs text-muted-foreground">
                  Voice recordings are helpful for those who find typing difficult or prefer to explain issues verbally.
                </p>
              </TabsContent>

              <TabsContent value="location" className="mt-0">
                <div className="rounded-lg overflow-hidden border mb-4">
                  <div className="bg-muted h-64 relative flex items-center justify-center ndebele-pattern">
                    <div className="absolute inset-0 bg-bulafix-teal/10 backdrop-blur-[2px]"></div>
                    <div className="absolute">
                      <MapPin size={48} className="text-bulafix-terracotta animate-pulse" />
                    </div>
                    <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm rounded-md px-3 py-2 text-sm border">
                      Tap to set location
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <Label htmlFor="location-manual">Or enter location manually</Label>
                  <Input
                    id="location-manual"
                    placeholder="E.g., Main Street near City Hall, Nkulumane 12"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                
                <Button 
                  type="button"
                  variant="outline" 
                  className="w-full mb-2"
                  onClick={detectLocation}
                  disabled={loading}
                >
                  <MapPin size={16} className="mr-2" />
                  Detect My Current Location
                </Button>
                
                <p className="text-xs text-muted-foreground">
                  Precise location information helps authorities find and fix the issue faster.
                </p>
              </TabsContent>

              <div className="border-t mt-6 pt-4">
                <div className="flex items-start mb-4">
                  <RadioGroup value={anonymous ? "yes" : "no"} onValueChange={(value) => setAnonymous(value === "yes")}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="not-anonymous" />
                      <Label htmlFor="not-anonymous">Submit with my contact details</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="anonymous" />
                      <Label htmlFor="anonymous">Submit anonymously</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Submitting..." : "Submit Report"}
                </Button>
                
                <p className="mt-4 text-xs text-muted-foreground text-center">
                  Your report will be sent to the relevant authorities and visible on the public map.
                  You'll be able to track its status and receive updates.
                </p>
              </div>
            </form>
          </Tabs>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <HelplineCard />
          <SuggestionBox />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-background rounded-lg border p-4">
            <CheckCircle size={24} className="text-bulafix-teal mb-2" />
            <h3 className="font-semibold mb-1">What happens next?</h3>
            <p className="text-sm text-muted-foreground">
              Your report will be reviewed and forwarded to the appropriate department for action.
            </p>
          </div>
          
          <div className="bg-background rounded-lg border p-4">
            <CheckCircle size={24} className="text-bulafix-yellow mb-2" />
            <h3 className="font-semibold mb-1">Report verification</h3>
            <p className="text-sm text-muted-foreground">
              Other residents can verify your report to increase its priority and credibility.
            </p>
          </div>
          
          <div className="bg-background rounded-lg border p-4">
            <CheckCircle size={24} className="text-bulafix-terracotta mb-2" />
            <h3 className="font-semibold mb-1">Status updates</h3>
            <p className="text-sm text-muted-foreground">
              You'll receive updates as your report moves through the workflow to resolution.
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ReportPage;
