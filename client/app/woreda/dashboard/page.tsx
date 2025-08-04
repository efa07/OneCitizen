"use client"

import React, { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, FileText, Printer } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import QRCodeCanvas  from "qrcode.react"

import Image from "next/image"

type DashboardData = {
  name: string
  data: {
    notifications: string[]
    pendingRequests: any[]
  }
}

export default function WoredaDashboardPage() {
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<DashboardData | null>(null)
  const [selectedRequest, setSelectedRequest] = useState<any | null>(null)

  const fetchData = async () => {
    const token = localStorage.getItem("woredaToken")
    if (!token) {
      toast.error("Unauthorized. Please login.")
      return
    }

    try {
      const res = await fetch("http://localhost:5000/api/woreda/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (!res.ok) throw new Error("Failed to fetch dashboard data")

      const json = await res.json()
      setData(json)
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin h-10 w-10 text-primary" />
      </div>
    )
  }

  return (
    <div className="p-6 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-3 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Welcome to your workspace</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          <p>Welcome back. You can manage service requests, respond to citizens, and upload results here.</p>
        </CardContent>
      </Card>

      <Card className="shadow-md lg:col-span-3">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <FileText className="w-5 h-5" /> Pending Requests
          </CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          {data?.data.pendingRequests.length ? (
            <table className="min-w-full text-sm text-left border border-gray-200 rounded-md overflow-hidden">
              <thead className="bg-gray-100 text-xs uppercase text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 border-b">#</th>
                  <th className="px-4 py-3 border-b">Full Name</th>
                  <th className="px-4 py-3 border-b">Service</th>
                  <th className="px-4 py-3 border-b">Date</th>
                  <th className="px-4 py-3 border-b text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.data.pendingRequests.map((req, index) => (
                  <tr
                    key={req.id}
                    className="hover:bg-gray-50 transition cursor-pointer"
                    onClick={() => setSelectedRequest(req)}
                  >
                    <td className="px-4 py-2 border-b">{index + 1}</td>
                    <td className="px-4 py-2 border-b">{req.fullName}</td>
                    <td className="px-4 py-2 border-b">{req.serviceType || "—"}</td>
                    <td className="px-4 py-2 border-b">{new Date(req.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-2 border-b text-right text-blue-600 hover:underline">
                      View
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-sm text-muted-foreground">No pending requests.</p>
          )}
        </CardContent>
      </Card>

      {selectedRequest && (
        <Card className="lg:col-span-3 shadow-xl print:border-none print:shadow-none">
          <CardHeader className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <CardTitle className="text-xl">
              🛠️ Processing Request #{selectedRequest.id}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 print:p-0 print:bg-white print:shadow-none">
            <div className="flex items-center gap-6 print:flex-col">
              <div className="w-32 h-32 border rounded-full overflow-hidden bg-gray-100 relative">
                {selectedRequest.photoUrl ? (
                  <Image
                    src={selectedRequest.photoUrl}
                    alt="Citizen Photo"
                    width={128}
                    height={128}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500 text-lg">
                    Avatar
                  </div>
                )}
              </div>
              <div>
                <p className="text-lg font-semibold">{selectedRequest.fullName}</p>
                <p className="text-sm text-muted-foreground">
                  {selectedRequest.serviceType}
                </p>
                <p className="text-sm text-muted-foreground">
                  Requested on: {new Date(selectedRequest.createdAt).toLocaleString()}
                </p>
              </div>
            </div>

            <Separator />

            <div className="flex items-center gap-4 print:flex-col">
              <div className="print:w-full">
                <label className="block text-sm font-medium">Response Note</label>
                <Textarea
                  name="responseNote"
                  required
                  rows={4}
                  placeholder="Write your response here..."
                />
              </div>
              <div className="print:w-full">
                <label className="block text-sm font-medium">Upload Result File</label>
                <Input type="file" name="resultFile" required />
              </div>
            </div>

            <Separator />

            <div className="mt-4 print:hidden">
              <form
                onSubmit={async (e) => {
                  e.preventDefault()

                  const formData = new FormData(e.currentTarget)
                  formData.append("requestId", selectedRequest.id)

                  const token = localStorage.getItem("woredaToken")

                  try {
                    const res = await fetch("http://localhost:5000/api/woreda/process-request", {
                      method: "POST",
                      headers: { Authorization: `Bearer ${token}` },
                      body: formData,
                    })

                    if (!res.ok) throw new Error("Failed to process request")
                    toast.success("✅ Request processed and file sent!")
                    setSelectedRequest(null)
                    await fetchData()
                  } catch (err: any) {
                    toast.error(err.message)
                  }
                }}
              >
                <Button type="submit">✅ Submit Result</Button>
              </form>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
