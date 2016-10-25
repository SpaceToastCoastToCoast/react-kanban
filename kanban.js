const express = require('express');
const bodyParser = require('body-parser');
const CONFIG = require('./config/config.json');
const app = express();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const flash = require('connect-flash');
const db = require('./models');
const Card = db.Card;
const User = db.User;

app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(flash());
app.use(session({
  store: new RedisStore(),
  secret: CONFIG.SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

const ls = new LocalStrategy((username, password, done) => {
  User.findAll({
    attributes: ['username', 'password', 'id'],
    where: {
      username: username
    }
  }).then((user) => {
    if(user.length < 1) {
      return done(null, false);
    }
    let [u] = user;
    let res = bcrypt.compareSync(password, u.dataValues.password);
    if(res === true) {
      return done(null, {
        username: u.dataValues.username,
        id: u.dataValues.id
      });
    } else {
      return done(null, false);
    }
  })
  .catch((err) => {
    return done(null, false);
  });

});

passport.serializeUser((user, done) => {
  return done(null, user);
});

passport.deserializeUser((user, done) => {
  return done(null, user);
});

passport.use(ls);

const isAuthenticated = (req, res, next) => {
  if(!req.isAuthenticated()) {
    return res.redirect('/login');
  } else {
    return next();
  }
};

app.listen(3000, function() {
  db.sequelize.sync();
});

app.get('/api', (req, res) => {
  Card.findAll({
    order: [['id', 'DESC']]
  })
  .then((data)=>{
    res.json({data: data});
  });
});

app.get('/:page', (req, res) => {
  res.status(404).json({error: 'file not found'});
});

module.exports = app;