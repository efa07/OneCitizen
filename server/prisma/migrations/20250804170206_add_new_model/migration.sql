/*
  Warnings:

  - You are about to drop the column `userId` on the `BirthCertificate` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "BirthCertificate" DROP CONSTRAINT "BirthCertificate_userId_fkey";

-- DropIndex
DROP INDEX "BirthCertificate_userId_key";

-- AlterTable
ALTER TABLE "BirthCertificate" DROP COLUMN "userId";
