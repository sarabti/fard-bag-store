"use server";

import { CartItem, Locale } from "@/types";
import { cookies } from "next/headers";
import { auth } from "@/auth";
import { getLocale } from "next-intl/server";
import { convertToPlainObject, formatError } from "../utils";
import { prisma } from "@/lib/prisma";
import {
  cartItemSchema,
  insertCartSchema,
  localizedStringSchema,
} from "../validator";
import { z } from "zod";
import { revalidatePath } from "next/cache";

// TODO: Check logic
const calcPrice = (items: z.infer<typeof cartItemSchema>[]) => {
  const itemsPrice = items.reduce(
    (acc, item) => acc + Number(item.price) * item.qty,
    0,
  );
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = Math.round(0.15 * itemsPrice);
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  return {
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  };
};

// TODO: Add translation
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

    if (!cart) {
      // Create new cart object
      const newCart = insertCartSchema.parse({
        userId: userId,
        items: [item],
        sessionCartId: sessionCartId,
        ...calcPrice([item]),
      });
      await prisma.cart.create({
        data: newCart,
      });

      revalidatePath(`/product/${product.slug}`);

      return {
        success: true,
        message: "Item added to cart successfully",
      };
    } else {
      // Check for existing item in cart
      const cartItems = z.array(cartItemSchema).parse(cart.items);

      const existItem = cartItems.find((x) => x.productId === item.productId);
      // If not enough stock, throw error
      if (existItem) {
        if (product.stock < existItem.qty + 1) {
          throw new Error("Not enough stock");
        }

        cartItems.find((x) => x.productId === item.productId)!.qty =
          existItem.qty + 1;
      } else {
        // If stock, add item to cart
        if (product.stock < 1) throw new Error("Not enough stock");
        cart.items.push(item);
      }

      await prisma.cart.update({
        where: { id: cart.id },
        data: {
          items: cartItems,
          ...calcPrice(cartItems),
        },
      });

      revalidatePath(`/product/${product.slug}`);
      // TODO: Add translation
      return {
        success: true,
        message: `${localizedStringSchema.parse(product.name).en} ${
          existItem ? "updated in" : "added to"
        } cart successfully`,
      };
    }

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

// Remove item from cart in database
export async function removeItemFromCart(productId: string) {
  const locale = await getLocale();

  try {
    const sessionCartId = (await cookies()).get("sessionCartId")?.value;
    if (!sessionCartId) throw new Error("Cart Session not found");

    const product = await prisma.product.findFirst({
      where: { id: productId },
    });
    if (!product) throw new Error("Product not found");

    // Get user cart
    const cart = await getMyCart();
    if (!cart) throw new Error("Cart not found");

    // Check if cart has item
    const exist = (cart.items as CartItem[]).find(
      (x) => x.productId === productId,
    );
    if (!exist) throw new Error("Item not found");

    // Check if cart has only one item
    if (exist.qty === 1) {
      // Remove item from cart
      cart.items = (cart.items as CartItem[]).filter(
        (x) => x.productId !== exist.productId,
      );
    } else {
      // Decrease quantity of existing item
      (cart.items as CartItem[]).find((x) => x.productId === productId)!.qty =
        exist.qty - 1;
    }

    await prisma.cart.update({
      where: { id: cart.id },
      data: {
        items: cart.items as CartItem[],
        ...calcPrice(cart.items as CartItem[]),
      },
    });

    revalidatePath(`/product/${product.slug}`);

    return {
      success: true,
      message: `${product.name}  ${
        (cart.items as CartItem[]).find((x) => x.productId === productId)
          ? "updated in"
          : "removed from"
      } cart successfully`,
    };
  } catch (error) {
    return { success: false, message: formatError(error, locale as Locale) };
  }
}
