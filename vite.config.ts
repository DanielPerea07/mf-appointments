import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
    rollupOptions: {
      input: resolve(__dirname, 'src/main.tsx'),
      output: {
        format: 'es',
        entryFileNames: 'mf-appointments.js',
        assetFileNames: 'mf-appointments.[ext]',
      },
    },
  },
});
