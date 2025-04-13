import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { CookiesProvider } from 'react-cookie';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';

const client = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchOnReconnect: false,
        },
    },
});
function App() {
    return (
        <RecoilRoot>
            <QueryClientProvider client={client}>
                <CookiesProvider>
                    <ThemeProvider theme={theme}>
                        <RouterProvider router={router} />
                    </ThemeProvider>
                </CookiesProvider>
            </QueryClientProvider>
        </RecoilRoot>
    );
}
export default App;
