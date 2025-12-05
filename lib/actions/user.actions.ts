"use server";

import { signIn, signOut } from "@/auth";
import { signInFormSchema } from "../validator";
import { getTranslations } from "next-intl/server";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export type SignInState = {
  success: boolean;
  message: string;
};

// Sign in the user with credentials
export async function signInWithCredentials(
  prevState: SignInState,
  formData: FormData
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
