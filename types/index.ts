import { z } from "zod";
import {
  cartItemSchema,
  insertCartSchema,
  insertProductSchema,
  localizedStringSchema,
  productSchema,
} from "@/lib/validator";
import { TranslationValues } from "next-intl";
export type Locale = "en" | "fa";

export type Translator = (key: string, values?: TranslationValues) => string;

export type LocalizedString = z.infer<typeof localizedStringSchema>;

export type ProductInsert = z.infer<typeof insertProductSchema>;

export type Product = z.infer<typeof productSchema>;

export type Cart = z.infer<typeof insertCartSchema>;

export type CartItem = z.infer<typeof cartItemSchema>;
