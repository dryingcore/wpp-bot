import EnvConfig from '@/config/EnvConfig';

export default {
  schema: './src/infrastructure/db/schema.ts',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString: EnvConfig.getPostgresConnectionString(),
  },
};
