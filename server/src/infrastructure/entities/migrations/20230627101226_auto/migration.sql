/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `UserEntity` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserEntity_username_key" ON "UserEntity"("username");
