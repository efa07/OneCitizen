"use client"

import React, { useEffect, useState } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts"

export default function WorkerStatsChart() {
  const [data, setData] = useState([])

  useEffect(() => {
    fetch("http://localhost:5000/api/worker-stats")
      .then(res => {
        if (!res.ok) throw new Error("Network response was not ok")
        return res.json()
      })
      .then(setData)
      .catch(err => {
        console.error("Failed to fetch stats:", err)
      })
  }, [])

  return (
    <div className="w-full h-[400px]">
      <h2 className="text-xl font-semibold mb-4">Worker Performance</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
