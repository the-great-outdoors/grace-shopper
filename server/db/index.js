const { client } = require('pg');
const chalk = require('chalk');

const connectionString = process.env.DATABASE_URL ||"postgres://localhost:5432//great-outdoors";

const db = new client(connectionString);

