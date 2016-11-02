const express = require('express');
const router = express.Router();
const session = require('express-session');
const db = require('../models');
const Card = db.Card;
const User = db.User;

getAllCards = (req, res) => {
  Card.findAll({
    attributes: [
      'id',
      'title',
      'description',
      'priority',
      'status',
      'creator_id',
      'assignee_id',
      'creator.username',
      'assignee.username'
    ],
    include: [
      {
        model: User,
        as: 'creator',
        attributes: ['id', 'username']
      }, {
        model: User,
        as: 'assignee',
        attributes: ['id', 'username']
      }
    ],
    order: [['priority', 'ASC']]
  })
  .then((data)=>{
    res.json({data: data});
  })
  .catch((err) => {
    throw new Error("Error querying database!");
  })
}

getUserCards = (req, res, userID) => {
  Card.findAll({
    attributes: [
      'id',
      'title',
      'description',
      'priority',
      'status',
      'creator_id',
      'assignee_id',
      'creator.username',
      'assignee.username'
    ],
    include: [
      {
        model: User,
        as: 'creator',
        attributes: ['id', 'username'],
      }, {
        model: User,
        as: 'assignee',
        attributes: ['id', 'username'],
      }
    ],
    where: {
      $or: [
        {'creator_id': {
            $eq: userID
          }
        }, {
          'assignee_id': {
            $eq: userID
          }
        }
      ]
    },
    order: [['priority', 'ASC']]
  })
  .then((data)=> {
    res.json({data: data});
  })
  .catch((err) => {
    throw new Error("Error querying database!");
  })
}

router.route('/api')
.get((req, res) => {
  getAllCards(req, res);
})
.post((req, res) => {
  let userID;
  if(req.user !== undefined) {
    userID = req.body.creator_id;
  } else {
    userID = 1;
  }
  Card.create({
    title: req.body.title,
    description: req.body.description,
    priority: req.body.priority,
    status: req.body.status,
    creator_id: userID,
    assignee_id: req.body.assignee_id })
  .then(() => {
    getAllCards(req, res);
  })
  .catch((error) => {
    res.json({
      error: 'Invalid input'
    });
  });
});

router.route('/api/userBoards/:id')
.get((req, res) => {
  getUserCards(req, res, parseInt(req.params.id));
})
.post((req, res) => {
  let userID;
  if(req.user !== undefined) {
    userID = req.body.creator_id;
  } else {
    userID = 1;
  }
  Card.create({
    title: req.body.title,
    description: req.body.description,
    priority: req.body.priority,
    status: req.body.status,
    creator_id: userID,
    assignee_id: req.body.assignee_id })
  .then(() => {
    getUserCards(req, res, req.params.id);
  })
  .catch((error) => {
    console.error(error);
    res.status(400).json({
      error: 'Invalid input'
    });
  });
});

router.route('/api/userBoards/:uid/:id')
  .put((req, res) => {
    Card.findById(parseInt(req.params.id))
    .then((card) => {
      card.update({
        priority: req.body.priority || card.priority,
        status: req.body.status || card.status
      })
      .then(() => {
        getUserCards(req, res, req.params.uid);
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
    getUserCards(req, res, req.params.uid);
  })
  .catch((error) => {
    console.error(error);
    res.status(404).json({
      error: 'Invalid card ID'
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
        getAllCards(req, res);
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
    getAllCards(req, res);
  })
  .catch((error) => {
    console.error(error);
    res.status(404).json({
      error: 'Invalid card ID'
    });
  });
});



module.exports = router;