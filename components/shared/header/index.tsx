import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/app/i18n/navigation";
import Menu from "./menu";

const Header = () => {
  const t = useTranslations("components");

  return (
    <header className="w-full border-b">
      <div className="wrapper flex-between">
        <div className="flex-start">
          <Link href="/" className="flex-start">
            <Image
              priority={true}
              src="/images/logo.svg"
              width={60}
              height={60}
              alt={`${t("appName")} logo`}
            />
            <span className="hidden lg:block font-bold text-2xl ms-3">
              {t("appName")}
            </span>
          </Link>
        </div>
        <Menu />
      </div>
    </header>
  );
};

export default Header;
