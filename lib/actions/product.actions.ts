import { LATEST_PRODUCTS_LIMIT } from '../constants';
import { prisma } from '../prisma';
import { convertToPlainObject } from '../utils';
import { normalizeProduct } from './product.normalize';

// Get the latest products
export async function getLatestProducts() {
  const data = await prisma.product.findMany({
    take: LATEST_PRODUCTS_LIMIT,
    orderBy: { createdAt: 'desc' },
  });

  const normalizedData = data.map(normalizeProduct);

  return convertToPlainObject(normalizedData);
}
