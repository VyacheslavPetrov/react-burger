const { defineConfig } = require('cypress')

export default defineConfig({
    e2e: {
        baseUrl: "http://localhost:3000",
    }
});