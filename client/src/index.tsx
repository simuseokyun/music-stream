import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import App from './App';

const rootElement = document.getElementById('root') as HTMLElement;
const root = createRoot(rootElement);

if (process.env.NODE_ENV === 'development') {
    root.render(
        <StrictMode>
            <App />
        </StrictMode>
    );
} else {
    root.render(<App />);
}
