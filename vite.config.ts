import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [
      react(), 
      tailwindcss()
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
      dedupe: ['react', 'react-dom', 'framer-motion', 'motion'],
    },
    build: {
      chunkSizeWarningLimit: 2000,
      sourcemap: false,
      minify: 'esbuild',
      cssMinify: true,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('/node_modules/react/') || id.includes('/node_modules/react-dom/') || id.includes('/node_modules/react-router-dom/') || id.includes('/node_modules/react-router/')) {
                return 'vendor-react';
              }
              if (id.includes('/node_modules/three/') || id.includes('/node_modules/@react-three/')) {
                return 'vendor-three';
              }
              if (id.includes('/node_modules/framer-motion/') || id.includes('/node_modules/motion/')) {
                return 'vendor-motion';
              }
              if (id.includes('/node_modules/firebase/') || id.includes('/node_modules/@firebase/')) {
                return 'vendor-firebase';
              }
              if (id.includes('/node_modules/lucide-react/')) {
                return 'vendor-lucide';
              }
              if (id.includes('/node_modules/jspdf/') || id.includes('/node_modules/jspdf-autotable/')) {
                return 'vendor-jspdf';
              }
              if (id.includes('/node_modules/html2canvas/')) {
                return 'vendor-html2canvas';
              }
              if (id.includes('/node_modules/xlsx/')) {
                return 'vendor-xlsx';
              }
              if (id.includes('/node_modules/recharts/')) {
                return 'vendor-recharts';
              }
              if (id.includes('/node_modules/date-fns/')) {
                return 'vendor-date-fns';
              }
              if (id.includes('/node_modules/zustand/')) {
                return 'vendor-zustand';
              }
              // Catch-all for remaining node_modules, splitting them by package name to avoid one massive chunk
              const match = id.match(/\/node_modules\/([^/]+)/);
              if (match) {
                return `vendor-${match[1].replace('@', '')}`;
              }
              return 'vendor';
            }
          }
        }
      }
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
