"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Users, Video, Edit, Trash2 } from "lucide-react"

export default function UpcomingMeetings() {
  const upcomingMeetings = [
    {
      id: 1,
      title: "Weekly Team Sync",
      date: "2024-01-16",
      time: "10:00 AM",
      duration: "60 min",
      participants: ["John Doe", "Jane Smith", "Mike Johnson", "Sarah Wilson", "Alice Brown"],
      description: "Weekly team synchronization and progress updates",
      meetingId: "123-456-789",
      isToday: true,
      timeUntil: "2 hours",
    },
    {
      id: 2,
      title: "Product Design Review",
      date: "2024-01-16",
      time: "2:00 PM",
      duration: "90 min",
      participants: ["Alice Brown", "Bob Davis", "Carol White", "Design Team"],
      description: "Review new product designs and gather feedback",
      meetingId: "987-654-321",
      isToday: true,
      timeUntil: "6 hours",
    },
    {
      id: 3,
      title: "Client Check-in",
      date: "2024-01-17",
      time: "11:00 AM",
      duration: "45 min",
      participants: ["Sarah Wilson", "Client Representative"],
      description: "Monthly client progress review and feedback session",
      meetingId: "456-789-123",
      isToday: false,
      timeUntil: "1 day",
    },
    {
      id: 4,
      title: "Sprint Planning",
      date: "2024-01-18",
      time: "9:00 AM",
      duration: "120 min",
      participants: ["Development Team", "Product Manager", "Scrum Master"],
      description: "Plan upcoming sprint and assign tasks",
      meetingId: "789-123-456",
      isToday: false,
      timeUntil: "2 days",
    },
  ]

  const todayMeetings = upcomingMeetings.filter((meeting) => meeting.isToday)
  const laterMeetings = upcomingMeetings.filter((meeting) => !meeting.isToday)

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Upcoming Meetings</h1>
        <Button asChild>
          <a href="/meetings/schedule">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule New Meeting
          </a>
        </Button>
      </div>

      {/* Today's Meetings */}
      {todayMeetings.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Today's Meetings
          </h2>
          <div className="grid gap-4">
            {todayMeetings.map((meeting) => (
              <Card key={meeting.id} className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{meeting.title}</CardTitle>
                      <CardDescription className="flex items-center gap-4 mt-2">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {meeting.time} ({meeting.duration})
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {meeting.participants.length} participants
                        </span>
                        <Badge variant="secondary">In {meeting.timeUntil}</Badge>
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm">
                        <Video className="h-4 w-4 mr-2" />
                        Join Meeting
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">{meeting.description}</p>

                    <div>
                      <h4 className="font-medium mb-2 text-sm">Meeting ID: {meeting.meetingId}</h4>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2 text-sm">Participants</h4>
                      <div className="flex flex-wrap gap-1">
                        {meeting.participants.map((participant, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {participant}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm">
                        Copy Link
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Later Meetings */}
      {laterMeetings.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Later This Week</h2>
          <div className="grid gap-4">
            {laterMeetings.map((meeting) => (
              <Card key={meeting.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{meeting.title}</CardTitle>
                      <CardDescription className="flex items-center gap-4 mt-2">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {meeting.date} at {meeting.time}
                        </span>
                        <span>Duration: {meeting.duration}</span>
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {meeting.participants.length} participants
                        </span>
                        <Badge variant="outline">In {meeting.timeUntil}</Badge>
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">{meeting.description}</p>

                    <div>
                      <h4 className="font-medium mb-2 text-sm">Meeting ID: {meeting.meetingId}</h4>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2 text-sm">Participants</h4>
                      <div className="flex flex-wrap gap-1">
                        {meeting.participants.map((participant, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {participant}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm">
                        Copy Link
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {upcomingMeetings.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No upcoming meetings</h3>
          <p className="text-muted-foreground mb-4">Schedule your first meeting to get started</p>
          <Button asChild>
            <a href="/meetings/schedule">Schedule Meeting</a>
          </Button>
        </div>
      )}
    </div>
  )
}
