const pg = require("pg");
const settings = require("./settings"); //settings.json

const client = new pg.Client({
  user      : settings.user,
  password  : settings.password,
  database  : settings.database,
  host      : settings.host,
  port      : settings.port,
  ssl       : settings.ssl
});

const famous_person = process.argv.slice(2)[0];

console.log(famous_person)

client.connect((err) => {
  if (err != null) {
    console.log("err: ", err);
    return console.error("Connection Error", err);
  }
  client.query(`
    SELECT *
    FROM famous_people
    WHERE first_name = $1
    OR last_name = $1`, [famous_person], (err, result) => {
    if (err) {
    return console.log("error running query", err);
    }
    const obj = result.rows[0]
    console.log(`database match(es): ${obj.id}: ${obj.first_name} ${obj.last_name}, born: ${String(obj.birthdate)}`);
    client.end();
  })
})