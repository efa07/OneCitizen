"use client"

import { useParams } from "next/navigation"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export default function ServiceRequestForm() {
  const { slug } = useParams()
  const [form, setForm] = useState({
    fullName: "",
    address: "",
    reason: "",
  })

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    const res = await fetch("/api/request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ serviceType: slug, ...form }),
    })

    if (res.ok) {
      alert("Request submitted!")
    } else {
      alert("Error submitting request.")
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 capitalize">{slug?.toString().replace("-", " ")} Request</h1>
      <div className="space-y-4">
        <Input
          placeholder="Full Name"
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
        />
        <Input
          placeholder="Address"
          name="address"
          value={form.address}
          onChange={handleChange}
        />
        <Textarea
          placeholder="Reason for request"
          name="reason"
          value={form.reason}
          onChange={handleChange}
        />
        <Button onClick={handleSubmit}>Submit Request</Button>
      </div>
    </div>
  )
}
