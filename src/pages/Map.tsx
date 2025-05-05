
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { MapPlaceholder } from "@/components/MapPlaceholder";
import { ReportCard } from "@/components/ReportCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CheckCircle,
  Circle,
  Search,
  FilterIcon,
  ArrowRight
} from "lucide-react";
import { useData } from "@/context/DataContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";

const mockMapPins = [
  { id: "1", x: 35, y: 45, category: "Water", status: "in-progress" as const },
  { id: "2", x: 50, y: 55, category: "Roads", status: "reported" as const },
  { id: "3", x: 65, y: 40, category: "Electricity", status: "acknowledged" as const },
  { id: "4", x: 45, y: 65, category: "Sanitation", status: "resolved" as const },
  { id: "5", x: 58, y: 48, category: "Drainage", status: "reported" as const },
  { id: "6", x: 30, y: 60, category: "Public Spaces", status: "rejected" as const }
];

const categoryOptions = [
  "All Categories", 
  "Water", 
  "Roads", 
  "Electricity", 
  "Sanitation", 
  "Drainage", 
  "Public Spaces"
];

const statusOptions = [
  "All Statuses", 
  "Reported", 
  "Acknowledged", 
  "In Progress", 
  "Resolved", 
  "Rejected"
];

const MapPage: React.FC = () => {
  const { reports } = useData();
  const [selectedPinId, setSelectedPinId] = useState<string | undefined>(undefined);
  const [detailSheetOpen, setDetailSheetOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");
  const [view, setView] = useState<"map" | "list">("map");

  // Find the selected report
  const selectedReport = reports.find(report => report.id === selectedPinId);

  // Handle pin click
  const handlePinClick = (id: string) => {
    setSelectedPinId(id);
    setDetailSheetOpen(true);
  };

  // Handle report click from list
  const handleReportClick = (id: string) => {
    setSelectedPinId(id);
    setDetailSheetOpen(true);
  };

  // Filter reports based on search and filters
  const filteredReports = reports.filter(report => {
    const matchesSearch = 
      searchQuery === "" || 
      report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === "All Categories" || 
      report.category === selectedCategory;
    
    const matchesStatus = 
      selectedStatus === "All Statuses" || 
      report.status === selectedStatus.toLowerCase().replace(" ", "-");
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <MainLayout>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-3xl font-bold">Issue Map</h1>
          
          <div className="flex flex-col sm:flex-row w-full md:w-auto gap-2">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search reports..."
                className="pl-8 w-full md:w-[240px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button 
              variant="outline" 
              size="icon"
              className="self-start"
            >
              <FilterIcon size={16} />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {/* Filters sidebar */}
          <div className="md:col-span-1 order-2 md:order-1">
            <div className="bg-background rounded-lg border p-4 sticky top-20">
              <h3 className="font-semibold mb-4">Filters</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Category</label>
                  <Select
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      {categoryOptions.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">Status</label>
                  <Select
                    value={selectedStatus}
                    onValueChange={setSelectedStatus}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">Date Range</label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="All Time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Time</SelectItem>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="week">This Week</SelectItem>
                      <SelectItem value="month">This Month</SelectItem>
                      <SelectItem value="year">This Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">Verification</label>
                  <Select defaultValue="any">
                    <SelectTrigger>
                      <SelectValue placeholder="Any Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any Level</SelectItem>
                      <SelectItem value="high">Highly Verified (10+)</SelectItem>
                      <SelectItem value="medium">Medium Verified (5-9)</SelectItem>
                      <SelectItem value="low">Low Verified (0-4)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button className="w-full" variant="outline">
                  Reset Filters
                </Button>
              </div>
            </div>
          </div>

          {/* Main content area */}
          <div className="md:col-span-4 order-1 md:order-2">
            <Tabs defaultValue="map" onValueChange={(value) => setView(value as "map" | "list")}>
              <div className="flex justify-between items-center mb-4">
                <TabsList>
                  <TabsTrigger value="map">Map View</TabsTrigger>
                  <TabsTrigger value="list">List View</TabsTrigger>
                </TabsList>
                
                <div className="text-sm text-muted-foreground">
                  {filteredReports.length} {filteredReports.length === 1 ? 'report' : 'reports'} found
                </div>
              </div>
              
              <TabsContent value="map" className="m-0">
                <MapPlaceholder 
                  className="w-full h-[600px] mb-4" 
                  pins={mockMapPins}
                  onPinClick={handlePinClick}
                  selectedPinId={selectedPinId}
                />
              </TabsContent>
              
              <TabsContent value="list" className="m-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredReports.length > 0 ? (
                    filteredReports.map((report) => (
                      <ReportCard
                        key={report.id}
                        report={report}
                        className="cursor-pointer"
                        onClick={() => handleReportClick(report.id)}
                      />
                    ))
                  ) : (
                    <div className="col-span-full flex flex-col items-center justify-center p-12 border rounded-lg bg-muted/20">
                      <SearchIcon size={48} className="text-muted mb-4" />
                      <h3 className="text-lg font-semibold mb-1">No Reports Found</h3>
                      <p className="text-sm text-muted-foreground text-center max-w-md">
                        Try adjusting your search terms or filters to find what you're looking for.
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Report Detail Sheet */}
      <Sheet open={detailSheetOpen} onOpenChange={setDetailSheetOpen}>
        <SheetContent className="w-full sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>Report Details</SheetTitle>
            <SheetDescription>
              Detailed information about this report
            </SheetDescription>
          </SheetHeader>
          
          {selectedReport ? (
            <div className="mt-6 space-y-4">
              {selectedReport.imageUrl && (
                <div className="relative h-48 w-full overflow-hidden rounded-md">
                  <img
                    src={selectedReport.imageUrl}
                    alt={selectedReport.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
              
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold">{selectedReport.title}</h3>
                <div className={`px-2 py-1 rounded text-xs font-semibold
                  ${selectedReport.status === "reported" ? "bg-orange-100 text-orange-800" : ""}
                  ${selectedReport.status === "acknowledged" ? "bg-blue-100 text-blue-800" : ""}
                  ${selectedReport.status === "in-progress" ? "bg-yellow-100 text-yellow-800" : ""}
                  ${selectedReport.status === "resolved" ? "bg-green-100 text-green-800" : ""}
                  ${selectedReport.status === "rejected" ? "bg-red-100 text-red-800" : ""}
                `}>
                  {selectedReport.status.charAt(0).toUpperCase() + selectedReport.status.slice(1).replace("-", " ")}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Location</p>
                  <p className="font-medium">{selectedReport.location}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Category</p>
                  <p className="font-medium">{selectedReport.category}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Date Reported</p>
                  <p className="font-medium">{selectedReport.date}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Verification</p>
                  <p className="font-medium">{selectedReport.verificationCount} verifications</p>
                </div>
              </div>
              
              <div>
                <p className="text-muted-foreground mb-1">Description</p>
                <p>{selectedReport.description}</p>
              </div>
              
              <div className="pt-4 space-y-3">
                <Button className="w-full" variant="outline">
                  <CheckCircle size={16} className="mr-2" />
                  Verify This Report
                </Button>
                <Button className="w-full">
                  <Circle size={16} className="mr-2" />
                  Add Comment
                </Button>
              </div>
              
              <div className="pt-4 border-t">
                <h4 className="font-semibold mb-2">Activity Timeline</h4>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="mt-1 h-6 w-6 rounded-full bg-orange-100 flex items-center justify-center">
                      <Circle size={14} className="text-orange-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Report Submitted</p>
                      <p className="text-xs text-muted-foreground">{selectedReport.date}</p>
                    </div>
                  </div>
                  
                  {selectedReport.status === "acknowledged" || selectedReport.status === "in-progress" || selectedReport.status === "resolved" ? (
                    <div className="flex gap-3">
                      <div className="mt-1 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                        <Circle size={14} className="text-blue-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Acknowledged by Council</p>
                        <p className="text-xs text-muted-foreground">May 4, 2025</p>
                      </div>
                    </div>
                  ) : null}
                  
                  {selectedReport.status === "in-progress" || selectedReport.status === "resolved" ? (
                    <div className="flex gap-3">
                      <div className="mt-1 h-6 w-6 rounded-full bg-yellow-100 flex items-center justify-center">
                        <Circle size={14} className="text-yellow-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Work In Progress</p>
                        <p className="text-xs text-muted-foreground">May 5, 2025</p>
                      </div>
                    </div>
                  ) : null}
                  
                  {selectedReport.status === "resolved" ? (
                    <div className="flex gap-3">
                      <div className="mt-1 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                        <CheckCircle size={14} className="text-green-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Issue Resolved</p>
                        <p className="text-xs text-muted-foreground">May 6, 2025</p>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-40">
              <p>No report selected</p>
            </div>
          )}
          
          <div className="flex justify-end mt-6">
            <SheetClose asChild>
              <Button variant="outline">Close</Button>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </MainLayout>
  );
};

// Utility component for consistent icon in empty states
const SearchIcon = Search;

export default MapPage;
