-- CreateTable
CREATE TABLE "UserEntity" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "updateDate" TIMESTAMP(3) NOT NULL,
    "createDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT,

    CONSTRAINT "UserEntity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TokenEntity" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "userId" INTEGER
);

-- CreateTable
CREATE TABLE "ProfileEntity" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "lastname" TEXT,
    "phone" TEXT,
    "userId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "MessageEntity" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "conversationId" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MessageEntity_pkey" PRIMARY KEY ("userId","conversationId")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserEntity_id_key" ON "UserEntity"("id");

-- CreateIndex
CREATE UNIQUE INDEX "UserEntity_username_key" ON "UserEntity"("username");

-- CreateIndex
CREATE UNIQUE INDEX "UserEntity_email_key" ON "UserEntity"("email");

-- CreateIndex
CREATE UNIQUE INDEX "TokenEntity_id_key" ON "TokenEntity"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TokenEntity_userId_key" ON "TokenEntity"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ProfileEntity_id_key" ON "ProfileEntity"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ProfileEntity_userId_key" ON "ProfileEntity"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "MessageEntity_id_key" ON "MessageEntity"("id");

-- AddForeignKey
ALTER TABLE "TokenEntity" ADD CONSTRAINT "TokenEntity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserEntity"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfileEntity" ADD CONSTRAINT "ProfileEntity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserEntity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MessageEntity" ADD CONSTRAINT "MessageEntity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserEntity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MessageEntity" ADD CONSTRAINT "MessageEntity_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "UserEntity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
