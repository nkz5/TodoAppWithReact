import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: "Todo App with react",
        short_name: "Todo",
        description: "Todo プログレッシブウェブアプリ",
        start_url: ".",
        display: "standalone",
        orientation: "portrait",
        theme_color: "#3f51b2",
        background_color: "#efeff4",
        icons: [
          {
            src: "icon192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icon512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "icon512_mask.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
  ],
});
