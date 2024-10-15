/*
  Warnings:

  - You are about to alter the column `name` on the `guild` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `name` on the `permissions` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `name` on the `roles` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `email` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(120)`.
  - You are about to alter the column `name` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.

*/
-- AlterTable
ALTER TABLE "guild" ALTER COLUMN "name" SET DATA TYPE VARCHAR(50);

-- AlterTable
ALTER TABLE "permissions" ALTER COLUMN "name" SET DATA TYPE VARCHAR(50);

-- AlterTable
ALTER TABLE "roles" ALTER COLUMN "name" SET DATA TYPE VARCHAR(50);

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "email" SET DATA TYPE VARCHAR(120),
ALTER COLUMN "name" SET DATA TYPE VARCHAR(50);

-- CreateTable
CREATE TABLE "external_players" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "obs" VARCHAR(255) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "guildId" TEXT NOT NULL,

    CONSTRAINT "external_players_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "character_classes" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "shortName" VARCHAR(6) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "character_classes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "characters" (
    "id" TEXT NOT NULL,
    "nickname" VARCHAR(50) NOT NULL,
    "obs" VARCHAR(255) NOT NULL,
    "ownerName" VARCHAR(50) NOT NULL,
    "rank" INTEGER NOT NULL,
    "defaultDisponibility" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "characterClassId" TEXT NOT NULL,
    "guildId" TEXT NOT NULL,

    CONSTRAINT "characters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pvp_event" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "type" INTEGER NOT NULL,
    "ended" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "guildId" TEXT NOT NULL,

    CONSTRAINT "pvp_event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pvp_event_party" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "obs" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "pvpEventId" TEXT NOT NULL,

    CONSTRAINT "pvp_event_party_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "character_event_disponibility" (
    "id" TEXT NOT NULL,
    "disponibility" INTEGER NOT NULL,
    "obs" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "idCharacter" TEXT NOT NULL,
    "pvpEventId" TEXT NOT NULL,
    "externalPlayerId" TEXT NOT NULL,

    CONSTRAINT "character_event_disponibility_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "party_members" (
    "id" TEXT NOT NULL,
    "disponibility" INTEGER NOT NULL,
    "obs" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "idCharacter" TEXT NOT NULL,
    "pvpPartyId" TEXT NOT NULL,

    CONSTRAINT "party_members_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "external_players_guildId_idx" ON "external_players"("guildId");

-- CreateIndex
CREATE UNIQUE INDEX "character_classes_name_key" ON "character_classes"("name");

-- CreateIndex
CREATE UNIQUE INDEX "character_classes_shortName_key" ON "character_classes"("shortName");

-- CreateIndex
CREATE UNIQUE INDEX "characters_nickname_key" ON "characters"("nickname");

-- CreateIndex
CREATE INDEX "characters_guildId_idx" ON "characters"("guildId");

-- CreateIndex
CREATE INDEX "characters_characterClassId_idx" ON "characters"("characterClassId");

-- CreateIndex
CREATE INDEX "characters_nickname_idx" ON "characters"("nickname");

-- CreateIndex
CREATE INDEX "characters_ownerName_idx" ON "characters"("ownerName");

-- CreateIndex
CREATE INDEX "characters_rank_idx" ON "characters"("rank");

-- CreateIndex
CREATE INDEX "pvp_event_guildId_idx" ON "pvp_event"("guildId");

-- CreateIndex
CREATE INDEX "pvp_event_party_pvpEventId_idx" ON "pvp_event_party"("pvpEventId");

-- CreateIndex
CREATE UNIQUE INDEX "character_event_disponibility_idCharacter_key" ON "character_event_disponibility"("idCharacter");

-- CreateIndex
CREATE INDEX "character_event_disponibility_idCharacter_idx" ON "character_event_disponibility"("idCharacter");

-- CreateIndex
CREATE INDEX "character_event_disponibility_pvpEventId_idx" ON "character_event_disponibility"("pvpEventId");

-- CreateIndex
CREATE INDEX "character_event_disponibility_externalPlayerId_idx" ON "character_event_disponibility"("externalPlayerId");

-- CreateIndex
CREATE INDEX "character_event_disponibility_disponibility_idx" ON "character_event_disponibility"("disponibility");

-- CreateIndex
CREATE INDEX "party_members_pvpPartyId_idx" ON "party_members"("pvpPartyId");

-- CreateIndex
CREATE UNIQUE INDEX "party_members_idCharacter_pvpPartyId_key" ON "party_members"("idCharacter", "pvpPartyId");

-- CreateIndex
CREATE INDEX "permissions_roleId_idx" ON "permissions"("roleId");

-- CreateIndex
CREATE INDEX "user_guilds_userId_idx" ON "user_guilds"("userId");

-- CreateIndex
CREATE INDEX "user_guilds_guildId_idx" ON "user_guilds"("guildId");

-- CreateIndex
CREATE INDEX "user_roles_userId_idx" ON "user_roles"("userId");

-- CreateIndex
CREATE INDEX "user_roles_roleId_idx" ON "user_roles"("roleId");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- AddForeignKey
ALTER TABLE "external_players" ADD CONSTRAINT "external_players_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "guild"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "characters" ADD CONSTRAINT "characters_characterClassId_fkey" FOREIGN KEY ("characterClassId") REFERENCES "character_classes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "characters" ADD CONSTRAINT "characters_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "guild"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pvp_event" ADD CONSTRAINT "pvp_event_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "guild"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pvp_event_party" ADD CONSTRAINT "pvp_event_party_pvpEventId_fkey" FOREIGN KEY ("pvpEventId") REFERENCES "pvp_event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "character_event_disponibility" ADD CONSTRAINT "character_event_disponibility_idCharacter_fkey" FOREIGN KEY ("idCharacter") REFERENCES "characters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "character_event_disponibility" ADD CONSTRAINT "character_event_disponibility_pvpEventId_fkey" FOREIGN KEY ("pvpEventId") REFERENCES "pvp_event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "character_event_disponibility" ADD CONSTRAINT "character_event_disponibility_externalPlayerId_fkey" FOREIGN KEY ("externalPlayerId") REFERENCES "external_players"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "party_members" ADD CONSTRAINT "party_members_idCharacter_fkey" FOREIGN KEY ("idCharacter") REFERENCES "character_event_disponibility"("idCharacter") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "party_members" ADD CONSTRAINT "party_members_pvpPartyId_fkey" FOREIGN KEY ("pvpPartyId") REFERENCES "pvp_event_party"("id") ON DELETE CASCADE ON UPDATE CASCADE;
