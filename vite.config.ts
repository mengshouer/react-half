import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { createHtmlPlugin } from "vite-plugin-html";
import "dotenv/config";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          "primary-color": "#1890ff",
        },
        javascriptEnabled: true,
      },
    },
  },
  server: {
    host: process.env.VITE_APP_HOST || "127.0.0.1",
    port: Number(process.env.VITE_APP_PORT) || 31212,
    cors: true,
  },
  build: {
    outDir: "dist",
    // esbuild 打包更快，但是不能去除 console.log，去除 console 使用 terser 模式
    minify: "esbuild",
    // minify: "terser",
    // terserOptions: {
    // 	compress: {
    // 		drop_console: viteEnv.VITE_DROP_CONSOLE,
    // 		drop_debugger: true
    // 	}
    // },
    rollupOptions: {
      output: {
        // Static resource classification and packaging
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
      },
    },
  },
  plugins: [
    react(),
    createHtmlPlugin({
      inject: {
        data: {
          title: process.env.VITE_APP_TITLE || "Half-Half",
        },
      },
    }),
  ],
});
