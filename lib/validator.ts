import { z } from "zod";

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
  price: z.coerce
    .number()
    .min(10000, "Price must be at least 10,000")
    .max(10000000000, "Price must not exceed 10,000,000,000"),
  stock: z.coerce.number(),
  images: z.array(z.string()).min(1, "Product must have at least one image"),
  isFeatured: z.boolean().default(false),
  banner: z.string().nullable(),
});
