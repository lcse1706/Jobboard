import { DataProvider } from '@/context/DataContext';
import { HoverProvider } from '@/context/HoverContext';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <DataProvider>
      <HoverProvider>{children}</HoverProvider>
    </DataProvider>
  );
};
