import { defineConfig } from 'drizzle-kit'
import config from './lib/config'

export default defineConfig({
    schema: "./lib/schema.ts",
    out: "./drizzle",
    driver: "pg",
    dbCredentials: {
        connectionString: config.POSTGRES_URL,
    },
    verbose: true,
    strict: true,
})