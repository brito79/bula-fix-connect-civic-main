
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { MapPlaceholder } from "@/components/MapPlaceholder";
import { ReportCard } from "@/components/ReportCard";
import { StatsCard } from "@/components/StatsCard";
import { Button } from "@/components/ui/button";
import { 
  Check, 
  MessageSquare, 
  MapPin, 
  CheckCircle, 
  Circle, 
  Mic,
  Image
} from "lucide-react";
import { useData } from "@/context/DataContext";

const mockMapPins = [
  { id: "1", x: 35, y: 45, category: "Water", status: "in-progress" as const },
  { id: "2", x: 50, y: 55, category: "Roads", status: "reported" as const },
  { id: "3", x: 65, y: 40, category: "Electricity", status: "acknowledged" as const },
  { id: "4", x: 45, y: 65, category: "Sanitation", status: "resolved" as const },
  { id: "5", x: 58, y: 48, category: "Drainage", status: "reported" as const },
  { id: "6", x: 30, y: 60, category: "Public Spaces", status: "rejected" as const }
];

const Home: React.FC = () => {
  const { reports, stats } = useData();
  const [selectedPinId, setSelectedPinId] = useState<string | undefined>(undefined);

  // Handle pin click
  const handlePinClick = (id: string) => {
    setSelectedPinId(id === selectedPinId ? undefined : id);
  };

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-bulafix-terracotta to-bulafix-teal py-12 px-6 mb-8 text-white">
        <div className="absolute inset-0 ndebele-pattern opacity-10"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 animate-fade-in">
                Make Bulawayo Better Together
              </h1>
              <p className="text-lg md:text-xl opacity-90 mb-6 animate-fade-in">
                Report municipal issues, track their resolution, and help build a more responsive city.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start animate-fade-in">
                <Button asChild size="lg" className="bg-white text-bulafix-terracotta hover:bg-white/90">
                  <Link to="/report">Report a Problem</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="bg-transparent border-white hover:bg-white/10">
                  <Link to="/map">View Map</Link>
                </Button>
              </div>
            </div>
            <div className="hidden md:block animate-fade-in-left">
              <div className="relative">
                <div className="aspect-square bg-white/20 rounded-2xl backdrop-blur-sm p-6 transform rotate-3 shadow-xl">
                  <div className="flex gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-bulafix-terracotta"></div>
                    <div className="w-3 h-3 rounded-full bg-bulafix-yellow"></div>
                    <div className="w-3 h-3 rounded-full bg-bulafix-teal"></div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-6 w-2/3 bg-white/40 rounded-md"></div>
                    <div className="h-4 w-full bg-white/30 rounded-md"></div>
                    <div className="h-4 w-5/6 bg-white/30 rounded-md"></div>
                    <div className="h-10 w-full bg-white/40 rounded-md"></div>
                    <div className="h-20 w-full bg-white/20 rounded-md"></div>
                    <div className="h-8 w-1/3 bg-bulafix-yellow rounded-md"></div>
                  </div>
                </div>
                <div className="absolute top-6 -right-6 text-bulafix-dark-gray">
                  <div className="bg-white text-bulafix-terracotta p-4 rounded-full shadow-lg flex items-center justify-center animate-pulse-gentle">
                    <MapPin size={28} />
                  </div>
                </div>
                <div className="absolute -bottom-4 -left-4 text-bulafix-dark-gray">
                  <div className="bg-white text-bulafix-yellow p-4 rounded-full shadow-lg flex items-center justify-center animate-pulse-gentle">
                    <Check size={28} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="mb-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total Reports"
            value={stats.totalReports}
            icon={<MessageSquare size={24} />}
            className="bg-gradient-to-br from-bulafix-light-gray to-white dark:from-bulafix-dark-gray dark:to-bulafix-dark-gray"
          />
          <StatsCard
            title="Resolved Issues"
            value={stats.resolvedReports}
            change={{ value: "12%", positive: true }}
            icon={<CheckCircle size={24} />}
            className="bg-gradient-to-br from-bulafix-light-gray to-white dark:from-bulafix-dark-gray dark:to-bulafix-dark-gray"
          />
          <StatsCard
            title="In Progress"
            value={stats.inProgressReports + stats.acknowledgedReports}
            icon={<Circle size={24} />}
            className="bg-gradient-to-br from-bulafix-light-gray to-white dark:from-bulafix-dark-gray dark:to-bulafix-dark-gray"
          />
          <StatsCard
            title="Resolution Rate"
            value={`${stats.resolutionRate.toFixed(0)}%`}
            change={{ value: "5%", positive: true }}
            icon={<Check size={24} />}
            className="bg-gradient-to-br from-bulafix-light-gray to-white dark:from-bulafix-dark-gray dark:to-bulafix-dark-gray"
          />
        </div>
      </section>

      {/* Map and Recent Reports Section */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Issue Map</h2>
          <Button asChild variant="outline" size="sm">
            <Link to="/map">View Full Map</Link>
          </Button>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <MapPlaceholder 
            className="col-span-full md:col-span-2 min-h-[400px]" 
            pins={mockMapPins}
            onPinClick={handlePinClick}
            selectedPinId={selectedPinId}
          />
          
          <div className="col-span-full md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Recent Reports</h3>
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
              {reports.slice(0, 4).map((report) => (
                <ReportCard
                  key={report.id}
                  report={report}
                  className="cursor-pointer"
                  onClick={() => setSelectedPinId(report.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Reporting Options Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">How to Report an Issue</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-bulafix-light-gray dark:bg-bulafix-dark-gray/50 rounded-lg p-6 flex flex-col items-center text-center transition-transform hover:scale-105">
            <div className="w-16 h-16 rounded-full bg-bulafix-terracotta text-white flex items-center justify-center mb-4">
              <MapPin size={24} />
            </div>
            <h3 className="text-lg font-semibold mb-2">Web App</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Use our mobile-friendly web app to submit reports with photos and location.
            </p>
            <Button asChild variant="link" className="mt-auto">
              <Link to="/report">Report Online</Link>
            </Button>
          </div>
          
          <div className="bg-bulafix-light-gray dark:bg-bulafix-dark-gray/50 rounded-lg p-6 flex flex-col items-center text-center transition-transform hover:scale-105">
            <div className="w-16 h-16 rounded-full bg-bulafix-yellow text-bulafix-dark-gray flex items-center justify-center mb-4">
              <MessageSquare size={24} />
            </div>
            <h3 className="text-lg font-semibold mb-2">WhatsApp</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Send a WhatsApp message with details and photos to our dedicated number.
            </p>
            <Button asChild variant="link" className="mt-auto">
              <a href="https://wa.me/263771234567" target="_blank" rel="noopener noreferrer">WhatsApp Us</a>
            </Button>
          </div>
          
          <div className="bg-bulafix-light-gray dark:bg-bulafix-dark-gray/50 rounded-lg p-6 flex flex-col items-center text-center transition-transform hover:scale-105">
            <div className="w-16 h-16 rounded-full bg-bulafix-teal text-white flex items-center justify-center mb-4">
              <Image size={24} />
            </div>
            <h3 className="text-lg font-semibold mb-2">SMS</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Text the details of your issue to our SMS number for simple reporting.
            </p>
            <Button asChild variant="link" className="mt-auto">
              <a href="sms:+263771234567">Text to 23456</a>
            </Button>
          </div>
          
          <div className="bg-bulafix-light-gray dark:bg-bulafix-dark-gray/50 rounded-lg p-6 flex flex-col items-center text-center transition-transform hover:scale-105">
            <div className="w-16 h-16 rounded-full bg-bulafix-terracotta text-white flex items-center justify-center mb-4 voice-ripple">
              <Mic size={24} />
            </div>
            <h3 className="text-lg font-semibold mb-2">Voice</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Call our hotline to report an issue verbally if you prefer speaking.
            </p>
            <Button asChild variant="link" className="mt-auto">
              <a href="tel:+263771234567">Call Hotline</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Success Stories</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-bulafix-dark-gray/50 rounded-lg p-6 shadow-sm border">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-bulafix-terracotta/20 text-bulafix-terracotta flex items-center justify-center mr-3">
                <span className="font-bold">TM</span>
              </div>
              <div>
                <h3 className="font-semibold">Themba M.</h3>
                <p className="text-xs text-muted-foreground">Nkulumane resident</p>
              </div>
            </div>
            <p className="text-sm">
              "I reported a water leak that had been ongoing for weeks. Within 3 days of using BulaFix, the city council had fixed it. This platform really works!"
            </p>
          </div>
          
          <div className="bg-white dark:bg-bulafix-dark-gray/50 rounded-lg p-6 shadow-sm border">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-bulafix-teal/20 text-bulafix-teal flex items-center justify-center mr-3">
                <span className="font-bold">SN</span>
              </div>
              <div>
                <h3 className="font-semibold">Sipho N.</h3>
                <p className="text-xs text-muted-foreground">Pumula resident</p>
              </div>
            </div>
            <p className="text-sm">
              "Our street had been dark for months due to broken lights. I used BulaFix to report it and now we can walk safely at night again. Thank you!"
            </p>
          </div>
          
          <div className="bg-white dark:bg-bulafix-dark-gray/50 rounded-lg p-6 shadow-sm border">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-bulafix-yellow/20 text-bulafix-yellow flex items-center justify-center mr-3">
                <span className="font-bold">NM</span>
              </div>
              <div>
                <h3 className="font-semibold">Nomsa M.</h3>
                <p className="text-xs text-muted-foreground">Entumbane resident</p>
              </div>
            </div>
            <p className="text-sm">
              "I love how I can track the progress of my reports. It makes the council more accountable and gives us confidence as residents."
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="rounded-2xl bg-gradient-to-r from-bulafix-teal to-bulafix-terracotta p-8 text-white text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Join the Movement for a Better Bulawayo</h2>
        <p className="max-w-2xl mx-auto mb-6">
          Together we can build a more responsive city. Report issues, verify others' reports, and track progress.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-white text-bulafix-terracotta hover:bg-white/90">
            <Link to="/report">Report an Issue</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="bg-transparent border-white hover:bg-white/10">
            <Link to="/community">Join Community</Link>
          </Button>
        </div>
      </section>
    </MainLayout>
  );
};

export default Home;
