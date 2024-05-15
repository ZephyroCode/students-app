import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  site: 'https://zephyrocode.github.io',
  base: 'students-app',
  output: "server",
  adapter: node({
    mode: "standalone"
  })
});