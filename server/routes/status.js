import express from "express"
import { PrismaClient } from "@prisma/client"

const router = express.Router()
const prisma = new PrismaClient()

router.get("/:email", async (req, res) => {
  const { email } = req.params

  if (!email) return res.status(400).json({ error: "Missing Fayda ID" })
  console.log("fayde load")


  try {
    const latestRequest = await prisma.serviceRequest.findMany({
      where: { email },
      orderBy: { createdAt: "desc" },
    })

    if (!latestRequest) {
      return res.status(404).json({ message: "No service request found" })
    }

    return res.json(latestRequest)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: "Something went wrong" })
  }
})

export default router
