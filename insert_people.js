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
const fpFirstName = fpArr[0];
const fpLastName  = fpArr[1];
const fpDate      = fpArr[2];

console.log(fpArr);

knexPg('famous_people')
.insert({
  first_name: fpFirstName,
  last_name : fpLastName,
  birthdate : fpDate
})
.asCallback(function(err, result) {
  if (err) return console.error(err);
  console.log(result);
});