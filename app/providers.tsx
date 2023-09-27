import { DataProvider } from '@/context/Data.Context';

export const Providers = ({ children }: any) => {
  return <DataProvider>{children}</DataProvider>;
};
