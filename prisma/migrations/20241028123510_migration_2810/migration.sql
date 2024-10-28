/*
  Warnings:

  - A unique constraint covering the columns `[codeName]` on the table `permissions` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[codeName]` on the table `roles` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "permissions_codeName_key" ON "permissions"("codeName");

-- CreateIndex
CREATE UNIQUE INDEX "roles_codeName_key" ON "roles"("codeName");
