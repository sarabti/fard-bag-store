import "@/assets/styles/not-found.css";
import Image from "next/image";
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "notFound" });

  return { title: t("pageTitle") };
}

export default async function NotFound() {
  const locale = await getLocale();
  const dir = locale == "en" ? "ltr" : "rtl";
  const metaT = await getTranslations({ locale, namespace: "metadata" });
  const t = await getTranslations({ locale, namespace: "notFound" });

  return (
    <div className="not-found-container" dir={dir}>
      <Image
        priority
        src="/images/logo.svg"
        width={100}
        height={100}
        alt={`${metaT("appName")} logo`}
        className="w-60 h-auto"
      />

      <div className="not-found-card">
        <h1 className="not-found-title">{t("pageTitle")}</h1>

        <p className="not-found-description">{t("description")}</p>

        <Link href={`/${locale}`} className="not-found-button">
          {t("backToHome")}
        </Link>
      </div>
    </div>
  );
}
