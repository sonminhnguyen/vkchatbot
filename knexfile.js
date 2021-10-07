// Update with your config settings.
require('dotenv').config()
const pg = require('pg');
pg.defaults.ssl = true;

const config = {
  development: {
    client: 'pg',
    connection: {
      connectionString: 'postgres://svkdvfdxawpyrn:a4d26e9a6f822189bb06e306d258e771351f1b9b078705514af5d331e84ce6b2@ec2-35-171-171-27.compute-1.amazonaws.com:5432/d3f1khssr9417l',
      ssl: { rejectUnauthorized: false },
    }
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
