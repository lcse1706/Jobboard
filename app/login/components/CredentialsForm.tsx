"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Button, Input } from "@/components/ui";
import { TLoginSchema, loginSchema } from "@/lib/types";

interface CredentialsFormProps {
  csrfToken?: string;
}

export function CredentialsForm(props: CredentialsFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const { register, handleSubmit } = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const submitHandler = async (data: TLoginSchema) => {
    const signInResponse = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (signInResponse && !signInResponse.error) {
      router.push("/");
    } else {
      console.log("Error: ", signInResponse);
      setError("Your Email or Password is wrong!");
    }
  };

  return (
    <form
      className="w-full mt-8 text-xl text-black font-semibold flex flex-col"
      onSubmit={handleSubmit(submitHandler)}
    >
      {error && (
        <span className="p-4 mb-2 text-lg font-semibold text-white bg-red-500 rounded-md">
          {error}
        </span>
      )}
      <Input
        {...register("email")}
        type="email"
        placeholder="Email"
        className="w-full px-4 py-4 mb-4 border border-gray-300 rounded-md"
      />
      <Input
        {...register("password")}
        type="password"
        placeholder="Password"
        className="w-full px-4 py-4 mb-4 border border-gray-300 rounded-md"
      />
      <Button label="Log in" type="submit" />
    </form>
  );
}
