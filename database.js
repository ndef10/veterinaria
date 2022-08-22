const { Pool } = require('pg');

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,

});

const getDate = async () => {
    const result = await pool.query("SELECT NOW()");
    console.log(result);

}
getDate()

module.exports = { getDate };

