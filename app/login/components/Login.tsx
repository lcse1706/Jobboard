import React from "react";

import { GoogleSignInButton } from "@/components/ui/AuthButtons";

import { CredentialsForm } from "./CredentialsForm";

export default function Login() {
  return (
    <div className="flex flex-col items-center mt-10 p-10 mx-5 shadow-lg border border-gray-200 rounded-md bg-white">
      <h1 className="mt-10 mb-4 text-4xl font-bold">Sign In</h1>
      <GoogleSignInButton />

      <span className="text-2xl font-semibold text-black text-center mt-8">
        Or
      </span>
      <CredentialsForm />
    </div>
  );
}
