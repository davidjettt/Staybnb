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
    await queryInterface.bulkInsert('Users', [
      {
        email: 'lebron.james@gmail.com',
        firstName: 'Lebron',
        lastName: 'James',
        hashedPassword: bcrypt.hashSync('lakers')
      },
      {
        email: 'kevin.durant@gmail.com',
        firstName: 'Kevin',
        lastName: 'Durant',
        hashedPassword: bcrypt.hashSync('brooklyn')
      },
      {
        email: 'steph.curry@gmail.com',
        firstName: 'Steph',
        lastName: 'Curry',
        hashedPassword: bcrypt.hashSync('warriors')
      },
      {
        email: 'john.smith@gmail.com',
        firstName: 'John',
        lastName: 'Smith',
        hashedPassword: bcrypt.hashSync('secret password')
      },
      {
        email: 'demo.user@demouser.io',
        firstName: 'Demo',
        lastName: 'User',
        hashedPassword: bcrypt.hashSync('Staybnb690@')
      }
    ])
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
