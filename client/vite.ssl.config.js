import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path';

export default defineConfig({
  plugins: [react()],
  server:{
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