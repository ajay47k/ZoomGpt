"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Download, FileText } from "lucide-react"

interface TranscriptDialogProps {
  meetingTitle: string
  meetingDate: string
  transcript?: Array<{
    id: number
    speaker: string
    text: string
    timestamp: string
  }>
}

export function TranscriptDialog({ meetingTitle, meetingDate, transcript }: TranscriptDialogProps) {
  const [open, setOpen] = useState(false)

  // Lorem ipsum transcript data
  const loremTranscript = [
    {
      id: 1,
      speaker: "John Doe",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      timestamp: "10:00:15",
    },
    {
      id: 2,
      speaker: "Jane Smith",
      text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      timestamp: "10:00:45",
    },
    {
      id: 3,
      speaker: "Mike Johnson",
      text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
      timestamp: "10:01:12",
    },
    {
      id: 4,
      speaker: "Sarah Wilson",
      text: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.",
      timestamp: "10:01:30",
    },
    {
      id: 5,
      speaker: "Alice Brown",
      text: "Consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.",
      timestamp: "10:01:45",
    },
    {
      id: 6,
      speaker: "Bob Davis",
      text: "Nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.",
      timestamp: "10:02:15",
    },
    {
      id: 7,
      speaker: "Carol White",
      text: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.",
      timestamp: "10:02:45",
    },
    {
      id: 8,
      speaker: "John Doe",
      text: "Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit.",
      timestamp: "10:03:20",
    },
  ]

  const transcriptData = transcript || loremTranscript

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="ghost" onClick={() => setOpen(true)}>
          <FileText className="h-4 w-4 mr-2" />
          View Transcript
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Meeting Transcript
          </DialogTitle>
          <DialogDescription>
            {meetingTitle} • {meetingDate}
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center justify-between py-2">
          <div className="flex flex-wrap gap-1">
            <Badge variant="outline" className="text-xs">
              John Doe
            </Badge>
            <Badge variant="outline" className="text-xs">
              Jane Smith
            </Badge>
            <Badge variant="outline" className="text-xs">
              Mike Johnson
            </Badge>
            <Badge variant="outline" className="text-xs">
              Sarah Wilson
            </Badge>
            <Badge variant="outline" className="text-xs">
              Alice Brown
            </Badge>
            <Badge variant="outline" className="text-xs">
              Bob Davis
            </Badge>
            <Badge variant="outline" className="text-xs">
              Carol White
            </Badge>
          </div>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>

        <ScrollArea className="flex-1 w-full rounded-md border">
          <div className="space-y-4 p-4">
            {transcriptData.map((segment) => (
              <div key={segment.id} className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Badge variant="outline" className="text-xs">
                    {segment.speaker}
                  </Badge>
                  <span className="text-xs">{segment.timestamp}</span>
                </div>
                <p className="text-sm leading-relaxed pl-2 border-l-2 border-blue-100 break-words">{segment.text}</p>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
