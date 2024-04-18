import { loadEnvConfig } from '@next/env'

const projectRoot = process.cwd();
loadEnvConfig(projectRoot);

const config = {
    DATABASE_URL: process.env.DATABASE_URL as string,
}

export default config;