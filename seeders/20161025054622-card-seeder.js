'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Cards', [
      {
        title: "Feed fish",
        description: "don't overfeed them",
        priority: "LOW",
        status: "TO DO",
        creator_id: 1,
        assignee_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Clean fishtank",
        description: "nasty!",
        priority: "MEDIUM",
        status: "DOING",
        creator_id: 1,
        assignee_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Plug leak",
        description: "the fish are dying!",
        priority: "HIGH",
        status: "DONE",
        creator_id: 1,
        assignee_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Cards',
    {
      title: ['Plug leak', 'Clean fishtank', 'Feed fish']
    }, {});
  }
};
