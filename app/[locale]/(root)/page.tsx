import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ProductList from "@/components/shared/product/product-list";
import { getLatestProducts } from "@/lib/actions/product.actions";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: "home" });

  return {
    title: t("pageTitle"),
  };
}

async function HomePage() {
  const t = await getTranslations("home");
  const latestProducts = await getLatestProducts();

  return (
    <div className="space-y-8">
      <h2 className="h2-bold">{t("latestProducts")}</h2>
      <ProductList title={t("newestArrivals")} data={latestProducts} />
    </div>
  );
}

export default HomePage;
