export const toLocalNum = (
  num: number,
  locale: string,
  addComma: boolean = false
) => {
  if (locale === "fa") {
    return new Intl.NumberFormat("fa-IR", { useGrouping: addComma }).format(
      num
    );
  } else {
    return new Intl.NumberFormat("en-US", { useGrouping: addComma }).format(
      num
    );
  }
};

export const toToman = (num: number): number => Math.trunc(num / 10);

export const toMajorAndMinor = (
  str: string,
  splittingChar: "٬" | ","
): [string, string] => {
  const parts = str.split(splittingChar);
  const minor = parts.pop()!;
  const major = parts.join(splittingChar);

  return [major, minor];
};
