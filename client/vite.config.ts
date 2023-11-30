import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    host:"127.0.0.1",
    https: {
      key: './ssl/privatekey.key',
      cert: './ssl/certificate.crt',
    },
  },
  resolve: {
    alias: [
        { find: '@', replacement: path.resolve(__dirname, 'src') },
    ],
  },
})
