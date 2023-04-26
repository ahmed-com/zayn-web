import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'static': [
            './src/views/AboutUs',
            './src/views/ContactUs',
            './src/views/PrivacyPolicy',
            './src/views/TermsOfUse',
          ],

          'main': [
            './src/views/404',
            './src/views/Dashboard',
            './src/views/Profile',
            './src/views/Redirect',
            './src/views/Register',
            './src/views/Search',
            './src/views/SellerLogin',
            './src/views/SignIn',
            './src/views/UserView/Index',
            './src/views/UserView/Info',
            './src/views/UserView/Chat',
            './src/views/OrderView/Index',
            './src/views/OrderView/Info',
            './src/views/OrderView/Chat',
          ]
        }
      }
    }
  }
})
