"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Banknote, History, FileCheck2 } from "lucide-react"

const taxServices = [
  {
    title: "Tax Status",
    description: "Check your current tax status and obligations.",
    icon: <Banknote className="w-6 h-6 text-primary" />,
    action: () => alert("Checking Tax Status..."),
  },
  {
    title: "Payment History",
    description: "View your historical tax payments and receipts.",
    icon: <History className="w-6 h-6 text-primary" />,
    action: () => alert("Fetching Payment History..."),
  },
  {
    title: "Tax Clearance",
    description: "Request official clearance for business or travel.",
    icon: <FileCheck2 className="w-6 h-6 text-primary" />,
    action: () => alert("Requesting Tax Clearance..."),
  },
]

export default function TaxesPage() {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-2 text-primary">Tax & Revenue</h1>
      <p className="text-muted-foreground mb-8">
        Check your tax status, track payments, and request clearances easily.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {taxServices.map((service, idx) => (
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
