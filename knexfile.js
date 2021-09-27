// Update with your config settings.

const config = {
  development: {
    client: 'mysql',
    connection: {
      database: 'vkchat',
      user:     'root',
      password: ''
    },
    useNullAsDefault: true
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
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
