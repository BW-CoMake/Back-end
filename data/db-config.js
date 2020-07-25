const knex = require("knex");
const config = require("../knexfile")[dbEnv];

const dbEnv = process.env.DB_ENV || "development";

module.exports = knex(config(dbEnv));
