import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getTranslator } from "next-intl/server";
import "@/assets/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslator(locale, "LocaleLayout");

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  return (
    <html lang={locale} dir={locale === "fa" ? "rtl" : "ltr"}>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
