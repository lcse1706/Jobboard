import { getServerSession } from "next-auth";
import { getCsrfToken } from "next-auth/react";
import { redirect } from "next/navigation";

import { CredentialsForm } from "@/components/CredentialsForm";
import {
  CredentialsSignInButton,
  GithubSignInButton,
  GoogleSignInButton,
} from "@/components/authButtons";
import { authConfig } from "@/lib/auth";

export default async function SignInPage() {
  const session = await getServerSession(authConfig);

  console.log("Session: ", session);

  if (session) return redirect("/");
  // if (session) {
  //   console.log("zalogowany");
  // }

  return (
    <div className="w-full flex flex-col items-center justify-center min-dh-screen py-2">
      <div className="flex flex-col items-center mt-10 p-10 shadow-lg border border-gray-200 rounded-md">
        <h1 className="mt-10 mb-4 text-4xl font-bold">Sign In</h1>
        <GoogleSignInButton />
        {/* <GithubSignInButton /> */}
        <span className="text-2xl font-semibold text-black text-center mt-8">
          Or
        </span>
        {/* <CredentialsSignInButton /> */}
        <CredentialsForm />
      </div>
    </div>
  );
}
