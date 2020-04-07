// Update with your config settings.

module.exports = {

  development: {
    client: '',
    connection: {
      filename: './database/dev.sqlite3'
    },
    useNullAsDefault: true, // used to avoid warning on console
    migrations: {
      directory: './database/migrations',
      tableName: 'dbmigrations',
    },
    seeds: { directory: './database/seeds' },
  },
  testing: {
    client: 'sqlite3',
    connection: {
      filename: './data/dev.sqlite3',
    },
  },
  // staging: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user:     'username',
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // },

  // production: {
  //   client: 'pg',
  //   connection: process.env.DATABASE_URL,

  //   // {
  //   //   database: 'my_db',
  //   //   user:     'username',
  //   //   password: 'password'
  //   // },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // }
};