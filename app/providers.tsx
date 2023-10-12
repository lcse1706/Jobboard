import { DataProvider } from '@/context/DataContext';
import { HelpersProvider } from '@/context/HelpersContext';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <DataProvider>
      <HelpersProvider>{children}</HelpersProvider>
    </DataProvider>
  );
};
