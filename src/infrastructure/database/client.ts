import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import EnvConfig from '@/config/EnvConfig';

EnvConfig.ensureAll();

const pool = new Pool({
  connectionString: EnvConfig.getPostgresConnectionString(),
});

export const db = drizzle(pool);
