"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUpDefaultValues } from "@/lib/constants";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { signUp } from "@/lib/actions/user.actions";
import { useSearchParams } from "next/navigation";

const SignUpButton = () => {
  const { pending } = useFormStatus();
  const t = useTranslations("signUp");
  return (
    <Button disabled={pending} className="w-full" variant="default">
      {pending ? t("submitting") + "..." : t("signUp")}
    </Button>
  );
};

const SignUpForm = () => {
  const t = useTranslations("signUp");
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [data, action] = useActionState(signUp, {
    message: "",
    success: false,
  });
  return (
    <form action={action}>
      <input type="hidden" name="callbackUrl" value={callbackUrl} />
      <div className="space-y-6">
        <div>
          <Label htmlFor="name">{t("nameLabel")}</Label>
          <Input
            id="name"
            name="name"
            required
            type="text"
            defaultValue={signUpDefaultValues.name}
            autoComplete="name"
          />
        </div>
        <div>
          <Label htmlFor="email">{t("emailLabel")}</Label>
          <Input
            id="email"
            name="email"
            required
            type="email"
            defaultValue={signUpDefaultValues.email}
            autoComplete="email"
          />
        </div>
        <div>
          <Label htmlFor="password">{t("passwordLabel")}</Label>
          <Input
            id="password"
            name="password"
            required
            type="password"
            defaultValue={signUpDefaultValues.password}
            autoComplete="current-password"
          />
        </div>
        <div>
          <Label htmlFor="confirmPassword">{t("confirmPasswordLabel")}</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            required
            type="password"
            defaultValue={signUpDefaultValues.confirmPassword}
            autoComplete="current-password"
          />
        </div>
        <div>
          <SignUpButton />
        </div>
        {data && !data.success && (
          <div className="text-center text-destructive">{data.message}</div>
        )}
        <div className="text-sm text-center text-muted-foreground">
          {t("alreadyHaveAccount")}
          <Link
            target="_self"
            className="link"
            href={`/sign-in?callbackUrl=${callbackUrl}`}
          >
            {t("signIn")}
          </Link>
        </div>
      </div>
    </form>
  );
};

export default SignUpForm;
