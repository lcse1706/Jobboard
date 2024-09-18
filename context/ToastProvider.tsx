"use client";

import { Toaster } from "react-hot-toast";

import { ToastProviderProps } from "./types";

export function ToastProvider({ children }: ToastProviderProps) {
  return (
    <>
      {children}
      <Toaster position="bottom-right" />
    </>
  );
}
