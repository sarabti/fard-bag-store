import { Locale } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

export function convertToPlainObject<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

// Format errors
export function formatError(error: unknown, locale: Locale): string {
  if (
    error instanceof Error &&
    error.name === "ZodError" &&
    "issues" in error
  ) {
    const fieldErrors = (error.issues as { message: string }[]).map(
      (issue) => issue.message,
    );

    return fieldErrors.join(". ");
  }

  if (
    error instanceof Error &&
    error.name === "PrismaClientKnownRequestError" &&
    "code" in error &&
    error.code === "P2002"
  ) {
    return locale === "fa"
      ? "مقدار این فیلد قبلاً ثبت شده است"
      : "Field already exists";
  }

  if (error instanceof Error) {
    return error.message;
  }

  return typeof error === "string" ? error : "An unexpected error occurred";
}

export const round2 = (value: number | string) => {
  if (typeof value === "number") {
    return Math.round((value + Number.EPSILON) * 100) / 100; // avoid rounding errors
  } else if (typeof value === "string") {
    return Math.round((Number(value) + Number.EPSILON) * 100) / 100;
  } else {
    throw new Error("value is not a number nor a string");
  }
};
