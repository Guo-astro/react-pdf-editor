import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { peerDependencies, name } from "./package.json";

import path from "path";
import dts from "vite-plugin-dts";
function transformPdfJsWorker(): Plugin {
  return {
    name: "transform-pdf-js-worker",
    generateBundle(options, bundle) {
      for (const [fileName, chunkOrAsset] of Object.entries(bundle)) {
        if (!fileName.includes("pdf.worker") || chunkOrAsset.type !== "asset") {
          continue;
        }
        const prepend = Buffer.from(
          `if (typeof Promise.withResolvers === "undefined") {
            Promise.withResolvers = function () {
              let resolve, reject
              const promise = new Promise((res, rej) => {
                resolve = res
                reject = rej
              })
              return { promise, resolve, reject }
            }
          }
          `,
          "utf-8"
        );
        const sourceBuffer = Buffer.isBuffer(chunkOrAsset.source)
          ? chunkOrAsset.source
          : Buffer.from(chunkOrAsset.source);
        chunkOrAsset.source = Buffer.concat([prepend, sourceBuffer]);
      }
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),

    dts({
      rollupTypes: true,
      tsconfigPath: "./tsconfig.app.json",
      exclude: ["**/*.stories.ts", "**/*.test.ts"],
    }),
  ],
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    sourcemap: true,
    emptyOutDir: true,
    lib: {
      entry: "./src/index.ts",
      name: name,
      fileName: (format) => `index.${format}.js`,
      formats: ["es", "cjs", "umd"],
    },
    rollupOptions: {
      plugins: [transformPdfJsWorker()],
      external: Object.keys(peerDependencies),
      output: { globals: { react: "React", "react-dom": "ReactDOM" } },
    },
  },
});
