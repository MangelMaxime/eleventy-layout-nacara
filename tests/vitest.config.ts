import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    globalSetup: './utils/globalSetup.js',
    open: false,
  },
})
