import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
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