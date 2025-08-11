"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Mic, MicOff, Video, VideoOff, Monitor, MessageSquare, Phone, Users, Send, MoreVertical } from "lucide-react"

export default function VideoCall() {
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [showTranscript, setShowTranscript] = useState(true)
  const [chatMessage, setChatMessage] = useState("")
  const [meetingTime, setMeetingTime] = useState(0)

  // Mock participants data - updated to show 8 participants
  const participants = [
    { id: 1, name: "You", isMuted: isMuted, isVideoOn: isVideoOn, isHost: true },
    { id: 2, name: "John Doe", isMuted: false, isVideoOn: true, isHost: false },
    { id: 3, name: "Jane Smith", isMuted: true, isVideoOn: true, isHost: false },
    { id: 4, name: "Mike Johnson", isMuted: false, isVideoOn: false, isHost: false },
    { id: 5, name: "Sarah Wilson", isMuted: false, isVideoOn: true, isHost: false },
    { id: 6, name: "Alice Brown", isMuted: true, isVideoOn: true, isHost: false },
    { id: 7, name: "Bob Davis", isMuted: false, isVideoOn: false, isHost: false },
    { id: 8, name: "Carol White", isMuted: false, isVideoOn: true, isHost: false },
  ]

  // Update the grid layout to handle different participant counts
  const getGridLayout = (participantCount: number) => {
    if (participantCount <= 2) return "grid-cols-1 md:grid-cols-2"
    if (participantCount <= 4) return "grid-cols-2"
    if (participantCount <= 6) return "grid-cols-2 md:grid-cols-3"
    return "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
  }

  // Mock chat messages
  const chatMessages = [
    { id: 1, sender: "John Doe", message: "Good morning everyone!", time: "10:01" },
    { id: 2, sender: "Jane Smith", message: "Thanks for joining the call", time: "10:02" },
    { id: 3, sender: "You", message: "Let's get started", time: "10:03" },
  ]

  // Mock live transcript
  const transcriptLines = [
    { id: 1, speaker: "John Doe", text: "Good morning everyone, thanks for joining today's meeting.", time: "10:01" },
    { id: 2, speaker: "Jane Smith", text: "Happy to be here. Should we start with the agenda?", time: "10:02" },
    { id: 3, speaker: "You", text: "Yes, let's begin with the Q1 planning discussion.", time: "10:03" },
    { id: 4, speaker: "Mike Johnson", text: "I have the latest numbers ready to share.", time: "10:04" },
  ]

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setMeetingTime((prev) => prev + 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      // Handle sending message
      setChatMessage("")
    }
  }

  return (
    <div className="h-screen bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="bg-gray-800 text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-semibold">Team Planning Meeting</h1>
          <Badge variant="secondary">{formatTime(meetingTime)}</Badge>
          <Badge variant="outline" className="text-green-400 border-green-400">
            Recording
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-white">
            <Users className="h-4 w-4 mr-2" />
            {participants.length}
          </Button>
          <Button variant="ghost" size="sm" className="text-white">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Main Video Area */}
        <div className="flex-1 p-4">
          <div className={`grid gap-4 h-full ${getGridLayout(participants.length)}`}>
            {participants.map((participant) => (
              <Card key={participant.id} className="relative overflow-hidden bg-gray-800">
                <CardContent className="p-0 h-full flex items-center justify-center">
                  {participant.isVideoOn ? (
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-6xl font-bold">
                      {participant.name.charAt(0)}
                    </div>
                  ) : (
                    <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                      <VideoOff className="h-12 w-12 text-gray-400" />
                    </div>
                  )}

                  {/* Participant Info Overlay */}
                  <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm flex items-center gap-2">
                    <span>{participant.name}</span>
                    {participant.isHost && (
                      <Badge variant="secondary" className="text-xs">
                        Host
                      </Badge>
                    )}
                    {participant.isMuted ? (
                      <MicOff className="h-3 w-3 text-red-400" />
                    ) : (
                      <Mic className="h-3 w-3 text-green-400" />
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Side Panel - Only show when chat or transcript is active */}
        {(showChat || showTranscript) && (
          <div className="w-80 bg-white border-l flex flex-col">
            {/* Panel Tabs */}
            <div className="border-b">
              <div className="flex">
                <Button
                  variant={showTranscript ? "default" : "ghost"}
                  size="sm"
                  onClick={() => {
                    setShowTranscript(true)
                    setShowChat(false)
                  }}
                  className="flex-1 rounded-none"
                >
                  Transcript
                </Button>
                <Button
                  variant={showChat ? "default" : "ghost"}
                  size="sm"
                  onClick={() => {
                    setShowChat(true)
                    setShowTranscript(false)
                  }}
                  className="flex-1 rounded-none"
                >
                  Chat
                </Button>
              </div>
            </div>

            {/* Transcript Panel */}
            {showTranscript && (
              <div className="flex-1 flex flex-col">
                <div className="p-3 border-b">
                  <h3 className="font-medium">Live Transcript</h3>
                  <p className="text-sm text-muted-foreground">AI-powered real-time transcription</p>
                </div>
                <ScrollArea className="flex-1 p-3">
                  <div className="space-y-3">
                    {transcriptLines.map((line) => (
                      <div key={line.id} className="space-y-1">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span className="font-medium">{line.speaker}</span>
                          <span>{line.time}</span>
                        </div>
                        <p className="text-sm">{line.text}</p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            )}

            {/* Chat Panel */}
            {showChat && (
              <div className="flex-1 flex flex-col">
                <div className="p-3 border-b">
                  <h3 className="font-medium">Meeting Chat</h3>
                </div>
                <ScrollArea className="flex-1 p-3">
                  <div className="space-y-3">
                    {chatMessages.map((message) => (
                      <div key={message.id} className="space-y-1">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span className="font-medium">{message.sender}</span>
                          <span>{message.time}</span>
                        </div>
                        <p className="text-sm">{message.message}</p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <div className="p-3 border-t">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type a message..."
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    />
                    <Button size="sm" onClick={handleSendMessage}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Controls Bar */}
      <div className="bg-gray-800 p-4 flex items-center justify-center gap-4">
        <Button
          variant={isMuted ? "destructive" : "secondary"}
          size="lg"
          onClick={() => setIsMuted(!isMuted)}
          className="rounded-full w-12 h-12"
        >
          {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
        </Button>

        <Button
          variant={isVideoOn ? "secondary" : "destructive"}
          size="lg"
          onClick={() => setIsVideoOn(!isVideoOn)}
          className="rounded-full w-12 h-12"
        >
          {isVideoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
        </Button>

        <Button
          variant={isScreenSharing ? "default" : "secondary"}
          size="lg"
          onClick={() => setIsScreenSharing(!isScreenSharing)}
          className="rounded-full w-12 h-12"
        >
          <Monitor className="h-5 w-5" />
        </Button>

        <Button
          variant={showChat || showTranscript ? "default" : "secondary"}
          size="lg"
          className="rounded-full w-12 h-12"
          onClick={() => {
            if (showChat || showTranscript) {
              setShowChat(false)
              setShowTranscript(false)
            } else {
              setShowChat(true)
              setShowTranscript(false)
            }
          }}
        >
          <MessageSquare className="h-5 w-5" />
        </Button>

        <Button
          variant="destructive"
          size="lg"
          className="rounded-full w-12 h-12 ml-8"
          onClick={() => (window.location.href = "/dashboard")}
        >
          <Phone className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
