
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { MessageSquare } from "lucide-react";

export const SuggestionBox = () => {
  const [suggestion, setSuggestion] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!suggestion.trim()) {
      toast({
        title: "Empty Suggestion",
        description: "Please enter your suggestion before submitting.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuggestion('');
      toast({
        title: "Suggestion Received",
        description: "Thank you for your feedback! Your suggestion has been recorded.",
      });
    }, 1500);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-xl">
          <MessageSquare className="text-bulafix-yellow" size={20} />
          Suggestion Box
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-3">
          <Textarea
            placeholder="Share your ideas on how we can improve BulaFix or municipal services..."
            value={suggestion}
            onChange={(e) => setSuggestion(e.target.value)}
            rows={3}
            className="resize-none"
          />
          <Button 
            type="submit" 
            className="w-full bg-bulafix-yellow hover:bg-bulafix-yellow/90 text-black"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Suggestion"}
          </Button>
          <p className="text-xs text-muted-foreground">
            Your feedback helps us improve. Suggestions may be shared with city officials to enhance service delivery.
          </p>
        </form>
      </CardContent>
    </Card>
  );
};
