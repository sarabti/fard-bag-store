import { Product, ProductRetrieve } from "@/types";

export function normalizeProduct({
  name_fa,
  name_en,
  category_fa,
  category_en,
  description_fa,
  description_en,
  ...rest
}: ProductRetrieve): Product {
  return {
    ...rest,
    name: {
      fa: name_fa,
      en: name_en,
    },
    category: {
      fa: category_fa,
      en: category_en,
    },
    description: {
      fa: description_fa,
      en: description_en,
    },
  };
}
