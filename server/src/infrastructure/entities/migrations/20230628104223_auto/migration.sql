/*
  Warnings:

  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- DropTable
DROP TABLE "Profile";

-- CreateTable
CREATE TABLE "ProfileEntity" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "lastname" TEXT,
    "phone" TEXT,
    "userId" INTEGER
);

-- CreateIndex
CREATE UNIQUE INDEX "ProfileEntity_id_key" ON "ProfileEntity"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ProfileEntity_userId_key" ON "ProfileEntity"("userId");

-- AddForeignKey
ALTER TABLE "ProfileEntity" ADD CONSTRAINT "ProfileEntity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserEntity"("id") ON DELETE SET NULL ON UPDATE CASCADE;
