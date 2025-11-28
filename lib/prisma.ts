import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter }).$extends({
  result: {
    product: {
      name: {
        needs: { name_fa: true, name_en: true },
        compute(p) {
          return { fa: p.name_fa, en: p.name_en };
        }
      }
    }
  }
});;

export { prisma };
