require('dotenv').config({
  path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env'
});

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: true,
  logging: false,
  entities: isProduction
    ? ['dist/**/*.entity.js']
    : ['src/**/*.entity.ts'],
  migrations: isProduction
    ? ['dist/**/*.migration.js']
    : ['src/**/*.migration.ts'],
  subscribers: isProduction
    ? ['dist/**/*.subscriber.js']
    : ['src/**/*.subscriber.ts'],
  cli: {
    entitiesDir: 'src/**',
    migrationsDir: 'src/**',
    subscribersDir: 'src/**',
  },
};
