import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line } from "recharts";
import { FileText, Download, ExternalLink, Info, AlertTriangle, CheckCircle, Clock, Ban } from "lucide-react";
import { AccessibilityAlert } from "@/components/AccessibilityAlert";

// Sample data for charts
const budgetData = [
  { name: "Water", value: 35, color: "#0ea5e9" },
  { name: "Roads", value: 25, color: "#f59e0b" },
  { name: "Electricity", value: 20, color: "#10b981" },
  { name: "Sanitation", value: 15, color: "#6366f1" },
  { name: "Other", value: 5, color: "#8b5cf6" },
];

const monthlyReportsData = [
  { name: "Jan", reports: 65, resolved: 40 },
  { name: "Feb", reports: 75, resolved: 55 },
  { name: "Mar", reports: 85, resolved: 60 },
  { name: "Apr", reports: 70, resolved: 50 },
  { name: "May", reports: 90, resolved: 65 },
  { name: "Jun", reports: 100, resolved: 70 },
];

const responseTimeData = [
  { name: "Jan", time: 5.2 },
  { name: "Feb", time: 4.8 },
  { name: "Mar", time: 4.5 },
  { name: "Apr", time: 4.1 },
  { name: "May", time: 3.8 },
  { name: "Jun", time: 3.5 },
];

const issueStatusData = [
  { status: "Reported", count: 120, color: "#f97316" },
  { status: "Acknowledged", count: 80, color: "#3b82f6" },
  { status: "In Progress", count: 60, color: "#eab308" },
  { status: "Resolved", count: 140, color: "#22c55e" },
  { status: "Rejected", count: 20, color: "#ef4444" },
];

const TransparencyPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("budget");

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        <AccessibilityAlert />
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Transparency Dashboard</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Access real-time data on municipal service delivery, budget allocation, and issue resolution. 
            Our commitment to transparency helps build trust between citizens and local government.
          </p>
        </div>

        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="budget">Budget Allocation</TabsTrigger>
            <TabsTrigger value="reports">Issue Reports</TabsTrigger>
            <TabsTrigger value="performance">Performance Metrics</TabsTrigger>
            <TabsTrigger value="documents">Public Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="budget" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Municipal Budget Allocation 2023</CardTitle>
                  <CardDescription>
                    Breakdown of how the city's budget is allocated across different service areas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={budgetData}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {budgetData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Budget Execution Rate</CardTitle>
                  <CardDescription>
                    Percentage of allocated budget that has been utilized
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Water Infrastructure</span>
                      <span className="font-medium">78%</span>
                    </div>
                    <Progress value={78} className="h-2" style={{ '--theme-primary': 'oklch(0.6284 0.2813 181.8 / var(--alpha-value))' } as React.CSSProperties} />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Road Maintenance</span>
                      <span className="font-medium">65%</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Electricity</span>
                      <span className="font-medium">82%</span>
                    </div>
                    <Progress value={82} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Sanitation</span>
                      <span className="font-medium">59%</span>
                    </div>
                    <Progress value={59} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Public Spaces</span>
                      <span className="font-medium">45%</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Procurement Transparency</CardTitle>
                <CardDescription>
                  Recent municipal contracts and tenders
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Project</th>
                        <th className="text-left py-3 px-4">Contractor</th>
                        <th className="text-left py-3 px-4">Value</th>
                        <th className="text-left py-3 px-4">Status</th>
                        <th className="text-left py-3 px-4">Documents</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 px-4">Water Pipeline Replacement</td>
                        <td className="py-3 px-4">AquaTech Solutions</td>
                        <td className="py-3 px-4">$1.2 Million</td>
                        <td className="py-3 px-4">
                          <Badge className="bg-yellow-500">In Progress</Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Button variant="ghost" size="sm">
                            <FileText size={16} className="mr-1" /> View
                          </Button>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4">CBD Road Resurfacing</td>
                        <td className="py-3 px-4">RoadWorks Ltd</td>
                        <td className="py-3 px-4">$850,000</td>
                        <td className="py-3 px-4">
                          <Badge className="bg-green-500">Completed</Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Button variant="ghost" size="sm">
                            <FileText size={16} className="mr-1" /> View
                          </Button>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4">Solar Street Lighting</td>
                        <td className="py-3 px-4">EcoLight Energy</td>
                        <td className="py-3 px-4">$650,000</td>
                        <td className="py-3 px-4">
                          <Badge className="bg-blue-500">Awarded</Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Button variant="ghost" size="sm">
                            <FileText size={16} className="mr-1" /> View
                          </Button>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4">Public Park Renovation</td>
                        <td className="py-3 px-4">GreenSpace Developers</td>
                        <td className="py-3 px-4">$420,000</td>
                        <td className="py-3 px-4">
                          <Badge variant="outline">Tendering</Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Button variant="ghost" size="sm">
                            <FileText size={16} className="mr-1" /> View
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Reports & Resolutions</CardTitle>
                  <CardDescription>
                    Tracking issue reports and resolution rates over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={monthlyReportsData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="reports" name="Reports Filed" fill="#f97316" />
                        <Bar dataKey="resolved" name="Issues Resolved" fill="#22c55e" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Current Issue Status</CardTitle>
                  <CardDescription>
                    Distribution of issues by current status
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={issueStatusData}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="count"
                          nameKey="status"
                        >
                          {issueStatusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Issue Categories Breakdown</CardTitle>
                <CardDescription>
                  Types of issues reported through BulaFix
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                        <span>Water Issues</span>
                      </div>
                      <span className="font-medium">32%</span>
                    </div>
                    <Progress value={32} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      Burst pipes, water quality, supply interruptions
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
                        <span>Road Issues</span>
                      </div>
                      <span className="font-medium">28%</span>
                    </div>
                    <Progress value={28} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      Potholes, damaged surfaces, road markings
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                        <span>Electricity</span>
                      </div>
                      <span className="font-medium">15%</span>
                    </div>
                    <Progress value={15} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      Power outages, street lighting, electrical hazards
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                        <span>Sanitation</span>
                      </div>
                      <span className="font-medium">18%</span>
                    </div>
                    <Progress value={18} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      Sewage leaks, garbage collection, public toilets
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                        <span>Public Spaces</span>
                      </div>
                      <span className="font-medium">7%</span>
                    </div>
                    <Progress value={7} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      Parks maintenance, public facilities, accessibility
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-2xl font-bold">70%</CardTitle>
                  <CardDescription>Overall Resolution Rate</CardDescription>
                </CardHeader>
                <CardContent>
                  <Progress value={70} className="h-2 mb-2" />
                  <p className="text-xs text-muted-foreground">
                    Percentage of reported issues that have been resolved
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-2xl font-bold">3.5 days</CardTitle>
                  <CardDescription>Average Response Time</CardDescription>
                </CardHeader>
                <CardContent>
                  <Progress value={65} className="h-2 mb-2" />
                  <p className="text-xs text-muted-foreground">
                    Average time from report to initial response
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-2xl font-bold">85%</CardTitle>
                  <CardDescription>Citizen Satisfaction</CardDescription>
                </CardHeader>
                <CardContent>
                  <Progress value={85} className="h-2 mb-2" />
                  <p className="text-xs text-muted-foreground">
                    Based on post-resolution feedback surveys
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Response Time Trends</CardTitle>
                <CardDescription>
                  Average time to respond to reported issues (in days)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={responseTimeData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="time" 
                        name="Response Time (days)" 
                        stroke="#3b82f6" 
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Department Performance</CardTitle>
                <CardDescription>
                  Comparison of resolution rates across different city departments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Water Department</span>
                      <div className="flex items-center">
                        <span className="font-medium mr-2">82%</span>
                        <Badge variant="outline" className="text-green-500 border-green-500">
                          <CheckCircle size={12} className="mr-1" /> High
                        </Badge>
                      </div>
                    </div>
                    <Progress value={82} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Roads Department</span>
                      <div className="flex items-center">
                        <span className="font-medium mr-2">65%</span>
                        <Badge variant="outline" className="text-yellow-500 border-yellow-500">
                          <Clock size={12} className="mr-1" /> Medium
                        </Badge>
                      </div>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Electricity Department</span>
                      <div className="flex items-center">
                        <span className="font-medium mr-2">78%</span>
                        <Badge variant="outline" className="text-green-500 border-green-500">
                          <CheckCircle size={12} className="mr-1" /> High
                        </Badge>
                      </div>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Sanitation Department</span>
                      <div className="flex items-center">
                        <span className="font-medium mr-2">58%</span>
                        <Badge variant="outline" className="text-yellow-500 border-yellow-500">
                          <Clock size={12} className="mr-1" /> Medium
                        </Badge>
                      </div>
                    </div>
                    <Progress value={58} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Parks & Recreation</span>
                      <div className="flex items-center">
                        <span className="font-medium mr-2">45%</span>
                        <Badge variant="outline" className="text-red-500 border-red-500">
                          <AlertTriangle size={12} className="mr-1" /> Low
                        </Badge>
                      </div>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>City Council Minutes</CardTitle>
                  <CardDescription>
                    Official records of city council meetings and decisions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-2 border-b">
                      <div>
                        <p className="font-medium">June 2023 Council Meeting</p>
                        <p className="text-sm text-muted-foreground">Published: 15 Jun 2023</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download size={16} className="mr-1" /> PDF
                      </Button>
                    </div>
                    
                    <div className="flex justify-between items-center pb-2 border-b">
                      <div>
                        <p className="font-medium">May 2023 Council Meeting</p>
                        <p className="text-sm text-muted-foreground">Published: 18 May 2023</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download size={16} className="mr-1" /> PDF
                      </Button>
                    </div>
                    
                    <div className="flex justify-between items-center pb-2 border-b">
                      <div>
                        <p className="font-medium">April 2023 Council Meeting</p>
                        <p className="text-sm text-muted-foreground">Published: 20 Apr 2023</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download size={16} className="mr-1" /> PDF
                      </Button>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">March 2023 Council Meeting</p>
                        <p className="text-sm text-muted-foreground">Published: 16 Mar 2023</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download size={16} className="mr-1" /> PDF
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Budget & Financial Reports</CardTitle>
                  <CardDescription>
                    Financial documents and budget reports
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-2 border-b">
                      <div>
                        <p className="font-medium">2023 Annual Budget</p>
                        <p className="text-sm text-muted-foreground">Published: 10 Jan 2023</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download size={16} className="mr-1" /> PDF
                      </Button>
                    </div>
                    
                    <div className="flex justify-between items-center pb-2 border-b">
                      <div>
                        <p className="font-medium">Q2 2023 Financial Report</p>
                        <p className="text-sm text-muted-foreground">Published: 15 Jul 2023</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download size={16} className="mr-1" /> PDF
                      </Button>
                    </div>
                    
                    <div className="flex justify-between items-center pb-2 border-b">
                      <div>
                        <p className="font-medium">Q1 2023 Financial Report</p>
                        <p className="text-sm text-muted-foreground">Published: 12 Apr 2023</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download size={16} className="mr-1" /> PDF
                      </Button>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">2022 Annual Financial Statement</p>
                        <p className="text-sm text-muted-foreground">Published: 28 Feb 2023</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download size={16} className="mr-1" /> PDF
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Development Plans & Policies</CardTitle>
                <CardDescription>
                  Strategic plans, policies, and development frameworks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-2 border-b">
                      <div>
                        <p className="font-medium">Bulawayo Master Plan 2023-2030</p>
                        <p className="text-sm text-muted-foreground">Published: 05 Mar 2023</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download size={16} className="mr-1" /> PDF
                      </Button>
                    </div>
                    
                    <div className="flex justify-between items-center pb-2 border-b">
                      <div>
                        <p className="font-medium">Water Conservation Policy</p>
                        <p className="text-sm text-muted-foreground">Published: 22 Jan 2023</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download size={16} className="mr-1" /> PDF
                      </Button>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Public Transport Strategy</p>
                        <p className="text-sm text-muted-foreground">Published: 18 Apr 2023</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download size={16} className="mr-1" /> PDF
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-2 border-b">
                      <div>
                        <p className="font-medium">Sustainable Energy Plan</p>
                        <p className="text-sm text-muted-foreground">Published: 30 May 2023</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download size={16} className="mr-1" /> PDF
                      </Button>
                    </div>
                    
                    <div className="flex justify-between items-center pb-2 border-b">
                      <div>
                        <p className="font-medium">Housing Development Framework</p>
                        <p className="text-sm text-muted-foreground">Published: 14 Feb 2023</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download size={16} className="mr-1" /> PDF
                      </Button>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Digital Transformation Strategy</p>
                        <p className="text-sm text-muted-foreground">Published: 08 Jun 2023</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download size={16} className="mr-1" /> PDF
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="bg-muted rounded-lg p-4 flex items-start gap-3 mb-8">
          <Info size={20} className="text-bulafix-teal mt-0.5" />
          <div>
            <h3 className="font-medium mb-1">About This Dashboard</h3>
            <p className="text-sm text-muted-foreground mb-2">
              This transparency dashboard is updated monthly with the latest data from city departments and BulaFix reports. 
              Our goal is to provide citizens with clear insights into municipal operations and service delivery.
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="text-xs h-8">
                <ExternalLink size={14} className="mr-1" /> Open Data Portal
              </Button>
              <Button variant="outline" size="sm" className="text-xs h-8">
                <Download size={14} className="mr-1" /> Download All Data
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-900">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="text-green-600 dark:text-green-500" size={24} />
                <div>
                  <h3 className="font-semibold mb-1">Accountability</h3>
                  <p className="text-sm text-muted-foreground">
                    We hold city officials accountable through transparent reporting and tracking of service delivery.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Info className="text-blue-600 dark:text-blue-500" size={24} />
                <div>
                  <h3 className="font-semibold mb-1">Informed Citizens</h3>
                  <p className="text-sm text-muted-foreground">
                    Access to information empowers citizens to participate effectively in local governance.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Clock className="text-amber-600 dark:text-amber-500" size={24} />
                <div>
                  <h3 className="font-semibold mb-1">Real-Time Updates</h3>
                  <p className="text-sm text-muted-foreground">
                    Stay informed with the latest data on municipal services and issue resolution.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default TransparencyPage;
