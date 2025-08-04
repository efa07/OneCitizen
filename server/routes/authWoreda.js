import bcrypt from "bcrypt"
import express from "express"
import { PrismaClient } from '@prisma/client'

const router = express.Router()
const prisma = new PrismaClient()

router.post("/", async (req, res) => {
  const { name, email, password, role } = req.body

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Missing required fields" })
  }

  try {
    const existing = await prisma.worker.findUnique({ where: { email } })
    if (existing) return res.status(400).json({ error: "Email already registered" })

    const hashedPassword = await bcrypt.hash(password, 10)

    const newWorker = await prisma.worker.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role || "WOREDA_WORKER",
      },
    })

    res.status(201).json({ message: "Worker registered", worker: { id: newWorker.id, name: newWorker.name, email: newWorker.email } })
  } catch (err) {
    console.error("Signup failed:", err)
    res.status(500).json({ error: "Internal server error" })
  }
})

export default router
