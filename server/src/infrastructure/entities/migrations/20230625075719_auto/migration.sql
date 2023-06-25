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

-- CreateIndex
CREATE UNIQUE INDEX "UserEntity_id_key" ON "UserEntity"("id");

-- CreateIndex
CREATE UNIQUE INDEX "UserEntity_email_key" ON "UserEntity"("email");

-- CreateIndex
CREATE UNIQUE INDEX "TokenEntity_id_key" ON "TokenEntity"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TokenEntity_userId_key" ON "TokenEntity"("userId");

-- AddForeignKey
ALTER TABLE "TokenEntity" ADD CONSTRAINT "TokenEntity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserEntity"("id") ON DELETE SET NULL ON UPDATE CASCADE;
