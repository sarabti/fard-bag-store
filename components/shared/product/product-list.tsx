import { useTranslations } from "next-intl";
import ProductCard from "./product-card";

const ProductList = ({
  data,
  title,
  limit,
}: {
  data: { id: number; name: { fa: string; en: string } }[];
  title?: string;
  limit?: number;
}) => {
  // Apply limit if provided, otherwise show all products
  const limitedData = limit ? data.slice(0, limit) : data;
  const t = useTranslations("products");

  return (
    <div className="my-10">
      <h2 className="h2-bold mb-4">{title}</h2>
      {limitedData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {limitedData.map(
            (product: { id: number; name: { fa: string; en: string } }) => (
              <ProductCard key={product.id} product={product} />
            )
          )}
        </div>
      ) : (
        <div>
          <p>{t("notFound")}...</p>
        </div>
      )}
    </div>
  );
};

export default ProductList;
