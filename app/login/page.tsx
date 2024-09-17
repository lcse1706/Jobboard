import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { isMobileDevice } from "@/lib/isMobileDevice";

import { LoginForm } from "./components/LoginForm";
import { RegisterForm } from "./components/RegisterForm";
import { authConfig } from "./lib/auth";

export default async function SignInPage() {
  const isMobile = await isMobileDevice();

  const session = await getServerSession(authConfig);
  if (session) return redirect("/");

  return (
    <div
      className={
        isMobile ? "flex flex-col pb-5" : "w-full flex flex-row justify-center"
      }
    >
      <LoginForm />
      <RegisterForm />
    </div>
  );
}
