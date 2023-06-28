/*
  Warnings:

  - Made the column `userId` on table `ProfileEntity` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "ProfileEntity" DROP CONSTRAINT "ProfileEntity_userId_fkey";

-- AlterTable
ALTER TABLE "ProfileEntity" ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "ProfileEntity" ADD CONSTRAINT "ProfileEntity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserEntity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
