"use client";

import { SessionProvider } from "next-auth/react";

import { AuthProviderProps } from "./types";

export const NextAuthProvider = ({ children }: AuthProviderProps) => {
  return <SessionProvider>{children}</SessionProvider>;
};
