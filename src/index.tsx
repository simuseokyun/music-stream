import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { CookiesProvider } from 'react-cookie';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';

const client = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
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
