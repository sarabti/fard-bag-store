import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const messages = {
    metadata: (await import(`../../messages/${locale}/metadata.json`)).default,
    components: (await import(`../../messages/${locale}/components.json`))
      .default,
    products: (await import(`../../messages/${locale}/products.json`)).default,
    productDetails: (
      await import(`../../messages/${locale}/pages/product-details.json`)
    ).default,
    home: (await import(`../../messages/${locale}/pages/home.json`)).default,
    auth: (await import(`../../messages/${locale}/pages/auth.json`)).default,
    signUp: (await import(`../../messages/${locale}/pages/sign-up.json`))
      .default,
    notFound: (await import(`../../messages/${locale}/pages/not-found.json`))
      .default,
  };

  return {
    locale,
    messages,
  };
});
