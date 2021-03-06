import * as path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
const config = ({ mode }) => {
  return defineConfig({
    plugins: [react()],
    define: {
      'process.env.NODE_ENV': `"${mode}"`,
    },
    resolve: {
      alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
    },
  });
};

export default config;
