import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter()
  },
  preprocess: vitePreprocess({
    style: {
      scss: {
        includePaths: ['src/styles'],
        quietDeps: true,
        outputStyle: 'compressed'
      }
    }
  })
};

export default config;
