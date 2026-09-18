import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// Demo target app. Fixed port so the extension/agent can rely on it.
export default defineConfig({
  plugins: [react()],
  server: { port: 5173, strictPort: true },
  preview: { port: 5173, strictPort: true },
});
