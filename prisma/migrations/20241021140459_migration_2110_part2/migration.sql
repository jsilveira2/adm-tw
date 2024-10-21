/*
  Warnings:

  - You are about to drop the column `disponibility` on the `party_members` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "character_event_disponibility" ALTER COLUMN "disponibility" DROP NOT NULL,
ALTER COLUMN "obs" DROP NOT NULL,
ALTER COLUMN "externalPlayerId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "external_players" ALTER COLUMN "obs" DROP NOT NULL;

-- AlterTable
ALTER TABLE "external_players_disponibility" ALTER COLUMN "obs" DROP NOT NULL;

-- AlterTable
ALTER TABLE "party_members" DROP COLUMN "disponibility",
ADD COLUMN     "partyLeader" BOOLEAN DEFAULT false,
ALTER COLUMN "obs" DROP NOT NULL;

-- AlterTable
ALTER TABLE "pvp_event_party" ALTER COLUMN "obs" DROP NOT NULL;
