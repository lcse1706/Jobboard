import {
  DataProvider,
  HelpersProvider,
  NextAuthProvider, // ToastProvider,
} from "@/context";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    // <ToastProvider>
    <DataProvider>
      <HelpersProvider>
        <NextAuthProvider>{children}</NextAuthProvider>
      </HelpersProvider>
    </DataProvider>
    // </ToastProvider>
  );
};
