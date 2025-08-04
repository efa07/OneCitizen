import express from "express"
import { PrismaClient } from '@prisma/client'

const router = express.Router()
const prisma = new PrismaClient()

router.get("/", async (req, res) => {
  try {
    const stats = await prisma.worker.findMany({
      select: {
        name: true,
        processedRequests: {
          select: {
            id: true,
          },
        },
      },
    })

    const data = stats.map(worker => ({
      name: worker.name,
      count: worker.processedRequests.length,
    }))

    res.json(data)
  } catch (error) {
    console.error("Failed to fetch worker stats", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

export default router
