import Image from "next/image";
import { Link } from "@/app/i18n/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useLocale, useTranslations } from "next-intl";
import ProductPrice from "./product-price";
import { Locale, Product } from "@/types";

const ProductCard = ({ product }: { product: Product }) => {
  const t = useTranslations("products");
  const locale = (useLocale() ?? 'fa') as Locale;

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="p-0 items-center">
        <Link href={`/product/${product.slug}`}>
          <Image
            priority={true}
            src={product.images![0]}
            alt={product.name.en}
            className="aspect-square object-cover rounded"
            height={300}
            width={300}
          />
        </Link>
      </CardHeader>
      <CardContent className="p-4 grid gap-4">
        <div className="text-xs">{product.brand}</div>
        <Link href={`/product/${product.slug}`}>
          <h2 className="text-sm font-medium">{product.name[locale]}</h2>
        </Link>
        <div className="flex-between gap-4">
          <p>{product.rating + " " + t("stars")}</p>
          {product.stock > 0 ? (
            <ProductPrice price={Number(product.price)} />
          ) : (
            <p className="text-destructive">{t("outOfStock")}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
