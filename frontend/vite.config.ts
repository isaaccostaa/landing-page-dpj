import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    host: true, // permite abrir pelo celular na mesma rede Wi-Fi (http://IP-DO-PC:5173)
    proxy: {
      '/api': 'http://127.0.0.1:8000',
    },
  },
})
