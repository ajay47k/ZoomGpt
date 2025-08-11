"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { MessageSquare, Send, Download, Calendar, Users, Clock, Bot, User, FileText, Lightbulb } from "lucide-react"

export default function MeetingChat() {
  const [message, setMessage] = useState("")
  const [chatHistory, setChatHistory] = useState([
    {
      id: 1,
      type: "ai" as const,
      content:
        "Hello! I'm your AI assistant for this meeting. I can help you find information from the discussion, generate summaries, or answer questions about what was covered. What would you like to know?",
      timestamp: "10:30 AM",
    },
  ])

  // Mock meeting data
  const meetingData = {
    title: "Q1 Planning Session",
    date: "January 15, 2024",
    duration: "90 minutes",
    participants: ["John Doe", "Jane Smith", "Mike Johnson", "Sarah Wilson"],
    summary:
      "Discussed Q1 goals, budget allocation, and team objectives. Key decisions made on product roadmap and resource allocation. Action items assigned to team members with specific deadlines.",
    keyPoints: [
      "Q1 revenue target set at $2.5M",
      "New product feature launch scheduled for March",
      "Team expansion approved for engineering",
      "Budget allocated for marketing campaigns",
    ],
    actionItems: [
      { task: "Finalize product specifications", assignee: "John Doe", deadline: "Jan 20" },
      { task: "Prepare marketing strategy", assignee: "Jane Smith", deadline: "Jan 25" },
      { task: "Hire 2 new engineers", assignee: "Mike Johnson", deadline: "Feb 15" },
    ],
  }

  const suggestedQuestions = [
    "What were the main decisions made?",
    "Who is responsible for the marketing strategy?",
    "What is our Q1 revenue target?",
    "When is the product launch scheduled?",
  ]

  const handleSendMessage = () => {
    if (!message.trim()) return

    const userMessage = {
      id: chatHistory.length + 1,
      type: "user" as const,
      content: message,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setChatHistory((prev) => [...prev, userMessage])

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: chatHistory.length + 2,
        type: "ai" as const,
        content: generateAIResponse(message),
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setChatHistory((prev) => [...prev, aiResponse])
    }, 1000)

    setMessage("")
  }

  const generateAIResponse = (question: string) => {
    const lowerQuestion = question.toLowerCase()

    if (lowerQuestion.includes("decision") || lowerQuestion.includes("main")) {
      return "The main decisions made in this meeting were: 1) Setting Q1 revenue target at $2.5M, 2) Scheduling new product feature launch for March, 3) Approving team expansion for engineering, and 4) Allocating budget for marketing campaigns."
    }

    if (lowerQuestion.includes("marketing")) {
      return "Jane Smith is responsible for preparing the marketing strategy, with a deadline of January 25th. The budget for marketing campaigns was also approved during this meeting."
    }

    if (lowerQuestion.includes("revenue") || lowerQuestion.includes("target")) {
      return "The Q1 revenue target was set at $2.5M during this meeting. This was one of the key decisions made by the team."
    }

    if (lowerQuestion.includes("launch") || lowerQuestion.includes("product")) {
      return "The new product feature launch is scheduled for March. John Doe is responsible for finalizing the product specifications by January 20th."
    }

    if (lowerQuestion.includes("action") || lowerQuestion.includes("task")) {
      return "Here are the action items from the meeting: 1) John Doe - Finalize product specifications (Jan 20), 2) Jane Smith - Prepare marketing strategy (Jan 25), 3) Mike Johnson - Hire 2 new engineers (Feb 15)."
    }

    return "I can help you find specific information from this meeting. Try asking about decisions made, action items, participants' responsibilities, or key discussion points."
  }

  const handleSuggestedQuestion = (question: string) => {
    setMessage(question)
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4">
          <a href="/meetings/previous">← Back to Previous Meetings</a>
        </Button>
        <h1 className="text-3xl font-bold mb-2">Meeting AI Chat</h1>
        <p className="text-muted-foreground">Ask questions about your meeting content</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Meeting Summary */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Meeting Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium">{meetingData.title}</h4>
                <p className="text-sm text-muted-foreground">{meetingData.date}</p>
              </div>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {meetingData.duration}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {meetingData.participants.length} participants
                </span>
              </div>

              <div>
                <h5 className="font-medium mb-2">Participants</h5>
                <div className="flex flex-wrap gap-1">
                  {meetingData.participants.map((participant, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {participant}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                AI Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{meetingData.summary}</p>

              <div className="space-y-3">
                <div>
                  <h5 className="font-medium mb-2">Key Points</h5>
                  <ul className="space-y-1">
                    {meetingData.keyPoints.map((point, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="w-1 h-1 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator />

                <div>
                  <h5 className="font-medium mb-2">Action Items</h5>
                  <div className="space-y-2">
                    {meetingData.actionItems.map((item, index) => (
                      <div key={index} className="text-sm">
                        <p className="font-medium">{item.task}</p>
                        <p className="text-muted-foreground">
                          {item.assignee} • Due: {item.deadline}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <Button variant="outline" className="w-full mt-4 bg-transparent">
                <Download className="h-4 w-4 mr-2" />
                Export as PPT
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Chat Interface */}
        <div className="lg:col-span-2">
          <Card className="h-[700px] flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Chat with AI
              </CardTitle>
              <CardDescription>
                Ask questions about the meeting content, get summaries, or find specific information
              </CardDescription>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col p-0">
              {/* Chat Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {chatHistory.map((chat) => (
                    <div
                      key={chat.id}
                      className={`flex gap-3 ${chat.type === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`flex gap-3 max-w-[80%] ${chat.type === "user" ? "flex-row-reverse" : "flex-row"}`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            chat.type === "user" ? "bg-blue-600" : "bg-gray-600"
                          }`}
                        >
                          {chat.type === "user" ? (
                            <User className="h-4 w-4 text-white" />
                          ) : (
                            <Bot className="h-4 w-4 text-white" />
                          )}
                        </div>
                        <div
                          className={`rounded-lg p-3 ${
                            chat.type === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                          }`}
                        >
                          <p className="text-sm">{chat.content}</p>
                          <p className={`text-xs mt-1 ${chat.type === "user" ? "text-blue-100" : "text-gray-500"}`}>
                            {chat.timestamp}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Suggested Questions */}
              {chatHistory.length === 1 && (
                <div className="p-4 border-t bg-gray-50">
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb className="h-4 w-4 text-yellow-600" />
                    <span className="text-sm font-medium">Suggested Questions</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {suggestedQuestions.map((question, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => handleSuggestedQuestion(question)}
                        className="text-left justify-start h-auto p-2 text-xs"
                      >
                        {question}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Message Input */}
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    placeholder="Ask a question about this meeting..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} disabled={!message.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
