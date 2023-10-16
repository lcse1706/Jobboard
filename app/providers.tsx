import { DataProvider } from "@/context/DataContext";
import { HelpersProvider } from "@/context/HelpersContext";
import { NextAuthProvider } from "@/context/NextAuthProvider";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <DataProvider>
      <HelpersProvider>
        <NextAuthProvider>{children}</NextAuthProvider>
      </HelpersProvider>
    </DataProvider>
  );
};
