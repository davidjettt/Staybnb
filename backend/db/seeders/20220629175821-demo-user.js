'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('Users', [
      {
        email: 'lebron.james@gmail.com',
        // username: 'Demo-lition',
        firstName: 'Lebron',
        lastName: 'James',
        hashedPassword: bcrypt.hashSync('lakers')
      },
      {
        email: 'kevin.durant@gmail.com',
        // username: 'FakeUser1',
        firstName: 'Kevin',
        lastName: 'Durant',
        hashedPassword: bcrypt.hashSync('brooklyn')
      },
      {
        email: 'steph.curry@gmail.com',
        // username: 'FakeUser2',
        firstName: 'Steph',
        lastName: 'Curry',
        hashedPassword: bcrypt.hashSync('warriors')
      },
      {
        email: 'john.smith@gmail.com',
        // username: 'asdfasdf',
        firstName: 'John',
        lastName: 'Smith',
        hashedPassword: bcrypt.hashSync('secret password')
      }
    ], {});
  },


  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      email: { [Op.in]: ['lebron.james@gmail.com', 'kevin.durant@gmail.com', 'steph.curry@gmail.com', 'john.smith@gmail.com'] }
    }, {});
  }
};
