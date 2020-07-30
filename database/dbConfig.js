const knex = require('knex');
const knexConfig = require('../knexfile.js');

const dbEnv = process.env.DB_ENV || "development";
console.log("de", process.env.DB_ENV);
module.exports = knex(knexConfig[dbEnv]);