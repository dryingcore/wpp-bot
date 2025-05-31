import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import EnvConfig from '@/config/EnvConfig';

EnvConfig.ensureAll();

const pool = new Pool({
  connectionString: EnvConfig.getPostgresConnectionString(),
  max: 10,
  idleTimeoutMillis: 10_000,
  connectionTimeoutMillis: 5_000,
});

export const db = drizzle(pool);
