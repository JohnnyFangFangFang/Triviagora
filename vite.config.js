import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist", // 指定輸出目錄為 'dist'
  },
  resolve: {
    alias: {
      // 將 src 目錄設置為絕對路徑
      "@": "/src",
    },
  },
});
