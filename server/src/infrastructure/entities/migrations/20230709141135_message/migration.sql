-- CreateTable
CREATE TABLE "MessageEntity" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "conversationId" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "time" TEXT NOT NULL,

    CONSTRAINT "MessageEntity_pkey" PRIMARY KEY ("userId","conversationId")
);

-- CreateIndex
CREATE UNIQUE INDEX "MessageEntity_id_key" ON "MessageEntity"("id");

-- AddForeignKey
ALTER TABLE "MessageEntity" ADD CONSTRAINT "MessageEntity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserEntity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MessageEntity" ADD CONSTRAINT "MessageEntity_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "UserEntity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
