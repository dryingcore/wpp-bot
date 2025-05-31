import { defineConfig } from 'drizzle-kit';
import EnvConfig from '@/config/EnvConfig';

export default defineConfig({
  schema: './src/infrastructure/database/schema',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    ssl: false,
    host: EnvConfig.POSTGRES_HOST,
    port: EnvConfig.POSTGRES_PORT,
    user: EnvConfig.POSTGRES_USER,
    password: EnvConfig.POSTGRES_PASSWORD,
    database: EnvConfig.POSTGRES_DB,
  },
});
