import type React from "react"

export default function MeetingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // No sidebar or header for meeting rooms - full screen experience
  return <>{children}</>
}
