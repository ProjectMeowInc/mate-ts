import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import dts from "vite-plugin-dts"
import path, { extname, relative } from "path"
import { fileURLToPath } from "url"
import { glob } from "glob"

export default defineConfig({
    plugins: [
        react(),
        dts({
            insertTypesEntry: true,
        }),
    ],
    build: {
        lib: {
            entry: path.resolve(__dirname, "src/index.ts"),
            name: "MyLib",
            formats: ["umd"],
            fileName: (format) => `mate-ts.${format}.js`,
        },
        rollupOptions: {
            external: ["react", "react-dom", "styled-components"],
            output: {
                globals: {
                    react: "React",
                    "react-dom": "ReactDOM",
                },
            },
        },
    },
})
