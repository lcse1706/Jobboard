import { DataProvider, HelpersProvider, NextAuthProvider } from "@/context";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <DataProvider>
      <HelpersProvider>
        <NextAuthProvider>{children}</NextAuthProvider>
      </HelpersProvider>
    </DataProvider>
  );
};
