import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// Determine if we're building as a library
const isLibraryBuild = process.env.LIBRARY_BUILD === 'true'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    }
  },
  build: isLibraryBuild ? {
    // Library build configuration
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'VafaChatWidget',
      fileName: (format) => `vafa-chat-widget.${format}.js`
    },
    rollupOptions: {
      // Make sure to externalize dependencies that shouldn't be bundled
      external: ['vue'],
      output: {
        // Global variables to use in UMD build for externalized deps
        globals: {
          vue: 'Vue'
        }
      }
    }
  } : {
    // Regular build configuration for app mode
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        embedDemo: resolve(__dirname, 'public/embed-demo.html')
      }
    }
  },
  server: {
    host: '0.0.0.0',
    port: 3000
  }
})
