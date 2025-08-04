"use client"

import React, { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, FileText } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

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
  console.log(data)

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
          <CardTitle className="text-2xl">Welcome to your workspace </CardTitle>
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
        <Card className="lg:col-span-3 shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl">🛠️ Process Request #{selectedRequest.id}</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={async (e) => {
                e.preventDefault()

                const formData = new FormData(e.currentTarget)
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
              className="space-y-4"
            >
              <Input type="hidden" name="requestId" value={selectedRequest.id} />

              <div className="space-y-1">
                <label className="block text-sm font-medium">Response Note</label>
                <Textarea
                  name="responseNote"
                  required
                  rows={4}
                  placeholder="Write your response here..."
                />
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium">Upload Result File</label>
                <Input type="file" name="resultFile" required />
              </div>

              <Separator className="my-4" />
              <Button type="submit" className="w-full md:w-auto">
                ✅ Submit Result
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
