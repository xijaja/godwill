import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { join } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // '@': join(__dirname, "src"),
      '@components': join(__dirname, "src/components"),
      '@styles': join(__dirname, "src/styles"),
      '@store': join(__dirname, "src/store"),
      '@pages': join(__dirname, "src/pages"),
      '@lib': join(__dirname, "src/lib"),
    }
  }
})
