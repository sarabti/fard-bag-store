import { z } from "zod";
import {
  cartItemSchema,
  insertCartSchema,
  insertProductSchema,
} from "@/lib/validator";
import { Decimal } from "@/lib/generated/prisma/internal/prismaNamespace";
import { TranslationValues } from "next-intl";
export type Locale = "en" | "fa";

export type Translator = (key: string, values?: TranslationValues) => string;

export type ProductInsert = z.infer<typeof insertProductSchema>;

export type ProductRetrieve = Omit<ProductInsert, "price"> & {
  id: string;
  createdAt: Date;
  rating: Decimal;
  numReviews: number;
  price: bigint;
};

export type Product = Omit<
  ProductRetrieve,
  | "name_fa"
  | "name_en"
  | "description_fa"
  | "description_en"
  | "category_fa"
  | "category_en"
> & {
  name: {
    fa: string;
    en: string;
  };
  description: {
    fa: string;
    en: string;
  };
  category: {
    fa: string;
    en: string;
  };
};

export type Cart = z.infer<typeof insertCartSchema>;
export type CartItem = z.infer<typeof cartItemSchema>;
