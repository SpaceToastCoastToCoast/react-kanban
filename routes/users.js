const express = require('express');
const router = express.Router();
const validate = require('../middleware/validation');
const session = require('express-session');
const bcrypt = require('bcrypt');
const db = require('../models');
const Card = db.Card;
const User = db.User;

router.route('/users')
.post(validate.userValidate, (req, res) => {
  //to create a new user
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(req.body.password, salt, (err, hash) => {
      User.create({ username: req.body.username,
        password: hash,
        role: 'USER'})
      .then((user) => {
        res.json({
          success: true,
          login: user.username,
          role: user.role,
          uid: user.id
        });
      })
      .catch((err) => {
        //req.flash('info', 'Invalid input in user account fields');
        res.json({
          error: "Invalid username or password"
        });
      });
    });
  });
}).get((req, res) => {
  User.findAll({
    attributes: ['username', 'role', 'id']
  })
  .then((users) => {
    res.json({
      users: users
    })
  })
})

module.exports = router;