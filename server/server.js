const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const toDoListRouter = require( './routes/taskList' );
const app = express();


const PORT = 3000;

app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( express.static( 'server/public' ) );
app.use('/taskList', toDoListRouter);

app.listen(PORT, () => {
  console.log('mystery science theater', PORT);
});
