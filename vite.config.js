import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    build: {
      manifest: true,
      rollupOptions: {
        input: "./src/main.jsx",
      },
    },
    server: {
      port: 5173,
      hmr: mode !== 'production',
    },
    envPrefix: 'VITE_', // Ensure the environment variable prefix is correct
  };
});