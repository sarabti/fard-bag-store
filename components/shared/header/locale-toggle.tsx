"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/app/i18n/navigation";

const ModeToggle = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("components");

  const [mounted, setMounted] = useState(false);
  const [dir, setDir] = useState("ltr");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const currentDir = document.documentElement.getAttribute("dir") || "ltr";
    setDir(currentDir);
  }, []);

  if (!mounted) {
    return null;
  }

  const changeLocale = (locale: string) => {
    router.replace(pathname, { locale });
  };

  const renderedLocal = locale === "fa" ? "فا" : "EN";

  return (
    <DropdownMenu dir={dir as "rtl" | "ltr"}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          {renderedLocal}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{t("locale")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={locale === "fa"}
          onClick={() => changeLocale("fa")}
        >
          فارسی
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={locale === "en"}
          onClick={() => changeLocale("en")}
        >
          English
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ModeToggle;
