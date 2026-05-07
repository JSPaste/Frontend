import { resolve } from "node:path";
import { constants as zlibConstants } from "node:zlib";
import tailwindcss from "@tailwindcss/vite";
import browserslistToEsbuild from "browserslist-to-esbuild";
import { browserslistToTargets } from "lightningcss";
import type { UserConfig } from "vite";
import { analyzer } from "vite-bundle-analyzer";
import solid from "vite-plugin-solid";
import manifest from "./package.json" with { type: "json" };

export default {
  appType: "spa",
  cacheDir: "./node_modules/.tmp",
  build: {
    target: browserslistToEsbuild(manifest.browserslist),
    outDir: "./dist/frontend/",
    reportCompressedSize: false,
    rollupOptions: {
      output: {
        entryFileNames: "assets/router-[hash].js",
        chunkFileNames: "assets/chunk-[hash].js",
        assetFileNames: "assets/chunk-[hash][extname]"
      }
    }
  },
  css: {
    transformer: "lightningcss",
    lightningcss: {
      targets: browserslistToTargets(manifest.browserslist)
    },
    devSourcemap: true
  },
  plugins: [
    solid(),
    tailwindcss(),
    analyzer({
      enabled: process.env.VITE_ANALYZE === "true",
      analyzerPort: "auto",
      summary: true,
      reportTitle: manifest.name,

      // sidecars with max compression
      gzipOptions: {
        level: zlibConstants.Z_BEST_COMPRESSION
      },
      brotliOptions: {
        params: {
          [zlibConstants.BROTLI_PARAM_QUALITY]: zlibConstants.BROTLI_MAX_QUALITY
        }
      }
    })
  ],
  resolve: {
    alias: {
      "#": resolve("./src"),
      "#component": resolve("./src/components"),
      "#extension": resolve("./src/extensions"),
      "#screen": resolve("./src/screens"),
      "#util": resolve("./src/utils")
    }
  }
} satisfies UserConfig;
