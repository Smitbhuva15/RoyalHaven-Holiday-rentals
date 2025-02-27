-- DropForeignKey
ALTER TABLE "Home" DROP CONSTRAINT "Home_userId_fkey";

-- AddForeignKey
ALTER TABLE "Home" ADD CONSTRAINT "Home_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
