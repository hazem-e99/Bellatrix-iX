import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [ tailwindcss(),react()],
  optimizeDeps: {
    include: [
      '@dnd-kit/core', 
      '@dnd-kit/sortable', 
      '@dnd-kit/utilities',
      'socket.io-client'
    ],
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true,
    },
    rollupOptions: {
      external: (id) => {
        // Externalize dev tools in production build (they're only used in dev mode)
        if (id.includes('@tanstack/react-query-devtools') || 
            id.includes('@tanstack/query-devtools')) {
          return true;
        }
        return false;
      },
      output: {
        manualChunks: (id) => {
          // Group dnd-kit packages
          if (id.includes('@dnd-kit')) {
            return 'dnd-kit';
          }
          // Group MUI icons to reduce file operations
          if (id.includes('@mui/icons-material')) {
            return 'mui-icons';
          }
          // Group MUI core
          if (id.includes('@mui/material') || id.includes('@mui/system')) {
            return 'mui-core';
          }
          // Group node_modules
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
      maxParallelFileOps: 5, // Limit concurrent file operations
    },
    chunkSizeWarningLimit: 1000,
  },
  resolve: {
    dedupe: ['@dnd-kit/core', '@dnd-kit/sortable', '@dnd-kit/utilities'],
  },
})
