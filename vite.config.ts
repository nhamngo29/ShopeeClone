// eslint-disable-next-line import/no-unresolved
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()] as any,
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'ssl/localhost-key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, 'ssl/localhost.pem'))
    },
    host: 'localhost',
    port: 3000 // hoặc port mà bạn muốn
  },
  css: {
    devSourcemap: true
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src')
    }
  }
})
