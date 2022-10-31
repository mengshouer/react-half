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
  optimizeDeps: {
    include: ["@ant-design/colors", "@ant-design/icons"],
  },
  build: {
    outDir: "dist",
    minify: "esbuild",
    // sourcemap: true,
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
