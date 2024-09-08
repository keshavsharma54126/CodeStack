/*
  Warnings:

  - You are about to drop the column `followerId` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `followingId` on the `Subscription` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[subscriberId,subscriptionId]` on the table `Subscription` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `subscriberId` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subscriptionId` to the `Subscription` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Subscription" DROP CONSTRAINT "Subscription_followerId_fkey";

-- DropForeignKey
ALTER TABLE "Subscription" DROP CONSTRAINT "Subscription_followingId_fkey";

-- DropIndex
DROP INDEX "Subscription_followerId_followingId_key";

-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "followerId",
DROP COLUMN "followingId",
ADD COLUMN     "subscriberId" TEXT NOT NULL,
ADD COLUMN     "subscriptionId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Follower" (
    "id" TEXT NOT NULL,
    "followerId" TEXT NOT NULL,
    "followingId" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Follower_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Follower_followerId_followingId_key" ON "Follower"("followerId", "followingId");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_subscriberId_subscriptionId_key" ON "Subscription"("subscriberId", "subscriptionId");

-- AddForeignKey
ALTER TABLE "Follower" ADD CONSTRAINT "Follower_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follower" ADD CONSTRAINT "Follower_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_subscriberId_fkey" FOREIGN KEY ("subscriberId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
