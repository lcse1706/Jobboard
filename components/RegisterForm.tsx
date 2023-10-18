"use client";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { NextPage } from "next";

import { TRegisterSchema, registerSchema } from "@/lib/types";
import { registerUser } from "@/services/users";

import { Button, Input } from "./ui";

export const RegisterForm: NextPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TRegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const submitHandler = async (data: TRegisterSchema) => {
    try {
      await registerUser(data);
    } catch (error) {
      console.log(error);
    }

    reset();
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="w-full mt-8 text-xl text-black font-semibold flex flex-col"
      >
        <Input
          register={register("email")}
          type="email"
          placeholder="Email"
          className="w-full px-4 py-4 mb-4 border border-gray-300 rounded-md"
        />
        {errors.email && (
          <p className="text-red-500">{`${errors.email.message}`}</p>
        )}
        <Input
          register={register("password")}
          type="password"
          placeholder="Password"
          className="w-full px-4 py-4 mb-4 border border-gray-300 rounded-md"
        />
        {errors.password && (
          <p className="text-red-500">{`${errors.password.message}`}</p>
        )}
        <Input
          register={register("confirmPassword")}
          type="password"
          placeholder="Confirm password"
          className="w-full px-4 py-4 mb-4 border border-gray-300 rounded-md"
        />
        {errors.confirmPassword && (
          <p className="text-red-500">{`${errors.confirmPassword.message}`}</p>
        )}
        <Button type="submit" label="Register" />
      </form>
    </div>
  );
};
