const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const toDoList = require('./routes/toDoList.js');
const app = express();
const PORT = 3000;

app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( express.static( 'server/public' ) );
app.use('/toDoList', toDoList);

app.listen(PORT, () => {
  console.log('mystery science theater', PORT);
});