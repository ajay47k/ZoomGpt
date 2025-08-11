"use client"

import type * as React from "react"
import { Home, MessageSquare, Plus, Settings, Video, Clock, LogOut } from "lucide-react"
import { usePathname } from "next/navigation"
import { logout } from "@/lib/api"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { QueryClient, useMutation } from "@tanstack/react-query"
import queryClient from "@/config/QueryClient"

const navigationItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Previous Meetings",
    url: "/meetings/previous",
    icon: MessageSquare,
  },
  {
    title: "Upcoming Meetings",
    url: "/meetings/upcoming",
    icon: Clock,
  },
  {
    title: "Schedule Meeting",
    url: "/meetings/schedule",
    icon: Plus,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const { setOpen } = useSidebar()
  const router = useRouter()

  const handleLogoClick = () => {
    setOpen(false)
  }
  // const router = useRouter()
 const {mutate:signOut}= useMutation({
    mutationFn:logout,
    onSettled: () => {
      queryClient.clear();
      // Redirect to landing page after logout
      router.replace("/login")
    }
  })
  const handleLogout = () => {
      signOut()
  }


  return (
    <Sidebar collapsible="offcanvas" className="border-r z-50" {...props}>
      <SidebarHeader className="p-4">
        <button onClick={handleLogoClick} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Video className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-bold">ZoomGPT</span>
        </button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 space-y-2">
        <Button variant="outline" className="w-full bg-transparent" size="sm" onClick={handleLogout}>
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
        <Button className="w-full" size="sm" asChild>
          <a href="/meetings/schedule?type=instant">
            <Plus className="h-4 w-4 mr-2" />
            Start Instant Meeting
          </a>
        </Button>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
