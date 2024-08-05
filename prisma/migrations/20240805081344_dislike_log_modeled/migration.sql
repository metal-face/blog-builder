/*
  Warnings:

  - The primary key for the `LikeLog` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "LikeLog" DROP CONSTRAINT "LikeLog_postId_fkey";

-- AlterTable
ALTER TABLE "LikeLog" DROP CONSTRAINT "LikeLog_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "LikeLog_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "LikeLog_id_seq";

-- CreateTable
CREATE TABLE "DislikeLog" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DislikeLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LikeLog" ADD CONSTRAINT "LikeLog_postId_fkey" FOREIGN KEY ("postId") REFERENCES "BlogPosts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DislikeLog" ADD CONSTRAINT "DislikeLog_postId_fkey" FOREIGN KEY ("postId") REFERENCES "BlogPosts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DislikeLog" ADD CONSTRAINT "DislikeLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
