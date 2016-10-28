const express = require('express');
const router = express.Router();
const session = require('express-session');
const db = require('../models');
const Card = db.Card;
const User = db.User;

router.route('/api')
.get((req, res) => {
  Card.findAll({
    attributes: [
      'id',
      'title',
      'description',
      'priority',
      'status',
      'creator_id',
      'assignee_id'
    ],
    order: [['priority', 'ASC']]
  })
  .then((data)=>{
    res.json({data: data});
  });
})
.post((req, res) => {
  let userID;
  if(req.user !== undefined) {
    userID = req.user.id;
  } else {
    userID = 1;
  }
  Card.create({
    title: req.body.title,
    description: req.body.description,
    priority: req.body.priority,
    status: req.body.status,
    creator_id: userID,
    assignee_id: 1 })
  .then(() => {
    console.log("posted");
    Card.findAll({
      attributes: [
        'id',
        'title',
        'description',
        'priority',
        'status',
        'creator_id',
        'assignee_id'
      ],
      order: [['priority', 'ASC']]
    })
    .then((data)=>{
      res.json({data: data});
    });
  })
  .catch((error) => {
    console.error(error);
    res.status(400).json({
      error: 'Invalid input'
    });
  });
});

router.route('/api/:id')
  .put((req, res) => {
    Card.findById(parseInt(req.params.id))
    .then((card) => {
      card.update({
        priority: req.body.priority || card.priority,
        status: req.body.status || card.status
      })
      .then(() => {
        Card.findAll({
          attributes: [
            'id',
            'title',
            'description',
            'priority',
            'status',
            'creator_id',
            'assignee_id'
          ],
          order: [['priority', 'ASC']]
        })
        .then((data)=>{
          res.json({data: data});
        });
      })
      .catch((error) => {
        res.status(400).json({
        error: 'Invalid input'
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(404).json({
        error: 'Invalid card ID'
      });
    });
  })
})
.delete((req, res) => {
  Card.findById(parseInt(req.params.id))
  .then((card) => {
    card.destroy();
    Card.findAll({
      attributes: [
        'id',
        'title',
        'description',
        'priority',
        'status',
        'creator_id',
        'assignee_id'
      ],
      order: [['priority', 'ASC']]
    })
    .then((data)=>{
      res.json({data: data});
    });
  })
  .catch((error) => {
    console.error(error);
    res.status(404).json({
      error: 'Invalid card ID'
    });
  });
});

module.exports = router;