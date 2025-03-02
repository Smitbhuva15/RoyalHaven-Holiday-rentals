-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "place" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "starting_date" TIMESTAMP(3) NOT NULL,
    "ending_date" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
