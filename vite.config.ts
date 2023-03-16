import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import sveltePreprocess from 'svelte-preprocess';

export default defineConfig({
  plugins: [svelte({
    preprocess: sveltePreprocess(),
  })],
  resolve: {
    alias: {
      src:  '/src',
      assets: '/src/assets',
      components: '/src/components',
      lib: '/src/lib',
      pages: '/src/pages',
      store: '/src/store',
    }
  }
})