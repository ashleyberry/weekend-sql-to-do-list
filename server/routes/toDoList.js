const express = require( 'express' );
const pg = require( 'pg' );
const router = express.Router();
const Pool = pg.Pool;

const pool = new Pool({
    database: "weekend-to-do-app",
    host: "localhost",
    port: 5432,
    max: 12,
    idleTimeoutMillis: 20000
}); // end pool setup

// TODO router.get

// TODO router.post

// TODO router.delete

module.exports = router;