"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Video, Calendar, MessageSquare, Clock, Users } from "lucide-react"

export default function Dashboard() {
  const recentMeetings = [
    { id: 1, title: "Team Standup", date: "2024-01-15", participants: 5, duration: "30 min" },
    { id: 2, title: "Product Review", date: "2024-01-14", participants: 8, duration: "45 min" },
    { id: 3, title: "Client Presentation", date: "2024-01-13", participants: 3, duration: "60 min" },
  ]

  const upcomingMeetings = [
    { id: 1, title: "Weekly Planning", date: "2024-01-16", time: "10:00 AM", participants: 6 },
    { id: 2, title: "Design Review", date: "2024-01-16", time: "2:00 PM", participants: 4 },
  ]

  return (
    <div className="flex-1 space-y-4 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex gap-2">
          <Button asChild>
            <a href="/meetings/schedule">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Meeting
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href="/meetings/schedule?type=instant">
              <Plus className="h-4 w-4 mr-2" />
              Start Instant Meeting
            </a>
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Meetings</CardTitle>
            <Video className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+2 from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Meeting Hours</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18.5</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Participants</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">Total unique</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI Summaries</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">22</div>
            <p className="text-xs text-muted-foreground">Generated</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent Meetings */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Meetings</CardTitle>
            <CardDescription>Your latest meeting activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentMeetings.map((meeting) => (
                <div key={meeting.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{meeting.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {meeting.date} • {meeting.participants} participants • {meeting.duration}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <a href={`/meetings/${meeting.id}/chat`}>View Summary</a>
                  </Button>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 bg-transparent" asChild>
              <a href="/meetings/previous">View All Meetings</a>
            </Button>
          </CardContent>
        </Card>

        {/* Upcoming Meetings */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Meetings</CardTitle>
            <CardDescription>Your scheduled meetings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingMeetings.map((meeting) => (
                <div key={meeting.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{meeting.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {meeting.date} at {meeting.time} • {meeting.participants} participants
                    </p>
                  </div>
                  <Button size="sm">Join</Button>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 bg-transparent" asChild>
              <a href="/meetings/upcoming">View All Upcoming</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
