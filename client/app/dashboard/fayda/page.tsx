"use client"

import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BadgeCheck, RefreshCcw, UserCircle2 } from "lucide-react"

export default function FaydaPage() {
  const handleSync = () => {
    alert("Syncing with Fayda...");
    // TODO: Add actual sync logic/API call here
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-2 text-primary">My Fayda Info</h1>
      <p className="text-muted-foreground mb-8">
        View your digital identity and sync updated data from the Fayda system.
      </p>

      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center gap-4">
          <UserCircle2 className="w-10 h-10 text-primary" />
          <div>
            <CardTitle className="text-xl">Efa Tariku</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              Fayda ID: 1234-5678-9012
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><span className="font-medium text-foreground">DOB:</span> Jan 1, 2000</li>
            <li><span className="font-medium text-foreground">Gender:</span> Male</li>
            <li><span className="font-medium text-foreground">Region:</span> Addis Ababa</li>
            <li><span className="font-medium text-foreground">Status:</span> <BadgeCheck className="inline w-4 h-4 text-green-600" /> Verified</li>
          </ul>

          <div className="mt-6 flex gap-4">
            <Button onClick={handleSync} variant="default">
              <RefreshCcw className="w-4 h-4 mr-2" /> Sync with Fayda
            </Button>
            <Button variant="secondary" disabled>
              Update Info (Coming Soon)
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
