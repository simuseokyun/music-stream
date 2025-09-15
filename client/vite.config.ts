import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    test: {
        environment: 'jsdom',
        setupFiles: './src/setupTests.ts',
    },
    build: {
        outDir: 'dist',
        emptyOutDir: true,
        rollupOptions: {
            input: 'index.html',
        },
    },
    server: {
        port: 3000,
        open: true,
        proxy: {
            '/api': {
                target: 'http://localhost:8000',
                rewrite: (path) => path.replace(/^\/api/, ''),
                changeOrigin: true,
            },
        },
    },
    base: '/',
});
