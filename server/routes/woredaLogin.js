import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt"
import { PrismaClient } from '@prisma/client'

const router = express.Router()
const prisma = new PrismaClient()

const JWT_SECRET = process.env.JWT_SECRET || "supersecret"

router.post('/', async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required" })
  }

  try {
    const worker = await prisma.worker.findUnique({
      where: { email },
    })

    if (!worker) {
      return res.status(401).json({ error: "Invalid credentials" })
    }

    const isMatch = await bcrypt.compare(password, worker.password)

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" })
    }

    const token = jwt.sign(
      { id: worker.id, email: worker.email, role: "woreda" },
      JWT_SECRET,
      { expiresIn: "2h" }
    )

    res.json({
      message: "Login successful",
      token,
      user: { name: worker.name, email: worker.email },
    })
  } catch (err) {
    console.error("Login error:", err)
    res.status(500).json({ error: "Server error during login" })
  }
})

export default router
