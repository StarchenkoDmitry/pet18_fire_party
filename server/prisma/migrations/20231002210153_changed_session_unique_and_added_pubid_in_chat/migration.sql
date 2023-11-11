/*
  Warnings:

  - A unique constraint covering the columns `[pubid]` on the table `Chat` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[session]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - The required column `pubid` was added to the `Chat` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Chat" ADD COLUMN     "pubid" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Chat_pubid_key" ON "Chat"("pubid");

-- CreateIndex
CREATE UNIQUE INDEX "User_session_key" ON "User"("session");
