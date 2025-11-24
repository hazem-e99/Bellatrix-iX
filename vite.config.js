import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import checker from 'vite-plugin-checker'   // ⬅ إضافة جديدة

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),

    // ⬅ يكشف مشاكل الـ import والحروف
    checker({
      typescript: false,
      eslint: false,
      vueTsc: false,
      overlay: true,
    }),
  ],

  server: {
    watch: {
      usePolling: false,
      useFsEvents: false,
    },
    fs: {
      strict: false,
    },
  },

  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('@mui/icons-material')) {
            const match = id.match(/@mui\/icons-material\/(\w)/);
            if (match) {
              return `mui-icons-${match[1].toLowerCase()}`;
            }
            return 'mui-icons';
          }
          if (id.includes('@mui/material')) {
            return 'mui-core';
          }
          if (id.includes('node_modules') && !id.includes('@dnd-kit')) {
            return 'vendor';
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },

  resolve: {
    dedupe: ['react', 'react-dom'],
  },

  optimizeDeps: {
    include: [
      '@mui/material', 
      'react', 
      'react-dom', 
      'react-router-dom',
      '@dnd-kit/core',
      '@dnd-kit/sortable',
      '@dnd-kit/utilities',
    ],
    exclude: ['@mui/icons-material'],
  },
})
