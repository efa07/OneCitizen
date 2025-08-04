"use client"

import { useEffect, useState } from "react"
import {
  Loader2,
  FileText,
  CheckCircle,
  AlertTriangle,
  Filter,
  Clock,
} from "lucide-react"

type RequestStatus = "pending" | "approved" | "rejected" | "all"

interface ServiceRequest {
  id: string
  serviceType: string
  status: RequestStatus
  reason: string
  responseNote: string | null
  createdAt: string
  updatedAt: string
}

interface UserInfo {
  email: string
}

const statusColorMap: Record<RequestStatus, string> = {
  pending: "bg-yellow-100 text-yellow-800 ring-yellow-500/20",
  approved: "bg-green-200 text-green-900 ring-green-600/20",
  rejected: "bg-red-100 text-red-800 ring-red-500/20",
  all: "bg-gray-100 text-gray-800 ring-gray-500/20",
}

const statusIconMap: Record<RequestStatus, JSX.Element> = {
  pending: <Clock className="h-5 w-5 text-yellow-500" />,
  approved: <CheckCircle className="h-5 w-5 text-green-600" />,
  rejected: <AlertTriangle className="h-5 w-5 text-red-500" />,
  all: <Filter className="h-5 w-5 text-gray-500" />,
}

export default function ServiceRequestStatus() {
  const [requests, setRequests] = useState<ServiceRequest[]>([])
  const [filteredRequests, setFilteredRequests] = useState<ServiceRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<RequestStatus>("all")

  const userInfoRaw = localStorage.getItem("userInfo")
  const userInfo: UserInfo | null = userInfoRaw ? JSON.parse(userInfoRaw) : null
  const email = userInfo?.email ?? null

  // Calculate counts for each status
  const statusCounts = {
    pending: requests.filter((req) => req.status === "pending").length,
    approved: requests.filter((req) => req.status === "approved").length,
    rejected: requests.filter((req) => req.status === "rejected").length,
  }

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/userRequest/status/${email}`)
        const data = await res.json()
        setRequests(data)
        setFilteredRequests(data)
      } catch (error) {
        console.error("Failed to fetch service requests:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStatus()
  }, [email])

  useEffect(() => {
    if (filter === "all") {
      setFilteredRequests(requests)
    } else {
      setFilteredRequests(requests.filter((req) => req.status === filter))
    }
  }, [filter, requests])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    )
  }

  if (requests.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px] bg-gray-50 rounded-lg">
        <div className="text-center space-y-4">
          <FileText className="h-12 w-12 mx-auto text-gray-400" />
          <h2 className="text-xl font-semibold text-gray-800">No Requests Found</h2>
          <p className="text-gray-500">You haven’t submitted any service requests yet.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Summary Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center gap-3 p-3 rounded-md bg-yellow-50">
          <Clock className="h-6 w-6 text-yellow-500" />
          <div>
            <p className="text-sm text-yellow-800">Pending</p>
            <p className="text-lg font-semibold text-yellow-900">{statusCounts.pending}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 rounded-md bg-green-50">
          <CheckCircle className="h-6 w-6 text-green-600" />
          <div>
            <p className="text-sm text-green-800">Approved</p>
            <p className="text-lg font-semibold text-green-900">{statusCounts.approved}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 rounded-md bg-red-50">
          <AlertTriangle className="h-6 w-6 text-red-500" />
          <div>
            <p className="text-sm text-red-800">Rejected</p>
            <p className="text-lg font-semibold text-red-900">{statusCounts.rejected}</p>
          </div>
        </div>
      </div>


      {/* request Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredRequests.map((request) => {
          const status = request.status as RequestStatus
          const statusColor = statusColorMap[status] ?? "bg-gray-100 text-gray-800 ring-gray-500/20"
          const statusIcon = statusIconMap[status] ?? <FileText className="h-5 w-5 text-gray-500" />

          return (
            <div
              key={request.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-100"
            >
              <div className="p-5">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">{request.serviceType}</h3>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 ${statusColor} ring-1`}
                  >
                    {statusIcon}
                    {status.toUpperCase()}
                  </span>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Reason</p>
                    <p className="text-gray-700">{request.reason}</p>
                  </div>
                  {request.responseNote && (
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Response Note</p>
                      <p className="text-gray-700">{request.responseNote}</p>
                    </div>
                  )}
                  <p className="text-xs text-gray-400">
                    Last updated: {new Date(request.updatedAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}