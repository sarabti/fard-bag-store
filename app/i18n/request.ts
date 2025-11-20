import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const messages = {
    home: (await import(`../../messages/${locale}/pages/home.json`)).default,
    components: (await import(`../../messages/${locale}/components.json`)).default,
    metadata: (await import(`../../messages/${locale}/metadata.json`)).default,
  };

  return {
    locale,
    messages,
  };
});
