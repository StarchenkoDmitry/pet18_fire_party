const { Pool } = require("pg");

const DATABASE_HOST = process.env.DATABASE_HOST;
const DATABASE_PORT = process.env.DATABASE_PORT;
const DATABASE_USERNAME = process.env.DATABASE_USERNAME;
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
const DATABASE_NAME = process.env.DATABASE_NAME;

async function check() {
    return new Promise((resolve, reject) => {

        const pool = new Pool({
            host: DATABASE_HOST,
            port: DATABASE_PORT,
            user: DATABASE_USERNAME,
            database: DATABASE_NAME,
            password: DATABASE_PASSWORD,
        });

        pool.query("SELECT NOW()", (err, res) => {
            if (err) {
                console.error("Error when connecting to the database:", err);
                resolve(false);
            } else {
                console.log("Successful connection to the database");
                resolve(true);
            }
            pool.end();
        });
    });
}
async function delay(timeout = 1000) {
    return new Promise((res) => setTimeout(res, timeout));
}
async function wait() {
    console.log("#### prepare ####");
    console.log("ENV:",process.env);
    console.log("#### start check db ####");
    let isStarted = false;
    while (!isStarted) {
        isStarted = await check();
        await delay();
    }
    console.log("#### end check db ####");
}

wait();
