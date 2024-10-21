/*
  Warnings:

  - You are about to drop the column `createdAt` on the `party_members` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `party_members` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "party_members" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";
