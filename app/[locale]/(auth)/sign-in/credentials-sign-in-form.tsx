"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInDefaultValues } from "@/lib/constants";
import { useTranslations } from "next-intl";
import Link from "next/link";

const CredentialsSignInForm = () => {
  const t = useTranslations("auth");
  return (
    <form>
      <div className="space-y-6">
        <div>
          <Label htmlFor="email">{t("emailLabel")}</Label>
          <Input
            id="email"
            name="email"
            required
            type="email"
            defaultValue={signInDefaultValues.email}
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
            defaultValue={signInDefaultValues.password}
            autoComplete="current-password"
          />
        </div>
        <div>
          <Button className="w-full" variant="default">
            {t("signInWithCredentials")}
          </Button>
        </div>

        <div className="text-sm text-center text-muted-foreground">
          {t("dontHaveAccount") + " "}
          <Link target="_self" className="link" href="/sign-up">
            {t("signUp")}
          </Link>
        </div>
      </div>
    </form>
  );
};

export default CredentialsSignInForm;
