import { loadEnvConfig } from '@next/env'

const projectRoot = process.cwd();
loadEnvConfig(projectRoot);

import { config } from 'dotenv';
config({ path: ".env.development.local"});

const drizzleConfig = {
    POSTGRES_URL: process.env.POSTGRES_URL as string,
    // POSTGRES_DATABASE: process.env.POSTGRES_DATABASE as string,
    // POSTGRES_HOST: process.env.POSTGRES_HOST as string,
}

export default drizzleConfig;