/*
  Warnings:

  - Added the required column `userId` to the `BlogPosts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BlogPosts" DROP CONSTRAINT "BlogPosts_id_fkey";

-- AlterTable
ALTER TABLE "BlogPosts" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "BlogPosts" ADD CONSTRAINT "BlogPosts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
