"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, MessageSquare, Users, Clock, Download } from "lucide-react"
import { TranscriptDialog } from "@/components/transcript-dialog"

export default function PreviousMeetings() {
  const [searchTerm, setSearchTerm] = useState("")

  const meetings = [
    {
      id: 1,
      title: "Q1 Planning Session",
      date: "2024-01-15",
      time: "10:00 AM",
      duration: "90 min",
      participants: ["John Doe", "Jane Smith", "Mike Johnson", "Sarah Wilson"],
      summary: "Discussed Q1 goals, budget allocation, and team objectives. Key decisions made on product roadmap.",
      hasTranscript: true,
      hasAISummary: true,
    },
    {
      id: 2,
      title: "Product Demo Review",
      date: "2024-01-14",
      time: "2:00 PM",
      duration: "45 min",
      participants: ["Alice Brown", "Bob Davis", "Carol White"],
      summary: "Reviewed latest product features and gathered feedback from stakeholders.",
      hasTranscript: true,
      hasAISummary: true,
    },
    {
      id: 3,
      title: "Team Standup",
      date: "2024-01-13",
      time: "9:00 AM",
      duration: "30 min",
      participants: ["John Doe", "Jane Smith", "Mike Johnson"],
      summary: "Daily standup covering current sprint progress and blockers.",
      hasTranscript: true,
      hasAISummary: false,
    },
    {
      id: 4,
      title: "Client Presentation",
      date: "2024-01-12",
      time: "3:00 PM",
      duration: "60 min",
      participants: ["Sarah Wilson", "Client A", "Client B"],
      summary: "Presented project progress and discussed next steps with client.",
      hasTranscript: true,
      hasAISummary: true,
    },
  ]

  const filteredMeetings = meetings.filter(
    (meeting) =>
      meeting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meeting.participants.some((p) => p.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <div className="flex-1 space-y-4 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Previous Meetings</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search meetings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        {filteredMeetings.map((meeting) => (
          <Card key={meeting.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl">{meeting.title}</CardTitle>
                  <CardDescription className="flex items-center gap-4 mt-2">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {meeting.date} at {meeting.time}
                    </span>
                    <span>Duration: {meeting.duration}</span>
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {meeting.participants.length} participants
                    </span>
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  {meeting.hasTranscript && <Badge variant="secondary">Transcript</Badge>}
                  {meeting.hasAISummary && <Badge variant="secondary">AI Summary</Badge>}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Participants</h4>
                  <div className="flex flex-wrap gap-2">
                    {meeting.participants.map((participant, index) => (
                      <Badge key={index} variant="outline">
                        {participant}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Summary</h4>
                  <p className="text-sm text-muted-foreground">{meeting.summary}</p>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button asChild>
                    <a href={`/meetings/${meeting.id}/chat`}>
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Chat with AI
                    </a>
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export PPT
                  </Button>
                  <TranscriptDialog meetingTitle={meeting.title} meetingDate={meeting.date} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredMeetings.length === 0 && (
        <div className="text-center py-12">
          <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No meetings found</h3>
          <p className="text-muted-foreground">Try adjusting your search terms</p>
        </div>
      )}
    </div>
  )
}
