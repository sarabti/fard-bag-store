import { notFound } from "next/navigation";
import ProductPrice from "@/components/shared/product/product-price";
import { Card, CardContent } from "@/components/ui/card";
import { getProductBySlug } from "@/lib/actions/product.actions";
import { Badge } from "@/components/ui/badge";
import { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { Locale } from "@/types";
import ProductImages from "@/components/shared/product/product-images";
import AddToCart from "@/components/shared/product/add-to-cart";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: "productDetails" });

  return {
    title: t("pageTitle"),
  };
}

const ProductDetailsPage = async (props: {
  params: Promise<{ slug: string }>;
}) => {
  const t = await getTranslations("productDetails");
  const locale = ((await getLocale()) ?? "fa") as Locale;
  const params = await props.params;

  const { slug } = params;

  const product = await getProductBySlug(slug);
  if (!product) notFound();

  return (
    <>
      <section>
        <div className="grid grid-cols-1 md:grid-cols-5">
          {/* Images Column */}
          <div className="col-span-2">
            <ProductImages images={product.images!} />
          </div>

          {/* Details Column */}
          <div className="col-span-2 p-5">
            <div className="flex flex-col gap-6">
              <p>
                {product.brand} {product.category[locale]}
              </p>
              <h1 className="h3-bold">{product.name[locale]}</h1>
              <p>
                {Number(product.rating)} {t("of")} {product.numReviews}{" "}
                {t("reviews")}
              </p>

              <div className="flex flex-row">
                <ProductPrice
                  price={Number(product.price)}
                  className="rounded-full bg-green-100 text-green-700 px-5 py-2"
                />
              </div>
            </div>
            <div className="mt-10">
              <p>{t("description")}:</p>
              <p>{product.description[locale]}</p>
            </div>
          </div>

          {/* Action Column */}
          <div>
            <Card>
              <CardContent className="p-4">
                <div className="mb-2 flex flex-row flex-wrap justify-between">
                  <div className="me-1">{t("price")}</div>
                  <div className="-mt-2">
                    <ProductPrice price={Number(product.price)} />
                  </div>
                </div>
                <div className="mb-2 flex flex-wrap justify-between">
                  <div className="me-1">{t("status")}</div>
                  {product.stock > 0 ? (
                    <Badge variant="outline">{t("inStock")}</Badge>
                  ) : (
                    <Badge variant="destructive">{t("unavailable")}</Badge>
                  )}
                </div>
                {product.stock > 0 && (
                  <div className="flex-center">
                    <AddToCart
                      item={{
                        productId: product.id,
                        name: product.name,
                        slug: product.slug,
                        price: product.price,
                        qty: 1,
                        image: product.images![0],
                      }}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetailsPage;
