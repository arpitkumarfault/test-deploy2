import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': 'https://test-deploy2-new-backend.onrender.com',
    }
  },
  plugins: [react()],
})
