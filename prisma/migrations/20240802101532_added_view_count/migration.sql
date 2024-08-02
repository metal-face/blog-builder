-- CreateTable
CREATE TABLE "ViewLog" (
    "id" SERIAL NOT NULL,
    "postId" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ViewLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ViewLog" ADD CONSTRAINT "ViewLog_postId_fkey" FOREIGN KEY ("postId") REFERENCES "BlogPosts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
