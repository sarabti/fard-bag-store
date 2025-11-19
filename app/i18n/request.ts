import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";
import fs from "fs";
import path from "path";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  // Messages folder for current locale:
  const baseDir = path.join(process.cwd(), "messages", locale);

  // Read all *.json files inside messages/<locale>/
  const messages: Record<string, unknown> = {};

  for (const file of fs.readdirSync(baseDir)) {
    if (file.endsWith(".json")) {
      const namespace = file.replace(".json", "");
      messages[namespace] = JSON.parse(
        fs.readFileSync(path.join(baseDir, file), "utf8")
      );
    }
  }

  return {
    locale,
    messages,
  };
});
