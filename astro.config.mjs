// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // เว็บจริงจะอยู่ที่ URL นี้ (repo ต้องชื่อ kriangsit-dev.github.io)
  site: 'https://kriangsit-dev.github.io',

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'th'],
    routing: {
      prefixDefaultLocale: false, // อังกฤษอยู่ที่ /, ไทยอยู่ที่ /th/
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
