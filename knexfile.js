// Update with your config settings.

const config = {
  development: {
    client: 'pg',
    connection: 'postgres://postgres:postgres@localhost/vkchat',
  },
  production: {
    client: 'pq',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};
const env = process.env.ENVIRONMENT || 'development'
module.exports = config[env]
