import { DataProvider } from '@/context/DataContext';
import { HoverProvider } from '@/context/HoverContext';

export const Providers = ({ children }: any) => {
  return (
    <DataProvider>
      <HoverProvider>{children}</HoverProvider>
    </DataProvider>
  );
};
