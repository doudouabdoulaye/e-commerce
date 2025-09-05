import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), //  N'oubliez pas ce plugin pour que Vite comprenne le JSX !
    tailwindcss()
  ],
  base: '/e-commerce/' //  C'est la ligne clé pour le déploiement sur GitHub Pages.
});