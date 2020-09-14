const express = require( 'express' );
const pg = require( 'pg' );
const router = express.Router();
const Pool = pg.Pool;

// const pool = new Pool( {
//     database: 'weekend-to-do-app',
//     host: 'localhost',
//     port: 5432,
//     max: 12,
//     idleTimeoutMillis: 20000
// } ); // end pool setup

let pool;
if ( process.env.DATABASE_URL ){
  console.log( 'Connecting to a Heroku DB' );
  pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL
  })
} else {
  console.log( `assuming we're running locally` );
  pool = new pg.Pool({
    database: 'weekend-to-do-app',
    host: 'localhost',
    port: 5432,
    max: 12,
    idleTimeoutMillis: 20000
  })
}

router.delete( '/:id', ( req, res )=>{
  let taskId = req.params.id;
  const queryString = `DELETE FROM "tasks" WHERE "id" = $1;`;
  console.log( 'going to delete task with id:', taskId );
  // execute DB query
  pool.query( queryString, [ taskId ] )
  .then( response => {
      console.log( 'deleted task!' );
      res.sendStatus( 200 );
  }).catch( err => {
      console.log( 'error deleting task', err );
      res.sendStatus( 500 );
  }) // end query
}) // end delete tasks

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

router.post( '/',  ( req, res ) => {
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

// Updates a task to show that it has been completed
// Request must include a parameter indicating what task to update - the id
// Request body must include the content to update - the status
router.put( '/:id',  ( req, res ) => {
  let task = req.body; // task with updated content
  let id = req.params.id; // id of the task to update
  let queryString = '';
  console.log( 'task.newPending:', task.newPending )
  if( task.newPending === 'true' ){
    queryString = `UPDATE "tasks" SET "complete" = 'true' WHERE "id" = $1;`
  } 
  pool.query( queryString, [ id ] )
  .then( result => {
    console.log( 'result from PUT:', result );
    res.sendStatus( 200 );
  }).catch( err => {
    console.log( 'result from PUT:', err );
    res.sendStatus(500);
  }) // end query
}); // end /tasks PUT

module.exports = router;