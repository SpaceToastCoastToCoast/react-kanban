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
        assignee_id: 1
      },
      {
        title: "Clean fishtank",
        description: "nasty!",
        priority: "MEDIUM",
        status: "DOING",
        creator_id: 1,
        assignee_id: 1
      },
      {
        title: "Plug leak",
        description: "the fish are dying!",
        priority: "HIGH",
        status: "DONE",
        creator_id: 1,
        assignee_id: 1
      }
    ], {});
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
