import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import "@/assets/styles/globals.css";

export const metadata: Metadata = {
  title: "فروشگاه کیف فرد",
  description: 'A modern store built with Next.js, ShadCN, and Prisma.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
