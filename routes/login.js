const express = require('express');
const router = express.Router();
const session = require('express-session');
const db = require('../models');
const Card = db.Card;
const User = db.User;
const passport = require('passport');

const isAuthenticated = (req, res, next) => {
  if(!req.isAuthenticated()) {
    return res.json({
      error: "Must log in",
      login: undefined
    });
  } else {
    return next();
  }
};

router.route('/logout')
.get((req, res) => {
  req.logout();
  res.json({
    logout: "success",
    login: undefined
  })
});

router.route('/login')
.get((req, res) => {
  if(req.user !== undefined) {
    res.json({
      check: "hit",
      login: req.username,
      uid: req.user.id,
      role: req.user.role
    })
  } else {
    res.json({
      check: "hit",
      login: undefined
    })
  }
}).post((req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if(err) {
      //500 Internal Server Error
      return next(err);
    }
    if(!user) {
      return res.status(401).json({
        error: "Login failed"
      });
    } else {
      req.login(user, (loginErr) => {
        if(loginErr) {
          return next(loginErr);
        }
      })
      return res.json({
        check: "hit POST",
        login: user.username,
        role: user.role,
        uid: user.id
      })
    }
  })(req, res, next);
});

module.exports = router;