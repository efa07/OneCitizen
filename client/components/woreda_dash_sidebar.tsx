"use client"

import * as React from "react"
import {
  ClipboardList,
  FileSearch,
  Megaphone,
  BarChart3,
  Settings2,
  Map,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Woreda Worker",
    email: "worker@woreda.gov.et",
    avatar: "/avatars/woreda-worker.jpg",
  },
  teams: [
    {
      name: "OneCitizen Admin",
      logo: Map,
      plan: "Government",
    },
  ],
  navMain: [
    {
      title: "Service Requests",
      url: "#",
      icon: ClipboardList,
      isActive: true,
      items: [
        {
          title: "Pending Requests",
          url: "/woreda/requests/pending",
        },
        {
          title: "Approved Requests",
          url: "/woreda/requests/approved",
        },
        {
          title: "Rejected Requests",
          url: "/woreda/requests/rejected",
        },
      ],
    },
    {
      title: "Citizen Records",
      url: "#",
      icon: FileSearch,
      items: [
        {
          title: "Search Citizens",
          url: "/woreda/citizens/search",
        },
        {
          title: "Manage Records",
          url: "/woreda/citizens/manage",
        },
      ],
    },
    {
      title: "Announcements",
      url: "#",
      icon: Megaphone,
      items: [
        {
          title: "Post Announcement",
          url: "/woreda/announcements/new",
        },
        {
          title: "Manage Announcements",
          url: "/woreda/announcements/manage",
        },
      ],
    },
    {
      title: "Reports",
      url: "#",
      icon: BarChart3,
      items: [
        {
          title: "Service Statistics",
          url: "/woreda/reports/statistics",
        },
        {
          title: "Citizen Insights",
          url: "/woreda/reports/insights",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Profile Settings",
          url: "/woreda/settings/profile",
        },
        {
          title: "System Settings",
          url: "/woreda/settings/system",
        },
      ],
    },
  ],
  projects: [],
}

export function WoredaSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}")
  const { email, name, picture: avatar } = userInfo

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={{ email, name, avatar }} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
