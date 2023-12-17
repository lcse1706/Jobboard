import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { GoogleSignInButton } from "@/components/ui/AuthButtons";

import { CredentialsForm } from "./components/CredentialsForm";
import { RegisterForm } from "./components/RegisterForm";
import { authConfig } from "./lib/auth";

export default async function SignInPage() {
  const session = await getServerSession(authConfig);
  if (session) return redirect("/");

  return (
    <div className="w-full flex flex-row items-center justify-center min-dh-screen py-2">
      <div className="flex flex-col items-center mt-10 p-10 mr-5 shadow-lg border border-gray-200 rounded-md bg-white">
        <h1 className="mt-10 mb-4 text-4xl font-bold">Sign In</h1>
        <GoogleSignInButton />

        <span className="text-2xl font-semibold text-black text-center mt-8">
          Or
        </span>
        <CredentialsForm />
      </div>
      <div className="flex flex-col items-center mt-10 p-10 shadow-lg border border-gray-200 rounded-md bg-white">
        <h1 className="mt-10 mb-4 text-4xl font-bold">Register</h1>
        <RegisterForm />
      </div>
    </div>
  );
}
