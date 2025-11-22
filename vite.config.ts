import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [
      react(),
      federation({
        name: 'orchestrator',
        filename: 'remoteEntry.js',
        remotes: {
          characters: env.VITE_REMOTE_CHARACTERS_URL,
          locations: env.VITE_REMOTE_LOCATIONS_URL,
        },
        shared: [
          'react',
          'react-dom',
          '@mui/material',
          '@emotion/react',
          '@emotion/styled',
          'rick-morty-components-lib',
          'react-router-dom',
        ],
      }),
    ],
    build: {
      modulePreload: false,
      target: 'esnext',
      minify: false,
      cssCodeSplit: false,
    },
    server: {
      port: 5000,
    },
  };
});
