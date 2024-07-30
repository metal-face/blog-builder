/*
  Warnings:

  - You are about to drop the `BlogPost` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BlogPost" DROP CONSTRAINT "BlogPost_userId_fkey";

-- DropTable
DROP TABLE "BlogPost";

-- CreateTable
CREATE TABLE "BlogPosts" (
    "id" TEXT NOT NULL,
    "blogTitle" TEXT,
    "blogPost" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "userId" TEXT NOT NULL,
    "pageViews" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "BlogPosts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BlogPosts" ADD CONSTRAINT "BlogPosts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
