const pg = require("pg");
const settings = require("./settings"); //settings.json

const knexPg = require('knex')({
  client: 'pg',
  connection: {
    user      : settings.user,
    password  : settings.password,
    database  : settings.database,
    host      : settings.host,
    port      : settings.port,
    ssl       : settings.ssl
  },
  searchPath: 'knex,public'
});

const fpArr = process.argv.slice(2); //why does it not take a const as an argument where 'Abraham' is???
const fp = fpArr[0]

console.log(fp);
knexPg('famous_people')
.select('*')
.where('first_name', fp)
.orWhere('last_name', fp)
.asCallback(function(err, result) {
  if (err) return console.error(err);
  console.log(result[0].id, result[0].first_name, result[0].last_name, result[0].birthdate);
});