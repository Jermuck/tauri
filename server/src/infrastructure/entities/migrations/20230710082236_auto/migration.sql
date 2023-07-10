/*
  Warnings:

  - You are about to drop the `Message` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_conversationId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_userId_fkey";

-- DropTable
DROP TABLE "Message";

-- CreateTable
CREATE TABLE "RoomEntity" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "conversationId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "RoomEntity_id_key" ON "RoomEntity"("id");

-- CreateIndex
CREATE UNIQUE INDEX "RoomEntity_userId_key" ON "RoomEntity"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "RoomEntity_conversationId_key" ON "RoomEntity"("conversationId");

-- AddForeignKey
ALTER TABLE "RoomEntity" ADD CONSTRAINT "RoomEntity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserEntity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomEntity" ADD CONSTRAINT "RoomEntity_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "UserEntity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
