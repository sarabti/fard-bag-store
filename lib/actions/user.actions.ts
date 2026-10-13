"use server";

import { signIn, signOut } from "@/auth";
import { signInFormSchema, signUpFormSchema } from "../validator";
import { getTranslations } from "next-intl/server";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { hashSync } from "bcrypt-ts-edge";
import { prisma } from "@/lib/prisma";

export type SignInState = {
  success: boolean;
  message: string;
};

// Sign in the user with credentials
export async function signInWithCredentials(
  prevState: SignInState,
  formData: FormData,
) {
  const t = await getTranslations("auth");
  try {
    const user = signInFormSchema(t).parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    await signIn("credentials", user);

    return { success: true, message: t("response.signInSuccess") };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    return { success: false, message: t("response.invalidCredentials") };
  }
}

// Sign the user out
export async function signOutUser() {
  await signOut();
}

// Register a new user
export async function signUp(prevState: unknown, formData: FormData) {
  const t = await getTranslations("signUp");

  try {
    const user = signUpFormSchema(t).parse({
      name: formData.get("name"),
      email: formData.get("email"),
      confirmPassword: formData.get("confirmPassword"),
      password: formData.get("password"),
    });

    const plainPassword = user.password;

    user.password = hashSync(user.password, 10);

    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });

    await signIn("credentials", {
      email: user.email,
      password: plainPassword,
    });

    return { success: true, message: t("response.signUpSuccess") };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    return {
      success: false,
      message: t("response.signUpFailure"),
    };
  }
}
