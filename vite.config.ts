import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
  plugins: [react(), cloudflare()],
  build: {
    rollupOptions: {
      input: {
        app: "index.html"
      }
    }
  },
  server: {
    host: "127.0.0.1",
    port: 4173,
    allowedHosts: [
      "75328670.r9.cpolar.top"
    ]
  }
});