import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { GoogleSignInButton } from "@/components/ui/AuthButtons";
import { isMobileDevice } from "@/lib/isMobileDevice";

import { CredentialsForm } from "./components/CredentialsForm";
import Login from "./components/Login";
import Register from "./components/Register";
import { RegisterForm } from "./components/RegisterForm";
import { authConfig } from "./lib/auth";

export default async function SignInPage() {
  const isMobile = isMobileDevice();

  const session = await getServerSession(authConfig);
  if (session) return redirect("/");

  return (
    <div
      className={
        isMobile ? "flex flex-col" : "w-full flex flex-row justify-center"
      }
    >
      <Login />
      <Register />
    </div>
  );
}
