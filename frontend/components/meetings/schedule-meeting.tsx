"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Users, Plus, X } from "lucide-react"

export default function ScheduleMeeting() {
  const [meetingType, setMeetingType] = useState<"instant" | "scheduled">("scheduled")
  const [participants, setParticipants] = useState<string[]>([])
  const [newParticipant, setNewParticipant] = useState("")
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    duration: "60",
    enableTranscription: true,
    enableRecording: false,
  })

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const type = urlParams.get("type")
    if (type === "instant") {
      setMeetingType("instant")
    }
  }, [])

  const handleAddParticipant = () => {
    if (newParticipant.trim() && !participants.includes(newParticipant.trim())) {
      setParticipants([...participants, newParticipant.trim()])
      setNewParticipant("")
    }
  }

  const handleRemoveParticipant = (email: string) => {
    setParticipants(participants.filter((p) => p !== email))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle meeting creation logic here
    if (meetingType === "instant") {
      window.location.href = "/meeting/room/instant-123"
    } else {
      // Schedule meeting and redirect to confirmation
      window.location.href = "/meetings/upcoming"
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Schedule Meeting</h1>
        <p className="text-muted-foreground">Create a new meeting or start an instant one</p>
      </div>

      {/* Meeting Type Toggle */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Meeting Type</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button
              variant={meetingType === "instant" ? "default" : "outline"}
              onClick={() => setMeetingType("instant")}
              className="flex-1"
            >
              Start Instant Meeting
            </Button>
            <Button
              variant={meetingType === "scheduled" ? "default" : "outline"}
              onClick={() => setMeetingType("scheduled")}
              className="flex-1"
            >
              Schedule for Later
            </Button>
          </div>
        </CardContent>
      </Card>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Meeting Details */}
        <Card>
          <CardHeader>
            <CardTitle>Meeting Details</CardTitle>
            <CardDescription>
              {meetingType === "instant" ? "Set up your instant meeting" : "Configure your scheduled meeting"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Meeting Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Enter meeting title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Add meeting description or agenda"
                value={formData.description}
                onChange={handleChange}
                rows={3}
              />
            </div>

            {meetingType === "scheduled" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" name="date" type="date" value={formData.date} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input id="time" name="time" type="time" value={formData.time} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (minutes)</Label>
                  <Input
                    id="duration"
                    name="duration"
                    type="number"
                    min="15"
                    max="480"
                    value={formData.duration}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Participants */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Participants
            </CardTitle>
            <CardDescription>Add participants to your meeting</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Enter email address"
                value={newParticipant}
                onChange={(e) => setNewParticipant(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddParticipant())}
              />
              <Button type="button" onClick={handleAddParticipant}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {participants.length > 0 && (
              <div className="space-y-2">
                <Label>Added Participants</Label>
                <div className="flex flex-wrap gap-2">
                  {participants.map((email) => (
                    <Badge key={email} variant="secondary" className="flex items-center gap-1">
                      {email}
                      <button
                        type="button"
                        onClick={() => handleRemoveParticipant(email)}
                        className="ml-1 hover:text-red-600"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Meeting Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Meeting Settings</CardTitle>
            <CardDescription>Configure AI and recording features</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Enable Live Transcription</Label>
                <p className="text-sm text-muted-foreground">AI-powered real-time transcription during the meeting</p>
              </div>
              <Switch
                checked={formData.enableTranscription}
                onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, enableTranscription: checked }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Enable Recording</Label>
                <p className="text-sm text-muted-foreground">
                  Record the meeting for later review (requires participant consent)
                </p>
              </div>
              <Switch
                checked={formData.enableRecording}
                onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, enableRecording: checked }))}
              />
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex gap-4">
          <Button type="submit" className="flex-1">
            {meetingType === "instant" ? (
              <>
                <Calendar className="h-4 w-4 mr-2" />
                Start Meeting Now
              </>
            ) : (
              <>
                <Clock className="h-4 w-4 mr-2" />
                Schedule Meeting
              </>
            )}
          </Button>
          <Button type="button" variant="outline" asChild>
            <a href="/dashboard">Cancel</a>
          </Button>
        </div>
      </form>
    </div>
  )
}
