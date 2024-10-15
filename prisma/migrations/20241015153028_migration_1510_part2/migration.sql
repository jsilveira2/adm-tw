/*
  Warnings:

  - You are about to drop the column `idCharacter` on the `character_event_disponibility` table. All the data in the column will be lost.
  - You are about to drop the column `idCharacter` on the `party_members` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[characterId,pvpEventId,externalPlayerId]` on the table `character_event_disponibility` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[characterId,pvpPartyId]` on the table `party_members` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `characterId` to the `character_event_disponibility` table without a default value. This is not possible if the table is not empty.
  - Added the required column `characterId` to the `party_members` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "character_event_disponibility" DROP CONSTRAINT "character_event_disponibility_idCharacter_fkey";

-- DropForeignKey
ALTER TABLE "party_members" DROP CONSTRAINT "party_members_idCharacter_fkey";

-- DropIndex
DROP INDEX "character_event_disponibility_idCharacter_idx";

-- DropIndex
DROP INDEX "character_event_disponibility_idCharacter_key";

-- DropIndex
DROP INDEX "party_members_idCharacter_pvpPartyId_key";

-- AlterTable
ALTER TABLE "character_event_disponibility" DROP COLUMN "idCharacter",
ADD COLUMN     "characterId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "party_members" DROP COLUMN "idCharacter",
ADD COLUMN     "characterId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "external_players_disponibility" (
    "id" TEXT NOT NULL,
    "disponibility" INTEGER NOT NULL,
    "obs" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "pvpEventId" TEXT NOT NULL,
    "externalPlayerId" TEXT NOT NULL,

    CONSTRAINT "external_players_disponibility_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "external_players_disponibility_pvpEventId_idx" ON "external_players_disponibility"("pvpEventId");

-- CreateIndex
CREATE INDEX "external_players_disponibility_externalPlayerId_idx" ON "external_players_disponibility"("externalPlayerId");

-- CreateIndex
CREATE INDEX "external_players_disponibility_disponibility_idx" ON "external_players_disponibility"("disponibility");

-- CreateIndex
CREATE INDEX "character_event_disponibility_characterId_idx" ON "character_event_disponibility"("characterId");

-- CreateIndex
CREATE UNIQUE INDEX "character_event_disponibility_characterId_pvpEventId_extern_key" ON "character_event_disponibility"("characterId", "pvpEventId", "externalPlayerId");

-- CreateIndex
CREATE UNIQUE INDEX "party_members_characterId_pvpPartyId_key" ON "party_members"("characterId", "pvpPartyId");

-- AddForeignKey
ALTER TABLE "external_players_disponibility" ADD CONSTRAINT "external_players_disponibility_pvpEventId_fkey" FOREIGN KEY ("pvpEventId") REFERENCES "pvp_event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "external_players_disponibility" ADD CONSTRAINT "external_players_disponibility_externalPlayerId_fkey" FOREIGN KEY ("externalPlayerId") REFERENCES "external_players"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "character_event_disponibility" ADD CONSTRAINT "character_event_disponibility_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "characters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "party_members" ADD CONSTRAINT "party_members_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "characters"("id") ON DELETE CASCADE ON UPDATE CASCADE;
