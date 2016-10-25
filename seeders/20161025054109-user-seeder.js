'use strict';

const bcrypt = require('bcrypt');
const admin_password = 'password'; //change this for production!

module.exports = {
  up: function (queryInterface, Sequelize) {
    let salt = bcrypt.genSaltSync(10);
    return queryInterface.bulkInsert('Users', [
      {
        username: 'kanbanadmin',
        password: bcrypt.hashSync(admin_password, salt)
      }
    ], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', {
      username: ['kanbanadmin']
    }, {});
  }
};
