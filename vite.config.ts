import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    hmr: {
      clientPort: 5173,
    }
  },
  plugins: [react()],
  define: {
    'process.env': process.env
  }
})
