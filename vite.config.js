import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Changing this to './' makes paths relative, 
  // allowing it to work on Vercel, GitHub Pages, or any subfolder.
  base: './',
})