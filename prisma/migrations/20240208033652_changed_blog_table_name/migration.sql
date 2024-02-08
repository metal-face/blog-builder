/*
  Warnings:

  - You are about to drop the `BlogPost` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BlogPost" DROP CONSTRAINT "BlogPost_id_fkey";

-- DropTable
DROP TABLE "BlogPost";

-- CreateTable
CREATE TABLE "BlogPosts" (
    "id" TEXT NOT NULL,
    "blogTitle" TEXT,
    "blogPost" TEXT,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BlogPosts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BlogPosts" ADD CONSTRAINT "BlogPosts_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
