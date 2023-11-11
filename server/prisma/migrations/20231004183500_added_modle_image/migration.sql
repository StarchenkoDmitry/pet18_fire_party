-- AlterTable
ALTER TABLE "User" ADD COLUMN     "imageID" INTEGER;

-- CreateTable
CREATE TABLE "Image" (
    "id" SERIAL NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "originalname" TEXT,
    "encoding" TEXT NOT NULL,
    "mimetype" TEXT,
    "buffer" BYTEA,
    "size" INTEGER NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Image_id_key" ON "Image"("id");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_imageID_fkey" FOREIGN KEY ("imageID") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;
