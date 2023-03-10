import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

import Components from 'unplugin-vue-components/vite';

import { IonicResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      extensions: ['vue'],
      dirs: ['src/components'],
      resolvers: [IonicResolver()],
    }),
  ],
});
