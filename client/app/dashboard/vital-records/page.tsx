"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, UserPlus, Cross, BookUser } from "lucide-react"

const vitalRecords = [
  {
    title: "Birth Certificate",
    description: "Request or verify your official birth certificate record.",
    icon: <UserPlus className="w-6 h-6 text-primary" />,
    action: () => alert("Request Birth Certificate"),
  },
  {
    title: "Death Certificate",
    description: "Request documentation for a deceased family member.",
    icon: <Cross className="w-6 h-6 text-primary" />,
    action: () => alert("Request Death Certificate"),
  },
  {
    title: "Marriage Certificate",
    description: "Apply or retrieve proof of marriage from public records.",
    icon: <Heart className="w-6 h-6 text-primary" />,
    action: () => alert("Request Marriage Certificate"),
  },
]

export default function VitalRecordsPage() {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-2 text-primary">Vital Records</h1>
      <p className="text-muted-foreground mb-8">
        Request and manage official birth, death, and marriage certificates.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {vitalRecords.map((record, idx) => (
          <Card
            key={idx}
            className="hover:shadow-lg transition-shadow duration-300"
          >
            <CardHeader className="flex flex-row items-center gap-4">
              {record.icon}
              <CardTitle>{record.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {record.description}
              </p>
              <Button onClick={record.action}>Request</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
