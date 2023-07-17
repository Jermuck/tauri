-- DropForeignKey
ALTER TABLE "MessageEntity" DROP CONSTRAINT "MessageEntity_roomId_fkey";

-- AddForeignKey
ALTER TABLE "MessageEntity" ADD CONSTRAINT "MessageEntity_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "RoomEntity"("id") ON DELETE CASCADE ON UPDATE CASCADE;
