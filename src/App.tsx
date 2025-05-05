
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DataProvider } from "@/context/DataContext";
import Home from "./pages/Index";
import MapPage from "./pages/Map";
import ReportPage from "./pages/Report";
import TransparencyPage from "./pages/Transparency";
import CommunityPage from "./pages/Community";
import NotFound from "./pages/NotFound";

// Add accessibility-related code to handle keyboard navigation
const setupAccessibilityListeners = () => {
  // Add a class to the body when user is navigating with keyboard
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      document.body.classList.add('user-is-tabbing');
    }
  });

  // Remove the class when mouse is used
  document.addEventListener('mousedown', () => {
    document.body.classList.remove('user-is-tabbing');
  });
};

// Initialize accessibility features
if (typeof window !== 'undefined') {
  setupAccessibilityListeners();
}

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <DataProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/report" element={<ReportPage />} />
            <Route path="/transparency" element={<TransparencyPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </DataProvider>
  </QueryClientProvider>
);

export default App;
