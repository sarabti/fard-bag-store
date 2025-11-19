import { useTranslations } from "next-intl";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = params.locale;

  const t = await getTranslations({ locale, namespace: "home" });

  return {
    title: t("pageTitle"),
  };
}

function HomePage() {
  const t = useTranslations("home");

  return (
    <div className="wrapper">
      <h1 className="h1-bold">{t("title")}</h1>
      <p>{t("welcome")}</p>
    </div>
  );
}

export default HomePage;
