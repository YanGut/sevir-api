export default () => ({
  port: parseInt(process.env.API_PORT ? process.env.API_PORT : '8000', 10) || 8000,
  database: {
    postgres: {
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT || '5433', 10),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
    },
    synchronize: process.env.DATABASE_SYNCHRONIZE,
  },
  cors: { origin: process.env.CORS_ORIGIN || '*' },
  environment: process.env.NODE_ENV,
  runSeed: process.env.RUN_SEED,
});
