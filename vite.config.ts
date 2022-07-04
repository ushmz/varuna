// import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  server: {
    open: true,
  },
  build: {
    outDir: "build",
  },
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      // "@varuna": fileURLToPath(new URL("./src", import.meta.url)),
      // "@style": fileURLToPath(new URL("./style", import.meta.url)),
    },
  },
});
