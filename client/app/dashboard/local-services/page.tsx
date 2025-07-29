"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Home,
  MapPin,
  FileText,
  Building2,
  BadgeCheck,
} from "lucide-react"

const services = [
  {
    title: "Residency Letter",
    description: "Request a letter confirming your place of residence.",
    icon: <MapPin className="w-6 h-6 text-primary" />,
    action: () => alert("Request Residency Letter"),
  },
  {
    title: "House Registration",
    description: "Register your house under your name officially.",
    icon: <Home className="w-6 h-6 text-primary" />,
    action: () => alert("Register House"),
  },
  {
    title: "Business Permit",
    description: "Apply for a small business or vendor permit.",
    icon: <Building2 className="w-6 h-6 text-primary" />,
    action: () => alert("Apply for Business Permit"),
  },
  {
    title: "ID Verification",
    description: "Verify your Fayda/National ID at your local office.",
    icon: <BadgeCheck className="w-6 h-6 text-primary" />,
    action: () => alert("Verify ID"),
  },
  {
    title: "Document Attestation",
    description: "Get official stamps on important documents.",
    icon: <FileText className="w-6 h-6 text-primary" />,
    action: () => alert("Attest Document"),
  },
]

export default function LocalServicesPage() {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-2 text-primary">
        Local Woreda/Kebele Services
      </h1>
      <p className="text-muted-foreground mb-8">
        Access essential services directly from your local administration.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, idx) => (
          <Card
            key={idx}
            className="hover:shadow-lg transition-shadow duration-300"
          >
            <CardHeader className="flex flex-row items-center gap-4">
              {service.icon}
              <CardTitle>{service.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {service.description}
              </p>
              <Button onClick={service.action}>Request</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
