import { DataProvider } from '@/context/DataContext';
import { HelpersProvider } from '@/context/HelpersContext';
import { HoverProvider } from '@/context/HoverContext';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <DataProvider>
      <HoverProvider>
        <HelpersProvider>{children}</HelpersProvider>
      </HoverProvider>
    </DataProvider>
  );
};
