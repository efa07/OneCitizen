"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import axios from "axios"

export default function WorkerSignup() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "WOREDA_WORKER" })
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await axios.post("http://localhost:5000/api/create/woreda", form)
      toast.success("Worker registered successfully!")
      router.push("/woreda/login") 
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Signup failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 rounded-xl shadow bg-white">
      <h2 className="text-2xl font-bold mb-4">Worker Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input name="name" placeholder="Full Name" onChange={handleChange} required />
        <Input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <Input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <select
          name="role"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="WOREDA_WORKER">Woreda Worker</option>
          <option value="ADMIN">Admin</option>
          <option value="SUPERVISOR">Supervisor</option>
        </select>
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Signing up..." : "Sign Up"}
        </Button>
      </form>
    </div>
  )
}
