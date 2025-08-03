"use client"

import { useEffect, useState } from "react"
import { Loader2, CheckCircle, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type RequestStatus = "pending" | "approved" | "rejected" | string

interface ServiceRequest {
  id: string
  serviceType: string
  status: RequestStatus
  reason: string
  responseNote: string | null
  createdAt: string
  faydaId: string
  updatedAt: string
}

interface UserInfo {
  faydaId: string
}




export default function ServiceRequestStatus() {
  const [request, setRequest] = useState<ServiceRequest | null>(null)
  const [loading, setLoading] = useState(true)

const userInfoRaw = localStorage.getItem("userInfo")
const userInfo: UserInfo | null = userInfoRaw ? JSON.parse(userInfoRaw) : null
const faydaId = userInfo?.faydaId ?? null
  
useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch(`http:/localhost:5000/api/userRequest/status/${faydaId}`)
        const data = await res.json()
        setRequest(data)
      } catch (error) {
        console.error("Failed to fetch status:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStatus()
  }, [faydaId])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="animate-spin h-6 w-6 text-muted-foreground" />
      </div>
    )
  }

  if (!request) {
    return (
      <Card className="text-center">
        <CardHeader>
          <CardTitle>No Request Found</CardTitle>
        </CardHeader>
        <CardContent>
          <p>You haven’t submitted any service requests yet.</p>
        </CardContent>
      </Card>
    )
  }

type RequestStatus = "pending" | "approved" | "rejected"

const status = request.status as RequestStatus

const statusColorMap: Record<RequestStatus, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  approved: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
}

const statusIconMap: Record<RequestStatus, JSX.Element> = {
  pending: <Loader2 className="animate-spin h-5 w-5" />,
  approved: <CheckCircle className="h-5 w-5 text-green-500" />,
  rejected: <AlertTriangle className="h-5 w-5 text-red-500" />,
}

const statusColor = statusColorMap[status] ?? "bg-gray-100 text-gray-800"
const statusIcon = statusIconMap[status] ?? <FileText className="h-5 w-5 text-gray-500" />


  return (
    <Card>
      <CardHeader>
        <CardTitle>Service Request Status</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <span>Service Type</span>
          <Badge variant="secondary">{request.serviceType}</Badge>
        </div>
        <div className="flex items-center justify-between">
          <span>Status</span>
          <span className={cn("px-2 py-1 rounded-md text-sm flex items-center gap-1", statusColor)}>
            {statusIcon}
            {request.status.toUpperCase()}
          </span>
        </div>
        <div>
          <p className="text-muted-foreground text-sm">Reason</p>
          <p>{request.reason}</p>
        </div>
        {request.responseNote && (
          <div>
            <p className="text-muted-foreground text-sm">Response Note</p>
            <p>{request.responseNote}</p>
          </div>
        )}
        <div className="text-xs text-muted-foreground">
          Last updated: {new Date(request.updatedAt).toLocaleString()}
        </div>
      </CardContent>
    </Card>
  )
}
