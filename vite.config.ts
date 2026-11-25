import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";

// Served from a project page: https://<user>.github.io/VPM-Docs/
// Keep this in sync with `url` in site.config.mjs.
export default defineConfig({
    base: "/VPM-Docs/",
    plugins: [react()],
    build: {
        outDir: "dist",
        emptyOutDir: true,
        // Keep the icon SVGs as real files instead of inlining them into the CSS.
        assetsInlineLimit: 0,
    },
});
