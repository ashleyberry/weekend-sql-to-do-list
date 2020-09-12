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
router.get( '/', ( req, res ) => {
    console.log( 'in /tasks GET' );
    const queryString = 'SELECT * FROM "tasks";';
    pool.query( queryString ).then( results => {
        res.send( results.rows );
    }).catch( err => {
        console.log( 'error running query', err );
        res.sendStatus( 500 );
    }); // end query
}); // end /tasks GET

// TODO router.post

// TODO router.delete

module.exports = router;