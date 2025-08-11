import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import QueryProvider from '@/config/QueryClientProvider';

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "ZoomGPT - AI-Powered Video Conferencing",
  description:
    "Transform your meetings with intelligent transcription, automated note-taking, and AI-powered insights.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          {children}
        </QueryProvider>
       </body>       
    </html>
  )
}
