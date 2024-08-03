-- CreateTable
CREATE TABLE "LikeLog" (
    "id" SERIAL NOT NULL,
    "postId" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "likedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LikeLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LikeLog" ADD CONSTRAINT "LikeLog_postId_fkey" FOREIGN KEY ("postId") REFERENCES "BlogPosts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
