-- CreateTable
CREATE TABLE "MessageEntity" (
    "id" SERIAL NOT NULL,
    "roomId" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "MessageEntity_id_key" ON "MessageEntity"("id");

-- CreateIndex
CREATE UNIQUE INDEX "MessageEntity_roomId_key" ON "MessageEntity"("roomId");

-- AddForeignKey
ALTER TABLE "MessageEntity" ADD CONSTRAINT "MessageEntity_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "RoomEntity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
