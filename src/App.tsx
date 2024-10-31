import { MsalProvider } from '@azure/msal-react';
import { PublicClientApplication } from '@azure/msal-browser';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { msalConfig } from '@/config/authConfig';
import { ItemList } from '@/components/ItemsList';
import { ItemForm } from '@/components/ItemsForm';

const msalInstance = new PublicClientApplication(msalConfig);
const queryClient = new QueryClient();

function App() {
  return (
    <MsalProvider instance={msalInstance}>
      <QueryClientProvider client={queryClient}>
        <div className="min-h-screen bg-gray-100 p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            <ItemForm />
            <ItemList />
          </div>
        </div>
      </QueryClientProvider>
    </MsalProvider>
  );
}

export default App;
