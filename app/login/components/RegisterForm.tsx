"use client";

import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { zodResolver } from "@hookform/resolvers/zod";
import { NextPage } from "next";

import { Button, Input } from "@/components/ui";
import { TRegisterSchema, registerSchema } from "@/lib/types";
import { registerUser } from "@/services";

export const RegisterForm: NextPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TRegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const registerNotify = () =>
    toast.success("Register complete. Please log in !");

  const registerFailedNotify = () =>
    toast.error("Something went wrong. Please try again later !");

  const submitHandler = async (data: TRegisterSchema) => {
    try {
      await registerUser(data);
      registerNotify();
    } catch (error) {
      registerFailedNotify();
      throw new Error(error);
    }

    reset();
  };

  return (
    <div className="flex flex-col items-center mt-10 p-10 mx-5 shadow-lg border border-gray-200 rounded-md bg-white">
      <h1 className="mt-10 mb-4 text-4xl font-bold">Register</h1>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="w-full mt-8 text-xl text-black font-semibold flex flex-col"
      >
        <Input
          label="Email"
          {...register("email")}
          type="email"
          placeholder="Email"
          className="w-full px-4 py-4 mb-4 border border-gray-300 rounded-md"
          error={errors.email}
        />

        <Input
          label="Name"
          {...register("name")}
          placeholder="Your name"
          className="w-full px-4 py-4 mb-4 border border-gray-300 rounded-md"
          error={errors.name}
        />
        <Input
          label="Password"
          {...register("password")}
          type="password"
          placeholder="Password"
          className="w-full px-4 py-4 mb-4 border border-gray-300 rounded-md"
          error={errors.password}
        />
        <Input
          label="Confirm Password"
          {...register("confirmPassword")}
          type="password"
          placeholder="Confirm password"
          className="w-full px-4 py-4 mb-4 border border-gray-300 rounded-md"
          error={errors.confirmPassword}
        />
        <Button type="submit" label="Register" />
      </form>
    </div>
  );
};
