import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import sveltePreprocess from 'svelte-preprocess';
import * as dotenv from 'dotenv';

export default defineConfig(({ mode }) => {
  const env = dotenv.config().parsed;

  return {
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
    },
    base: '/',
    mode,
    define: {
      'process.env': env,
    },
  }
})