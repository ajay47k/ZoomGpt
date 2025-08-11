"use client"

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Video, MessageSquare, Brain, Calendar, Shield, Zap } from "lucide-react"
import { useRouter } from "next/navigation"
export default function LandingPage() {
    const router = useRouter()
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Video className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold">ZoomGPT</span>
          </div>
          <div className="flex gap-4">
            <Button variant="ghost" onClick={() => router.push("/login")} >
              Login
            </Button>
            <Button onClick={() => router.push("/signup")} >
              Sign Up
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          AI-Powered Video Conferencing
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Transform your meetings with intelligent transcription, automated note-taking, and AI-powered insights. Never
          miss important details again.
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg" onClick={() => router.push("/signup")} >
            Start Today!!
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="/demo">Watch Demo</a>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Powerful Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <Video className="h-12 w-12 text-blue-600 mb-4" />
              <CardTitle>HD Video Conferencing</CardTitle>
              <CardDescription>
                Crystal clear video calls with multi-participant support and screen sharing
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <MessageSquare className="h-12 w-12 text-green-600 mb-4" />
              <CardTitle>Live Transcription</CardTitle>
              <CardDescription>Real-time speech-to-text transcription with high accuracy</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Brain className="h-12 w-12 text-purple-600 mb-4" />
              <CardTitle>AI Meeting Summaries</CardTitle>
              <CardDescription>Automatically generated meeting notes and key insights</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Calendar className="h-12 w-12 text-orange-600 mb-4" />
              <CardTitle>Smart Scheduling</CardTitle>
              <CardDescription>Easy meeting scheduling with calendar integration</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Shield className="h-12 w-12 text-red-600 mb-4" />
              <CardTitle>Enterprise Security</CardTitle>
              <CardDescription>End-to-end encryption and enterprise-grade security</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Zap className="h-12 w-12 text-yellow-600 mb-4" />
              <CardTitle>AI Chat</CardTitle>
              <CardDescription>Query past meetings and get instant answers from your meeting history</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Meetings?</h2>
          <p className="text-xl mb-8">Join thousands of teams already using ZoomGPT</p>
          <Button size="lg" variant="secondary" onClick={() => router.push("/signup")}>
            Get Started Today
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-2 mb-8">
            <Video className="h-6 w-6" />
            <span className="text-lg font-bold">ZoomGPT</span>
          </div>
          <div className="text-center text-gray-400">
            <p>&copy; 2024 ZoomGPT. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
