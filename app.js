const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const database = require('./models/index.js');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(`${__dirname}/public`));

app.get('/stylesheets/style.css', (req, res, next) => {
  res.send('./stylesheets/style.css');
});

app.get('/', (req, res, next) => {
  res.redirect('/wiki');
});

app.use('/wiki', require('./routes/wiki.js'));
// app.use('/user', require('./routes/user.js'));

/* HUH?! Why can't we serve the file statically?
 *
 * app.use(express.static(path.join(__dirname, './stylesheets')));
 *
 * Doesn't work. I have absolutely no idea why.
 *
 * We set up the route explicitly as a quick hack.
 */

database.db.authenticate().then(() => {
  console.log('connected to the database');
});

async function init(){
  await database.db.sync({ force: true });
  app.listen('1337');
}

init();
