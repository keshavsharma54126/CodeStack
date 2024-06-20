/*
  Warnings:

  - Made the column `liked` on table `PostLike` required. This step will fail if there are existing NULL values in that column.
  - Made the column `disliked` on table `PostLike` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "PostLike" ALTER COLUMN "liked" SET NOT NULL,
ALTER COLUMN "liked" SET DEFAULT false,
ALTER COLUMN "disliked" SET NOT NULL,
ALTER COLUMN "disliked" SET DEFAULT false;
