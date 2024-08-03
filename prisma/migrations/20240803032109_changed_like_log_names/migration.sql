/*
  Warnings:

  - You are about to drop the column `likedAt` on the `LikeLog` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "LikeLog" DROP CONSTRAINT "LikeLog_postId_fkey";

-- AlterTable
ALTER TABLE "LikeLog" DROP COLUMN "likedAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "LikeLog" ADD CONSTRAINT "LikeLog_postId_fkey" FOREIGN KEY ("postId") REFERENCES "BlogPosts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
