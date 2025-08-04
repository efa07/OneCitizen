"use client"

import { useState, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import axios from "axios"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import {QRCodeCanvas}  from "qrcode.react"
import { UserCircle } from "lucide-react"

type Certificate = {
  certificateNumber: string
  fullName: string
  gender: string
  birthdate: string
  birthPlace: string
  nationality: string
  fatherName: string
  motherName: string
  issuedBy: string
  issuedAt: string
  picture?: string 
}

export default function BirthCertificateSearch() {
  const [certificateNumber, setCertificateNumber] = useState("")
  const [certificate, setCertificate] = useState<Certificate | null>(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const certRef = useRef<HTMLDivElement | null>(null)

  const handleSearch = async () => {
    setLoading(true)
    setCertificate(null)
    setError("")

    try {
      const res = await axios.get<Certificate>(
        `http://localhost:5000/api/birth-certificate/search/${certificateNumber}`
      )
      setCertificate(res.data)
    } catch (err: any) {
      if (err.response?.status === 404) {
        setError("Certificate not found.")
      } else {
        setError("Something went wrong.")
      }
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = async () => {
    if (!certRef.current) return
    const canvas = await html2canvas(certRef.current)
    const imgData = canvas.toDataURL("image/png")
    const pdf = new jsPDF("p", "mm", "a4")
    const width = pdf.internal.pageSize.getWidth()
    const height = (canvas.height * width) / canvas.width
    pdf.addImage(imgData, "PNG", 0, 0, width, height)
    pdf.save(`BirthCertificate-${certificate?.certificateNumber}.pdf`)
  }

  const handlePrint = () => window.print()

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow print:bg-white print:shadow-none print:p-0 print:max-w-full">
      <h2 className="text-2xl font-bold mb-6 text-center font-serif tracking-wide">
        Search Digital Birth Certificate
      </h2>

      <div className="flex gap-2 items-end mb-6 print:hidden">
        <div className="flex-1">
          <Label htmlFor="cert">Certificate Number</Label>
          <Input
            id="cert"
            value={certificateNumber}
            onChange={(e) => setCertificateNumber(e.target.value)}
            placeholder="Enter certificate number"
          />
        </div>
        <Button onClick={handleSearch} disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </Button>
      </div>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {certificate && (
        <Card
          ref={certRef}
          className="relative overflow-hidden bg-[url('/bg-texture.png')] bg-cover bg-center border border-gray-300 print:border-none print:shadow-none print:rounded-none"
        >
          <CardHeader className="bg-blue-50 py-4 px-6 border-b border-gray-200">
            <CardTitle className="text-center text-xl md:text-2xl font-serif tracking-wide">
              Federal Democratic Republic of Ethiopia
              <br />
              <span className="text-lg font-medium font-sans">
                Digital Birth Certificate
              </span>
            </CardTitle>
          </CardHeader>

          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 text-sm md:text-base">
            <div className="md:col-span-2 space-y-2 font-sans">
              <p><strong>Certificate No:</strong> {certificate.certificateNumber}</p>
              <p><strong>Full Name:</strong> {certificate.fullName}</p>
              <p><strong>Gender:</strong> {certificate.gender}</p>
              <p><strong>Birthdate:</strong> {certificate.birthdate}</p>
              <p><strong>Birth Place:</strong> {certificate.birthPlace}</p>
              <p><strong>Nationality:</strong> {certificate.nationality}</p>
              <p><strong>Father Name:</strong> {certificate.fatherName}</p>
              <p><strong>Mother Name:</strong> {certificate.motherName}</p>
              <p><strong>Issued By:</strong> {certificate.issuedBy}</p>
              <p><strong>Issued At:</strong> {new Date(certificate.issuedAt).toLocaleDateString()}</p>
            </div>

            <div className="flex flex-col items-center justify-between gap-4">
              <div className="border rounded p-2 bg-white shadow-sm">
                {certificate.picture ? (
                  <img
                    src={certificate.picture}
                    alt="User"
                    className="w-32 h-40 object-cover rounded shadow"
                  />
                ) : (
                  <div className="w-32 h-40 flex items-center justify-center text-gray-400">
                    <UserCircle className="w-16 h-16" />
                  </div>
                )}
              </div>

              <div className="mt-4 bg-white p-1 rounded shadow-sm">
                <QRCodeCanvas
                  value={certificate.certificateNumber}
                  size={100}
                  bgColor="#ffffff"
                  fgColor="#000000"
                  level="H"
                  includeMargin={false}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {certificate && (
        <div className="mt-4 flex gap-4 justify-end print:hidden">
          <Button variant="secondary" onClick={handleDownload}>
            Download PDF
          </Button>
          <Button onClick={handlePrint}>Print</Button>
        </div>
      )}
    </div>
  )
}
