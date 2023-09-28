import { DataProvider } from '@/context/DataContext';

export const Providers = ({ children }: any) => {
  return <DataProvider>{children}</DataProvider>;
};
