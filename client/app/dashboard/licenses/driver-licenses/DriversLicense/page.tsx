"use client"

import React, { useState, useEffect } from "react"
import LicenseRenewalForm from "../LicenseRenewalForm"
import PenaltyPaymentForm from "../PenaltyPaymentForm"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"

export default function DriversLicense() {
  const [selection, setSelection] = useState<"renewal" | "penalty" | null>(null)
  const [userData, setUserData] = useState<any>(null)

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo")
    if (userInfo) {
      setUserData(JSON.parse(userInfo))
    }
  }, [])

  if (!userData) {
    return (
      <div className="p-6 flex justify-center items-center h-[60vh]">
        <span className="text-gray-600 text-lg animate-pulse">Loading user info...</span>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <Card className="shadow-xl rounded-2xl border border-muted bg-background/60 backdrop-blur-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-primary">
            Driver's License Service
          </CardTitle>
        </CardHeader>

        <CardContent>
          <AnimatePresence mode="wait">
            {!selection ? (
              <motion.div
                key="selection"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-6 text-center"
              >
                <h2 className="text-lg font-medium text-muted-foreground">
                  What would you like to do today?
                </h2>
                <div className="flex justify-center gap-4">
                  <Button size="lg" onClick={() => setSelection("renewal")}>
                    Renew License
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setSelection("penalty")}
                  >
                    Pay Penalty
                  </Button>
                </div>
              </motion.div>
            ) : selection === "renewal" ? (
              <motion.div
                key="renewal"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <LicenseRenewalForm user={userData} />
              </motion.div>
            ) : (
              <motion.div
                key="penalty"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.3 }}
              >
                <PenaltyPaymentForm user={userData} />
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  )
}
