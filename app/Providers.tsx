import {
  DataProvider,
  HelpersProvider,
  NextAuthProvider,
  ToastProvider,
} from "@/context";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <NextAuthProvider>
      <ToastProvider>
        <DataProvider>
          <HelpersProvider>{children}</HelpersProvider>
        </DataProvider>
      </ToastProvider>
    </NextAuthProvider>
  );
};
