import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  
  // Optimize for Windows file handle limits
  server: {
    watch: {
      usePolling: false,
      useFsEvents: false,
    },
    fs: {
      strict: false,
    },
  },
  
  // Optimize build process
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Split MUI icons into separate chunks to reduce file handles
          if (id.includes('@mui/icons-material')) {
            // Extract icon name and group them in batches
            const match = id.match(/@mui\/icons-material\/(\w)/);
            if (match) {
              // Group icons by first letter to reduce chunk count
              return `mui-icons-${match[1].toLowerCase()}`;
            }
            return 'mui-icons';
          }
          if (id.includes('@mui/material')) {
            return 'mui-core';
          }
          // Don't chunk @dnd-kit packages - let Rollup resolve dependencies naturally
          if (id.includes('node_modules') && !id.includes('@dnd-kit')) {
            return 'vendor';
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    // Reduce concurrent file operations
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  
  // Add resolve configuration
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
  
  // Optimize dependencies - only include what's actually used
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
