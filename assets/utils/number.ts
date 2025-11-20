export function formatLocalNum(
  num: number,
  locale: string,
  addComma: boolean = false
) {
  if (locale === "fa") {
    return new Intl.NumberFormat("fa-IR", { useGrouping: addComma }).format(
      num
    );
  } else {
    return new Intl.NumberFormat("en-US", { useGrouping: addComma }).format(
      num
    );
  }
}
