"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

export default function PenaltyPaymentForm({ user }: { user: any }) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget as HTMLFormElement)
    const obj = Object.fromEntries(data.entries())
    console.log("Penalty Payment submitted:", obj)
  }

  return (
    <Card className="p-6 space-y-6">
      <CardHeader>
        <CardTitle className="text-xl">Driver Penalty Payment</CardTitle>
      </CardHeader>

      <CardContent>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-muted-foreground">Driver Information</h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" name="fullName" defaultValue={user.name} readOnly />
              </div>

              <div>
                <Label htmlFor="faydaId">Fayda ID</Label>
                <Input id="faydaId" name="faydaId" defaultValue={user.faydaId} readOnly />
              </div>

              <div>
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input id="phoneNumber" name="phoneNumber" defaultValue={user.phoneNumber} readOnly />
              </div>

              <div>
                <Label htmlFor="region">Region</Label>
                <Input id="region" name="region" defaultValue={user.region} readOnly />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-muted-foreground">Violation Details</h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="violationReason">Violation Reason</Label>
                <Input
                  id="violationReason"
                  name="violationReason"
                  placeholder="e.g. Speeding, No Seatbelt"
                  required
                />
              </div>

              <div>
                <Label htmlFor="offenseDate">Offense Date</Label>
                <Input id="offenseDate" name="offenseDate" type="date" required />
              </div>

              <div>
                <Label htmlFor="vehiclePlate">Vehicle Plate Number</Label>
                <Input id="vehiclePlate" name="vehiclePlate" placeholder="e.g. 3A-12345" required />
              </div>

              <div>
                <Label htmlFor="amount">Penalty Amount (ETB)</Label>
                <Input id="amount" name="amount" type="number" min={0} required />
              </div>
            </div>

            <div>
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                name="notes"
                placeholder="Optional details, e.g. officer remarks, traffic location, etc."
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit" className="w-full md:w-auto">
              Submit Payment
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
