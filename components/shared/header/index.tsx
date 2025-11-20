import { useTranslations } from "next-intl";
import { ShoppingCart, UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ModeToggle from "./mode-toggle";

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
              width={48}
              height={48}
              alt={`${t("appName")} logo`}
            />
            <span className="hidden lg:block font-bold text-2xl ms-3">
              {t("appName")}
            </span>
          </Link>
        </div>
        <div className="space-x-2">
          <ModeToggle />
          <Button asChild variant="ghost">
            <Link href="/cart">
              <ShoppingCart />
              <span className="hidden lg:block ms-3">{t("shoppingCart")}</span>
            </Link>
          </Button>
          <Button asChild>
            <Link href="/sign-in">
              <UserIcon />
              {t("signIn")}
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
