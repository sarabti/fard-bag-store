import { Translator } from "@/types";
import { z } from "zod";

const currency = z.coerce
  .number()
  .min(10000, "Price must be at least 10,000")
  .max(10000000000, "Price must not exceed 10,000,000,000");

export const insertProductSchema = z.object({
  name_en: z.string().min(3, "Name must be at least 3 characters"),
  name_fa: z.string().min(3, "Name must be at least 3 characters"),
  slug: z.string().min(3, "Slug must be at least 3 characters"),
  category_en: z.string().min(3, "Category must be at least 3 characters"),
  category_fa: z.string().min(3, "Category must be at least 3 characters"),
  brand: z.string().min(3, "Brand must be at least 3 characters"),
  description_en: z
    .string()
    .min(3, "Description must be at least 3 characters"),
  description_fa: z
    .string()
    .min(3, "Description must be at least 3 characters"),
  price: currency,
  stock: z.coerce.number(),
  images: z.array(z.string()).min(1, "Product must have at least one image"),
  isFeatured: z.boolean().default(false),
  banner: z.string().nullable(),
});

// Schema for signing up a user
export const signUpFormSchema = (t: Translator) =>
  z
    .object({
      name: z.string().min(3, t("validation.name.minLength", { min: 3 })),
      email: z.string().min(3, t("validation.email.minLength", { min: 3 })),
      password: z
        .string()
        .min(3, t("validation.password.minLength", { min: 3 })),
      confirmPassword: z
        .string()
        .min(3, t("validation.confirmPassword.minLength", { min: 3 })),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("validation.passwordsDoNotMatch"),
      path: ["confirmPassword"],
    });

// Schema for signing in a user
export const signInFormSchema = (t: Translator) =>
  z.object({
    email: z
      .email(t("validation.email.invalid"))
      .min(3, t("validation.email.minLength", { min: 3 })),
    password: z.string().min(3, t("validation.password.minLength", { min: 3 })),
  });

// Cart
// TODO: add translation
export const cartItemSchema = z.object({
  productId: z.string().min(1, "Product is required"),
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  qty: z.number().int().nonnegative("Quantity must be a non-negative number"),
  image: z.string().min(1, "Image is required"),
  price: currency,
});

// Cart item insert
// TODO: add translation
export const insertCartSchema = z.object({
  items: z.array(cartItemSchema),
  itemsPrice: currency,
  totalPrice: currency,
  shippingPrice: currency,
  taxPrice: currency,
  sessionCartId: z.string().min(1, "Session cart id is required"),
  userId: z.string().optional().nullable(),
});
