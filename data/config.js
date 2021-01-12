const knex = require('knex');

const db = require('../knexfile.js');

module.exports = knex(db.development);