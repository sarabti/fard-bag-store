"use server";

import { CartItem, Locale } from "@/types";
import { cookies } from "next/headers";
import { auth } from "@/auth";
import { getLocale } from "next-intl/server";
import { convertToPlainObject, formatError } from "../utils";
import { prisma } from "@/lib/prisma";
import { cartItemSchema } from "../validator";

export const addItemToCart = async (data: CartItem) => {
  const locale = await getLocale();

  try {
    const sessionCartId = (await cookies()).get("sessionCartId")?.value;
    if (!sessionCartId) throw new Error("Cart Session not found");

    const session = await auth();
    const userId = session?.user?.id as string | undefined;
    const cart = await getMyCart();
    // Parse and validate submitted item data
    const item = cartItemSchema.parse(data);
    const product = await prisma.product.findFirst({
      where: { id: item.productId },
    });
    if (!product) throw new Error("Product not found");

    // Testing
    console.log({
      "Session Cart ID": sessionCartId,
      "User ID": userId,
      "Item Requested": item,
      "Product Found": product,
      cart: cart,
    });

    return {
      success: true,
      message: "Testing Cart",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error, locale as Locale),
    };
  }
};

export async function getMyCart() {
  // Check for session cart cookie
  const sessionCartId = (await cookies()).get("sessionCartId")?.value;
  if (!sessionCartId) return undefined;

  // Get session and user ID
  const session = await auth();
  const userId = session?.user?.id;

  // Get user cart from database
  const cart = await prisma.cart.findFirst({
    where: userId ? { userId: userId } : { sessionCartId: sessionCartId },
  });

  if (!cart) return undefined;

  // Convert Decimal values to strings
  return convertToPlainObject({
    ...cart,
    items: cart.items,
    itemsPrice: cart.itemsPrice.toString(),
    totalPrice: cart.totalPrice.toString(),
    shippingPrice: cart.shippingPrice.toString(),
    taxPrice: cart.taxPrice.toString(),
  });
}
