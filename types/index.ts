import { z } from "zod";
import { insertProductSchema } from "@/lib/validator";
import { Decimal } from "@/lib/generated/prisma/internal/prismaNamespace";

export type Locale = "en" | "fa";

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
