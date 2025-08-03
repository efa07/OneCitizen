import express from "express"
import { PrismaClient } from "@prisma/client"

const router = express.Router()
const prisma = new PrismaClient()

router.get("/:faydaId", async (req, res) => {
  const { faydaId } = req.params

  if (!faydaId) return res.status(400).json({ error: "Missing Fayda ID" })
console.log(faydaId)
  try {
    const latestRequest = await prisma.serviceRequest.findFirst({
      where: { faydaId },
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
