/*
  Warnings:

  - You are about to drop the column `encoding` on the `Image` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[pubid]` on the table `Image` will be added. If there are existing duplicate values, this will fail.
  - The required column `pubid` was added to the `Image` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Image" DROP COLUMN "encoding",
ADD COLUMN     "pubid" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Image_pubid_key" ON "Image"("pubid");
