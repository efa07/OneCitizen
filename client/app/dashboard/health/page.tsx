"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Stethoscope, Syringe, Hospital } from "lucide-react"

const healthServices = [
  {
    title: "Health Card",
    description: "View and download your digital health insurance card.",
    icon: <Stethoscope className="w-6 h-6 text-primary" />,
    action: () => alert("Access Health Card"),
  },
  {
    title: "Vaccination Records",
    description: "Check your immunization status and vaccine history.",
    icon: <Syringe className="w-6 h-6 text-primary" />,
    action: () => alert("View Vaccination Records"),
  },
  {
    title: "Nearby Clinics",
    description: "Locate public health centers around your area.",
    icon: <Hospital className="w-6 h-6 text-primary" />,
    action: () => alert("Browse Clinics"),
  },
]

export default function HealthPage() {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-2 text-primary">Health Services</h1>
      <p className="text-muted-foreground mb-8">
        Access your digital health data and find public clinics near you.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {healthServices.map((service, idx) => (
          <Card key={idx} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center gap-4">
              {service.icon}
              <CardTitle>{service.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {service.description}
              </p>
              <Button onClick={service.action}>Access</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
