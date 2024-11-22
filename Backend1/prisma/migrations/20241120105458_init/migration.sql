/*
  Warnings:

  - A unique constraint covering the columns `[resetPasswordToken]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "dateResetPassword" TIMESTAMP(3),
ADD COLUMN     "isResettingPassword" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "resetPasswordToken" TEXT,
ALTER COLUMN "name" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_resetPasswordToken_key" ON "User"("resetPasswordToken");
