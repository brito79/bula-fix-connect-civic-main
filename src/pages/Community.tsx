
import React from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar,
  CheckCircle,
  MessageCircle,
  Users,
  MapPin
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const successStories = [
  {
    id: "1",
    title: "Water Restoration in Nkulumane",
    author: "Themba Moyo",
    authorInitials: "TM",
    date: "May 1, 2025",
    content: "After our community collectively reported consistent water shortages through BulaFix, the council prioritized pipe repairs in our area. Within two weeks, we saw improved water pressure and more consistent supply. This shows the power of organized community reporting!",
    category: "Water",
    area: "Nkulumane",
    likes: 24,
    comments: 8
  },
  {
    id: "2",
    title: "Street Lighting Makes Our Neighborhood Safer",
    author: "Nomsa Dube",
    authorInitials: "ND",
    date: "April 28, 2025",
    content: "Our street had non-functional lights for over six months, creating safety concerns especially for women walking in the evening. After mapping all broken lights on BulaFix with photo evidence, the electrical department responded within 10 days. The entire street now has working LED lights, and residents feel much safer.",
    category: "Electricity",
    area: "Mpopoma",
    likes: 32,
    comments: 12
  },
  {
    id: "3",
    title: "Community Clean-Up Success",
    author: "Sibusiso Ndlovu",
    authorInitials: "SN",
    date: "April 25, 2025",
    content: "What started as reports about uncollected garbage turned into a neighborhood initiative. After reporting the issue on BulaFix, we organized a community clean-up while waiting for council response. The council saw our effort and provided trucks and equipment to support us. Now we have a monthly clean-up schedule with council support!",
    category: "Sanitation",
    area: "Lobengula",
    likes: 41,
    comments: 15
  }
];

const upcomingEvents = [
  {
    id: "1",
    title: "Community Clean-up Day",
    date: "May 15, 2025",
    time: "09:00 - 12:00",
    location: "Nkulumane Shopping Centre",
    description: "Join us for a community clean-up initiative to keep our neighborhood beautiful. Tools and refreshments will be provided.",
    attendees: 28
  },
  {
    id: "2",
    title: "Water Conservation Workshop",
    date: "May 22, 2025",
    time: "14:00 - 16:00",
    location: "Bulawayo Public Library",
    description: "Learn practical techniques for water conservation in your home and garden during this interactive workshop.",
    attendees: 17
  },
  {
    id: "3",
    title: "BulaFix Ambassador Training",
    date: "May 29, 2025",
    time: "10:00 - 13:00",
    location: "City Hall",
    description: "Training session for community members who want to become BulaFix ambassadors and help others use the platform effectively.",
    attendees: 12
  }
];

const activeAmbassadors = [
  {
    name: "Themba Moyo",
    initials: "TM",
    area: "Nkulumane",
    reports: 47,
    verifications: 126,
    joined: "January 2025"
  },
  {
    name: "Nomsa Dube",
    initials: "ND",
    area: "Mpopoma",
    reports: 38,
    verifications: 93,
    joined: "February 2025"
  },
  {
    name: "Sibusiso Ndlovu",
    initials: "SN",
    area: "Lobengula",
    reports: 29,
    verifications: 84,
    joined: "March 2025"
  },
  {
    name: "Zanele Nyoni",
    initials: "ZN",
    area: "Pumula",
    reports: 26,
    verifications: 78,
    joined: "February 2025"
  }
];

