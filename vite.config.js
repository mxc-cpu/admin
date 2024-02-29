import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 6600,
    cors:true,
    proxy: {
      '/api': {
        target: 'https://localhost:7112/api/',
        secure:false,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
     '/ip': {
        target: 'http://pv.sohu.com/',
        changeOrigin: true,
        rewrite: (path) => path.replace('^/ip' , ''),
      },
    },
  },

})
