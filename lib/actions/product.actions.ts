import { LATEST_PRODUCTS_LIMIT } from '../constants';
import { prisma } from '../prisma';
import { convertToPlainObject } from '../utils';

// Get the latest products
export async function getLatestProducts() {
  const data = await prisma.product.findMany({
    take: LATEST_PRODUCTS_LIMIT,
    orderBy: { createdAt: 'desc' },
  });

  return convertToPlainObject(data);
}
