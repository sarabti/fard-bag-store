import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "@/app/i18n/navigation";
import { auth } from "@/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("auth");

  return {
    title: t("pageTitle"),
  };
}

const SignIn = async () => {
  const metaT = await getTranslations("metadata");
  const t = await getTranslations("auth");

  return (
    <div className="w-full max-w-md mx-auto">
      <Card>
        <CardHeader className="space-y-4">
          <Link href="/" className="flex-center">
            <Image
              priority={true}
              src="/images/logo.svg"
              width={100}
              height={100}
              alt={`${metaT("appName")} logo`}
            />
          </Link>
          <CardTitle className="text-center">{t("signIn")}</CardTitle>
          <CardDescription className="text-center">
            {t("selectSignInMethod")}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">{/* FORM HERE */}</CardContent>
      </Card>
    </div>
  );
};

export default SignIn;
