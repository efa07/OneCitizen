import express from "express"
import { PrismaClient } from "@prisma/client"

const router = express.Router()
const prisma = new PrismaClient()

router.post("/", async (req, res) => {
  try {
    const {
      certificateNumber,
      fullName,
      gender,
      birthdate,
      birthPlace,
      nationality,
      fatherName,
      motherName,
      issuedBy,
    } = req.body

    const existing = await prisma.birthCertificate.findUnique({ where: { certificateNumber } })
    if (existing) {
      return res.status(400).json({ message: "Certificate already exists for this user." })
    }

    const cert = await prisma.birthCertificate.create({
      data: {
        certificateNumber,
        fullName,
        gender,
        birthdate,
        birthPlace,
        nationality,
        fatherName,
        motherName,
        issuedBy,
      },
    })

    res.json(cert)
  } catch (err) {
    console.error("Error creating birth certificate:", err)
    res.status(500).json({ message: "Internal server error" })
  }
})

router.get("/search/:certificateNumber", async (req, res) => {
  const { certificateNumber } = req.params

  try {
    const cert = await prisma.birthCertificate.findUnique({
      where: { certificateNumber },
    })

    if (!cert) return res.status(404).json({ message: "Certificate not found" })

    res.json(cert)
  } catch (err) {
    console.error("Search error:", err)
    res.status(500).json({ message: "Internal server error" })
  }
})


export default router
