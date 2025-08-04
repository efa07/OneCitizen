"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function LicenseRenewalForm({ user }: { user: any }) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget as HTMLFormElement)
    const obj = Object.fromEntries(data.entries())
    console.log("Renewal submitted:", obj)
  }

  return (
    <Card className="p-6 space-y-6">
      <CardHeader>
        <CardTitle className="text-xl">Driver's License Renewal</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-muted-foreground">Personal Information</h3>

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
                <Label htmlFor="birthdate">Date of Birth</Label>
                <Input id="birthdate" name="birthdate" defaultValue={user.birthdate} readOnly />
              </div>

              <div>
                <Label htmlFor="gender">Gender</Label>
                <Input id="gender" name="gender" defaultValue={user.gender} readOnly />
              </div>

              <div>
                <Label htmlFor="nationality">Nationality</Label>
                <Input id="nationality" name="nationality" defaultValue={user.nationality} readOnly />
              </div>

              <div>
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input id="phoneNumber" name="phoneNumber" defaultValue={user.phoneNumber} />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-muted-foreground">License Information</h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="currentLicenseNumber">Current License Number</Label>
                <Input id="currentLicenseNumber" name="currentLicenseNumber" required placeholder="e.g. AB12345678" />
              </div>

              <div>
                <Label htmlFor="issuedDate">Issued Date</Label>
                <Input type="date" id="issuedDate" name="issuedDate" required />
              </div>

              <div>
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input type="date" id="expiryDate" name="expiryDate" required />
              </div>

              <div>
                <Label htmlFor="licenseClass">License Class</Label>
                <Input id="licenseClass" name="licenseClass" required placeholder="e.g. A, B, C" />
              </div>
            </div>

            <div>
              <Label htmlFor="notes">Additional Notes (Optional)</Label>
              <Textarea id="notes" name="notes" placeholder="Anything else we should know?" />
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit" className="w-full md:w-auto">
              Submit Renewal Request
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
