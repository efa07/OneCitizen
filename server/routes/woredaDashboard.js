import express from 'express'
import { verifyWoredaToken } from '../middleware/auth.js'
import { PrismaClient } from '@prisma/client'

const router = express.Router()
const prisma = new PrismaClient()

router.get('/', verifyWoredaToken, async (req, res) => {
  try {
    const pendingRequests = await prisma.serviceRequest.findMany({
      where: {
        status: 'pending'
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    res.json({
      message: `Welcome to your wordspace, ${req.user.name}!`,
      data: {
        notifications: [],
        pendingRequests
      }
    })
  } catch (error) {
    console.error('Dashboard error:', error)
    res.status(500).json({ error: 'Something went wrong' })
  }
})

export default router
