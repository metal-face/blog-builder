-- CreateTable
CREATE TABLE "RelatedBlogPosts" (
    "id" TEXT NOT NULL,
    "originBlogId" TEXT NOT NULL,
    "relatedBlogId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RelatedBlogPosts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RelatedBlogPosts_originBlogId_relatedBlogId_key" ON "RelatedBlogPosts"("originBlogId", "relatedBlogId");

-- AddForeignKey
ALTER TABLE "RelatedBlogPosts" ADD CONSTRAINT "RelatedBlogPosts_originBlogId_fkey" FOREIGN KEY ("originBlogId") REFERENCES "BlogPosts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelatedBlogPosts" ADD CONSTRAINT "RelatedBlogPosts_relatedBlogId_fkey" FOREIGN KEY ("relatedBlogId") REFERENCES "BlogPosts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
