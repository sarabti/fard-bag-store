import { toLocalNum, toMajorAndMinor, toToman } from "@/assets/utils";
import { cn } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";

const ProductPrice = ({
  price,
  className,
}: {
  price: number;
  className?: string;
}) => {
  const local = useLocale();
  const t = useTranslations("products");
  const splittingChar = local === "fa" ? "٬" : ",";

  const value = toLocalNum(toToman(price), local, true).toString();

  const [majorValue, minorValue] = toMajorAndMinor(value, splittingChar);

  return (
    <p className={cn("text-xl inline-flex space-x-0.5", className)} dir="ltr">
      <sub className="text-xs">{t("toman")}</sub>
      <span>{majorValue}</span>
      <sub className="text-xs">
        {splittingChar}
        {minorValue}
      </sub>
    </p>
  );
};

export default ProductPrice;
