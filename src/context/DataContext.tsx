
import React, { createContext, useContext, useState, useEffect } from "react";
import { Report } from "@/components/ReportCard";

interface DataContextType {
  reports: Report[];
  stats: {
    totalReports: number;
    resolvedReports: number;
    acknowledgedReports: number;
    inProgressReports: number;
    pendingReports: number;
    resolutionRate: number;
  };
  addReport: (report: Omit<Report, "id" | "date" | "verificationCount" | "commentCount">) => void;
  verifyReport: (reportId: string) => void;
  getReportById: (id: string) => Report | undefined;
}

// Mock data
const initialReports: Report[] = [
  {
    id: "1",
    title: "Burst Water Pipe on Main Street",
    location: "Main Street, CBD",
    category: "Water",
    status: "in-progress",
    date: "May 3, 2025",
    description: "Large water pipe burst causing flooding on the sidewalk and road. Water has been flowing for at least 5 hours.",
    imageUrl: "https://images.unsplash.com/photo-1584677626646-7c8f83690304?auto=format&fit=crop&w=600&q=80",
    verificationCount: 24,
    commentCount: 8
  },
  {
    id: "2",
    title: "Pothole near City Hall",
    location: "Leopold Takawira Ave, CBD",
    category: "Roads",
    status: "reported",
    date: "May 2, 2025",
    description: "Deep pothole approximately 1 meter wide causing traffic and damage to vehicles.",
    imageUrl: "https://images.unsplash.com/photo-1573048541234-a8a97db8cd3a?auto=format&fit=crop&w=600&q=80",
    verificationCount: 12,
    commentCount: 3
  },
  {
    id: "3",
    title: "Street Light Not Working",
    location: "Nkulumane 12",
    category: "Electricity",
    status: "acknowledged",
    date: "May 1, 2025",
    description: "Street light has been out for two weeks creating safety concerns for pedestrians at night.",
    imageUrl: "https://images.unsplash.com/photo-1582657826511-d7defde97d12?auto=format&fit=crop&w=600&q=80",
    verificationCount: 7,
    commentCount: 2
  },
  {
    id: "4",
    title: "Uncollected Garbage",
    location: "Luveve 5",
    category: "Sanitation",
    status: "resolved",
    date: "Apr 28, 2025",
    description: "Pile of garbage uncollected for 3 weeks causing bad smell and health concerns.",
    imageUrl: "https://images.unsplash.com/photo-1597714026720-8f74c62310ba?auto=format&fit=crop&w=600&q=80",
    verificationCount: 19,
    commentCount: 5
  },
  {
    id: "5",
    title: "Blocked Drainage System",
    location: "Mpopoma",
    category: "Drainage",
    status: "reported",
    date: "Apr 27, 2025",
    description: "Drain blocked with debris causing water to pool during rain.",
    verificationCount: 5,
    commentCount: 1
  },
  {
    id: "6",
    title: "Broken Public Bench",
    location: "Centenary Park",
    category: "Public Spaces",
    status: "rejected",
    date: "Apr 25, 2025",
    description: "Wooden bench broken and has sharp edges that could cause injury.",
    verificationCount: 4,
    commentCount: 6
  }
];

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [reports, setReports] = useState<Report[]>(initialReports);
  const [stats, setStats] = useState({
    totalReports: 0,
    resolvedReports: 0,
    acknowledgedReports: 0,
    inProgressReports: 0,
    pendingReports: 0,
    resolutionRate: 0
  });

  // Calculate stats whenever reports change
  useEffect(() => {
    const totalReports = reports.length;
    const resolvedReports = reports.filter(r => r.status === "resolved").length;
    const acknowledgedReports = reports.filter(r => r.status === "acknowledged").length;
    const inProgressReports = reports.filter(r => r.status === "in-progress").length;
    const pendingReports = reports.filter(r => r.status === "reported").length;
    const resolutionRate = totalReports > 0 ? (resolvedReports / totalReports) * 100 : 0;

    setStats({
      totalReports,
      resolvedReports,
      acknowledgedReports,
      inProgressReports,
      pendingReports,
      resolutionRate
    });
  }, [reports]);

  const addReport = (report: Omit<Report, "id" | "date" | "verificationCount" | "commentCount">) => {
    const newReport: Report = {
      ...report,
      id: (reports.length + 1).toString(),
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      verificationCount: 0,
      commentCount: 0
    };

    setReports(prevReports => [newReport, ...prevReports]);
  };

  const verifyReport = (reportId: string) => {
    setReports(prevReports =>
      prevReports.map(report =>
        report.id === reportId
          ? { ...report, verificationCount: report.verificationCount + 1 }
          : report
      )
    );
  };

  const getReportById = (id: string) => {
    return reports.find(report => report.id === id);
  };

  return (
    <DataContext.Provider
      value={{
        reports,
        stats,
        addReport,
        verifyReport,
        getReportById
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
