import { formatLocalNum } from "@/assets/utils";
import { useLocale, useTranslations } from "next-intl";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const t = useTranslations("components");
  const locale = useLocale();

  return (
    <footer className="border-t">
      <div className="p-5 flex-center">
        {formatLocalNum(currentYear, locale)} {t("appName")}.{" "}
        {t("copyRightText")}.
      </div>
    </footer>
  );
};

export default Footer;
