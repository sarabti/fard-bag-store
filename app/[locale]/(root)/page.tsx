import { useTranslations } from "next-intl";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ProductList from "@/components/shared/product/product-list";
import sampleData from "@/db/sample-data";

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

function HomePage() {
  const t = useTranslations("home");

  return (
    <div className="space-y-8">
      <h2 className="h2-bold">{t("latestProducts")}</h2>
      <ProductList title={t("newestArrivals")} data={sampleData.products} />
    </div>
  );
}

export default HomePage;
