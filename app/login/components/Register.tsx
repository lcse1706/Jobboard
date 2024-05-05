import React from "react";

import { RegisterForm } from "./RegisterForm";

export default function Register() {
  return (
    <div className="flex flex-col items-center mt-10 p-10 mx-5 shadow-lg border border-gray-200 rounded-md bg-white">
      <h1 className="mt-10 mb-4 text-4xl font-bold">Register</h1>
      <RegisterForm />
    </div>
  );
}
