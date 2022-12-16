/// <reference types="vitest" />
import { defineConfig } from 'vite'

export default defineConfig({
    test: {
        // benchmark: {},
        reporters: ['verbose',]
    },
    build: {
        minify: true,
        sourcemap: true,
        target: 'es2022',
        lib: {
            entry: "src/index.ts",
            formats: ['es'],
            name: 'Math',
            fileName: 'math'
        }
    }
})
