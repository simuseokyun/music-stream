import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { router } from './routes/router';

const client = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            refetchOnWindowFocus: false,
            refetchOnMount: true,
            refetchOnReconnect: false,
        },
    },
});
function App() {
    return (
        <QueryClientProvider client={client}>
            <RouterProvider router={router} />
            <ReactQueryDevtools />
        </QueryClientProvider>
    );
}
export default App;
