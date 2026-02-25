import { exec } from 'node:child_process';
import path from 'node:path';
import { promisify } from 'node:util';
import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import type { Plugin } from 'vite';
import { defineConfig } from 'vite';

const execAsync = promisify(exec);

function wayfinderWatch(): Plugin {
  const patterns = ['routes', 'app/Http'];
  let debounce: ReturnType<typeof setTimeout> | null = null;

  const runWayfinder = async () => {
    try {
      await execAsync('php artisan wayfinder:generate --with-form');
      console.log('[wayfinder] Routes regenerated');
    } catch (err) {
      console.error('[wayfinder] Error:', err);
    }
  };

  return {
    name: 'wayfinder-watch',
    configureServer(server) {
      const root = server.config.root;
      const run = (file: string) => {
        if (!file.endsWith('.php')) return;
        if (debounce) clearTimeout(debounce);
        debounce = setTimeout(() => {
          debounce = null;
          runWayfinder();
        }, 300);
      };

      patterns.forEach((p) => server.watcher.add(path.resolve(root, p)));
      server.watcher.on('add', run);
      server.watcher.on('change', run);
    },
  };
}

export default defineConfig({
  plugins: [
    laravel({
      input: ['resources/css/app.css', 'resources/js/app.tsx'],
      ssr: 'resources/js/ssr.tsx',
      refresh: true,
    }),
    react({
      babel: {
        plugins: ['babel-plugin-react-compiler'],
      },
    }),
    tailwindcss(),
    // Skip Wayfinder plugin on Vercel—PHP isn't available; use pre-generated files
    ...(process.env.VERCEL !== '1'
      ? [wayfinder({ formVariants: true }), wayfinderWatch()]
      : []),
  ],
  esbuild: {
    jsx: 'automatic',
  },
});
