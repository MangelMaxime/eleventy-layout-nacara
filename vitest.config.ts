import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        globalSetup: './tests/utils/globalSetup.js',
        open: false,
    },
})
