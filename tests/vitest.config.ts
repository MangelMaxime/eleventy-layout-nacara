import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        globalSetup: './utils/globalSetup.js',
        open: false,
    },
})
