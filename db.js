const knex = require('knex')
const knexfile = require('./knexfile');

//inisiasi db
const db = knex(knexfile.development);

//export db
module.exports = db;