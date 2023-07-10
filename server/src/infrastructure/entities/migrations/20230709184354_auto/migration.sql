/*
  Warnings:

  - You are about to drop the `MessageEntity` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MessageEntity" DROP CONSTRAINT "MessageEntity_conversationId_fkey";

-- DropForeignKey
ALTER TABLE "MessageEntity" DROP CONSTRAINT "MessageEntity_userId_fkey";

-- DropTable
DROP TABLE "MessageEntity";

-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "conversationId" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("userId","conversationId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Message_id_key" ON "Message"("id");

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserEntity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "UserEntity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
