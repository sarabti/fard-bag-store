-- CreateTable
CREATE TABLE "Cart" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" UUID,
    "sessionCartId" TEXT NOT NULL,
    "items" JSON[] DEFAULT ARRAY[]::JSON[],
    "itemsPrice" BIGINT NOT NULL,
    "shippingPrice" BIGINT NOT NULL,
    "taxPrice" BIGINT NOT NULL,
    "totalPrice" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "cart_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
