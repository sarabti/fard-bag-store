import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { auth } from "@/auth";
import { redirect } from "@/app/i18n/navigation";
import { getTranslations } from "next-intl/server";
import SignUpForm from "./sign-up-form";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("signUp");

  return {
    title: t("pageTitle"),
  };
}

const SignUp = async ({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    callbackUrl?: string;
  }>;
}) => {
  const metaT = await getTranslations("metadata");
  const t = await getTranslations("signUp");
  const { locale } = await params;
  const { callbackUrl } = await searchParams;

  const session = await auth();

  if (session) {
    return redirect({ href: callbackUrl || "/", locale });
  }

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
              className="w-40 h-auto"
            />
          </Link>
          <CardTitle className="text-center">{t("createAccount")}</CardTitle>
          <CardDescription className="text-center">
            {t("createAccountDescription")}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <SignUpForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;
