import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteTsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";

export default defineConfig({
  plugins: [
    viteTsconfigPaths(),
    tanstackStart(),
    react(),
    tailwindcss(),
    nitro({
      preset: "vercel",
    }),
  ],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
