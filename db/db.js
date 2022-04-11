const pg = require("pg");

let db;
if (process.env.NODE_ENV === "production") {
  db = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
} else {
  db = new pg.Pool({
    database: "asteroids",
    password: 'kkIbInn19786_ba!'
  });
}
module.exports = db;