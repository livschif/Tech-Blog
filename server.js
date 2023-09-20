const path = require('path');
const express = require('express');
const session = require('express-session');

// handlebars plugin
const exphbs = require('express-handlebars');


const routes = require('./controllers');

// import helpers

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// handlerbars engine with helper

const sess = {
  secret: 'Super secret secret',
  cookie: {
// set cookies options
},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

// set view engine

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('http://localhost:' + PORT));
});