const CommunityPage: React.FC = () => {
  return (
    <MainLayout>
      <div className="flex flex-col space-y-8">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold">Community Engagement</h1>
          <p className="text-muted-foreground">
            Connect with fellow citizens, share success stories, and participate in local events
          </p>
        </div>

        {/* Community Banner */}
        <div className="relative rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-bulafix-terracotta to-bulafix-teal opacity-90"></div>
          <div className="absolute inset-0 ndebele-pattern opacity-10"></div>
          <div className="relative z-10 px-6 py-12 text-white">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Join Our Growing Community</h2>
              <p className="mb-6">
                Be part of the movement to improve Bulawayo. Share your experiences, learn from others, and collaborate on solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button className="bg-white text-bulafix-terracotta hover:bg-white/90">
                  Become an Ambassador
                </Button>
                <Button variant="outline" className="bg-transparent border-white hover:bg-white/10">
                  Join Discussion Forum
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="stories">
          <TabsList className="mb-6">
            <TabsTrigger value="stories" className="flex items-center gap-1">
              <MessageCircle size={16} />
              <span>Success Stories</span>
            </TabsTrigger>
            <TabsTrigger value="events" className="flex items-center gap-1">
              <Calendar size={16} />
              <span>Upcoming Events</span>
            </TabsTrigger>
            <TabsTrigger value="ambassadors" className="flex items-center gap-1">
              <Users size={16} />
              <span>Community Ambassadors</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="stories" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Success Stories</h2>
              <Button variant="outline" size="sm">
                Share Your Story
              </Button>
            </div>

            {successStories.map((story) => (
              <Card key={story.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-3">
                      <Avatar>
                        <AvatarFallback>{story.authorInitials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{story.title}</CardTitle>
                        <CardDescription>
                          Posted by {story.author} on {story.date}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{story.category}</Badge>
                      <Badge variant="secondary">{story.area}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{story.content}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex items-center gap-6">
                    <Button variant="ghost" size="sm" className="gap-1">
                      <CheckCircle size={16} />
                      <span>{story.likes} likes</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-1">
                      <MessageCircle size={16} />
                      <span>{story.comments} comments</span>
                    </Button>
                  </div>
                  <Button variant="ghost" size="sm">Share</Button>
                </CardFooter>
              </Card>
            ))}

            <div className="flex justify-center">
              <Button variant="outline">View More Stories</Button>
            </div>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Upcoming Community Events</h2>
              <Button variant="outline" size="sm">
                Submit an Event
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {upcomingEvents.map((event) => (
                <Card key={event.id} className="h-full flex flex-col">
                  <CardHeader>
                    <CardTitle className="text-lg">{event.title}</CardTitle>
                    <CardDescription className="flex flex-col gap-1">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{event.date}, {event.time}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin size={14} />
                        <span>{event.location}</span>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-sm text-muted-foreground mb-4">
                      {event.description}
                    </p>
                    <div className="text-sm">
                      <span className="text-muted-foreground">{event.attendees} people attending</span>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button variant="outline" className="w-full">
                      RSVP to Event
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="bg-muted rounded-lg p-6">
              <h3 className="font-semibold mb-3">Subscribe to Event Updates</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Get notified about upcoming community events, workshops, and volunteer opportunities.
              </p>
              <div className="flex gap-2">
                <Input placeholder="Your email address" className="flex-grow" />
                <Button>Subscribe</Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="ambassadors" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Community Ambassadors</h2>
              <Button variant="outline" size="sm">
                Apply to Become an Ambassador
              </Button>
            </div>

            <div className="bg-bulafix-light-gray dark:bg-bulafix-dark-gray/50 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold mb-3">What Are BulaFix Ambassadors?</h3>
              <p className="text-muted-foreground mb-4">
                BulaFix Ambassadors are dedicated community members who help fellow citizens use the platform, 
                organize local events, and serve as a bridge between communities and the city council.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="bg-background rounded-lg p-4">
                  <h4 className="font-semibold">Assist & Educate</h4>
                  <p className="text-muted-foreground">
                    Help community members learn how to report issues effectively.
                  </p>
                </div>
                <div className="bg-background rounded-lg p-4">
                  <h4 className="font-semibold">Organize & Mobilize</h4>
                  <p className="text-muted-foreground">
                    Coordinate local clean-ups and community improvement initiatives.
                  </p>
                </div>
                <div className="bg-background rounded-lg p-4">
                  <h4 className="font-semibold">Represent & Advocate</h4>
                  <p className="text-muted-foreground">
                    Help voice community concerns and celebrate successes.
                  </p>
                </div>
              </div>
            </div>

            <h3 className="text-lg font-semibold mb-3">Active Ambassadors</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {activeAmbassadors.map((ambassador) => (
                <Card key={ambassador.name} className="text-center">
                  <CardHeader>
                    <Avatar className="w-16 h-16 mx-auto">
                      <AvatarFallback className="text-xl">{ambassador.initials}</AvatarFallback>
                    </Avatar>
                    <CardTitle className="mt-2">{ambassador.name}</CardTitle>
                    <CardDescription>{ambassador.area} Area</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-center gap-4 text-sm">
                      <div className="text-center">
                        <p className="font-semibold">{ambassador.reports}</p>
                        <p className="text-muted-foreground">Reports</p>
                      </div>
                      <div className="text-center">
                        <p className="font-semibold">{ambassador.verifications}</p>
                        <p className="text-muted-foreground">Verifications</p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-3">
                      Ambassador since {ambassador.joined}
                    </p>
                  </CardContent>
                  <CardFooter className="justify-center pt-0">
                    <Button variant="ghost" size="sm">View Profile</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Community Impact Section */}
        <div className="rounded-lg border p-6">
          <h2 className="text-xl font-semibold mb-4">BulaFix Community Impact</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-bulafix-terracotta mb-2">978</div>
              <p className="text-sm text-muted-foreground">Issues Reported</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-bulafix-teal mb-2">67%</div>
              <p className="text-sm text-muted-foreground">Resolution Rate</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-bulafix-yellow mb-2">243</div>
              <p className="text-sm text-muted-foreground">Active Community Members</p>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground text-center">
            Together, we're building a more responsive and transparent Bulawayo. Every report, verification, and community action matters.
          </p>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-bulafix-teal/20 to-bulafix-terracotta/20 rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold mb-2">Ready to make a difference?</h2>
          <p className="text-muted-foreground mb-4">
            Join our next community meeting to discuss local issues and solutions.
          </p>
          <Button>Register for Community Meeting</Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default CommunityPage;
