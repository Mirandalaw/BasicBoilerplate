const dotenv = require("dotenv");
const path = require("path");

const environment = process.env.NODE_ENV || "dev";

dotenv.config({
  path: path.resolve(__dirname, `../../.env.${environment}`),
});

const serverConfig = {
  PORT: process.env.PORT,
  // DB config
  KEY_STRETCHING: process.env.KEY_STRETCHING,
  mysqlConfig: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
};

module.exports = serverConfig;
