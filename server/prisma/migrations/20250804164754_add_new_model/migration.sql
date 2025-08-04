-- CreateTable
CREATE TABLE "BirthCertificate" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "certificateNumber" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "birthdate" TEXT NOT NULL,
    "birthPlace" TEXT NOT NULL,
    "nationality" TEXT NOT NULL,
    "fatherName" TEXT NOT NULL,
    "motherName" TEXT NOT NULL,
    "issuedBy" TEXT NOT NULL,
    "issuedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BirthCertificate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BirthCertificate_userId_key" ON "BirthCertificate"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "BirthCertificate_certificateNumber_key" ON "BirthCertificate"("certificateNumber");

-- AddForeignKey
ALTER TABLE "BirthCertificate" ADD CONSTRAINT "BirthCertificate_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
