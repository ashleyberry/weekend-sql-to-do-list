const express = require( 'express' );
const pg = require( 'pg' );
const router = express.Router();
const Pool = pg.Pool;

const pool = new Pool( {
    database: "weekend-to-do-app",
    host: "localhost",
    port: 5432,
    max: 12,
    idleTimeoutMillis: 20000
} ); // end pool setup

// TODO router.get
router.get( '/', ( req, res ) => {
    console.log( 'in /tasks GET' );
    const queryString = 'SELECT * FROM "tasks";';
    pool.query( queryString ).then( results => {
        res.send( results.rows );
    } ).catch( err => {
        console.log( 'error running query', err );
        res.sendStatus( 500 );
    } ); // end query
} ); // end /tasks GET

// TODO router.post
// Adds a new tasks to the list of tasks
// Request body must be a task object with a task.
router.post('/',  ( req, res ) => {
    let newTask = req.body;
    console.log( `Adding task`, newTask );
    let queryString = `INSERT INTO "tasks" ( "task" ) VALUES ( $1 );`;
    pool.query( queryString, [ newTask.task ] )
      .then( result => {
        res.sendStatus( 201 );
      } )
      .catch( error => {
        console.log( `Error adding new task`, error );
        res.sendStatus( 500 );
      } ); // end query
  } ); // end /tasks POST


// TODO router.delete

module.exports = router;