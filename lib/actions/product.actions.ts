import { Product } from "@/types";
import { LATEST_PRODUCTS_LIMIT } from "../constants";
import { prisma } from "../prisma";
import { convertToPlainObject } from "../utils";
import { productSchema } from "../validator";

function parseProduct(raw: unknown): Product {
  return productSchema.parse(convertToPlainObject(raw));
}

// Get the latest products
export async function getLatestProducts(): Promise<Product[]> {
  const data = await prisma.product.findMany({
    take: LATEST_PRODUCTS_LIMIT,
    orderBy: { createdAt: "desc" },
  });

  return data.map(parseProduct);
}

// Get single product by slug
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const data = await prisma.product.findFirst({
    where: { slug: slug },
  });

  if (!data) return null;

  return parseProduct(data);
}
