"use client"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Video } from "lucide-react"

export function TopHeader() {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-background px-4 sticky top-0 z-40">
      <SidebarTrigger className="-ml-1" />
      <a href="/dashboard" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
        <Video className="h-6 w-6 text-blue-600" />
        <span className="text-lg font-bold">ZoomGPT</span>
      </a>
    </header>
  )
}
