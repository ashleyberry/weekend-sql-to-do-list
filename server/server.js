const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const toDoListRouter = require( './routes/taskList' );
const app = express();


app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( express.static( 'server/public' ) );
app.use('/taskList', toDoListRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('mystery science theater', PORT);
});
