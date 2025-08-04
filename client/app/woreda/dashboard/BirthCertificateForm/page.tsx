"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import axios from "axios"
import { toast } from "sonner"

export default function BirthCertificateForm() {
  const [form, setForm] = useState({
    certificateNumber: "",
    fullName: "",
    gender: "",
    birthdate: "",
    birthPlace: "",
    nationality: "",
    fatherName: "",
    motherName: "",
    issuedBy: "",
  })

  const [userId, setUserId] = useState("")

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}")
    setUserId(userInfo?.id || "")
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await axios.post("http://localhost:5000/api/birth-certificate", {
        ...form,
        userId,
      })
      toast.success("Birth Certificate created successfully!")
    } catch (err) {
      toast.error("Something went wrong. Check console.")
      console.error(err)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 min-w-xl mx-auto p-6 bg-white rounded shadow">
      {[
        { label: "Certificate Number", name: "certificateNumber" },
        { label: "Full Name", name: "fullName" },
        { label: "Gender", name: "gender" },
        { label: "Birthdate", name: "birthdate", type: "date" },
        { label: "Birth Place", name: "birthPlace" },
        { label: "Nationality", name: "nationality" },
        { label: "Father's Name", name: "fatherName" },
        { label: "Mother's Name", name: "motherName" },
        { label: "Issued By", name: "issuedBy" },
      ].map(({ label, name, type = "text" }) => (
        <div key={name}>
          <Label htmlFor={name}>{label}</Label>
          <Input
            id={name}
            name={name}
            type={type}
            value={(form as any)[name]}
            onChange={handleChange}
            required
          />
        </div>
      ))}

      <Button type="submit" className="w-full">
        Submit Birth Certificate
      </Button>
    </form>
  )
}
