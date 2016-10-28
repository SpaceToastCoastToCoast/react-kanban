'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const CONFIG = require('./config/config.json');
const log = require ('./middleware/log');
const validate = require('./middleware/validation');
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
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');

const apiRouter = require('./routes/api')

const priority = {
  high: 'HIGH',
  medium: 'MEDIUM',
  low: 'LOW'
};

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
app.use(log);

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
    return res.json({
      login: undefined
    });
  } else {
    return next();
  }
};

app.get('/login', (req, res) => {
  let username;
  if(req.user !== undefined) {
    username = req.user.username;
  } else {
    username = undefined;
  }
  res.json({
    check: "hit",
    login: username
  })
});

app.get('/logout', (req, res) => {
  req.logout();
});

app.post('/login', passport.authenticate('local'), (req, res) => {
  let username;
  if(req.user !== undefined) {
    username = req.user.username;
  } else {
    username = undefined;
  }
  res.json({
    check: "hit POST",
    login: username
  })
});

app.post('/users', validate.userValidate, (req, res) => {
  //to create a new gallery photo
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(req.body.password, salt, (err, hash) => {
      User.create({ username: req.body.username,
        password: hash,
        emailaddress: req.body.email,
        role: 'USER'})
      .then((user) => {
        res.render('login', {status: 'valid'});
      })
      .catch((err) => {
        //req.flash('info', 'Invalid input in user account fields');
        res.render('login', {status: 'invalid'});
      });
    });
  });
});

app.use(apiRouter);

// Check to see what dev environment we are in
const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;

if (isDeveloping) {
  app.set('host', 'http://localhost');
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false,
    },
  });
  const response = (req, res) => {
    res.write(middleware.fileSystem.readFileSync(path.resolve(__dirname, 'dist/index.html')));
    res.end();
  };

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.get('*', response);
} else {
  app.use(express.static(`${__dirname}/dist`));
  app.get('*', (req, res) => {
    res.write(
      fs.readFileSync(path.resolve(__dirname, 'dist/index.html'))
    );
  });
}

const onStart = (err) => {
  if (err) {
    throw new Error(err);
  }
  console.info(
    `==> 🌎 Listening on port ${port}. ` +
    `Open up http://localhost:${port}/ in your browser.`
  );
  db.sequelize.sync();
};

app.listen(port, 'localhost', onStart);

module.exports = app;