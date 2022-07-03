'use strict';
const { Op } = require('sequelize');

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
    await queryInterface.bulkInsert('Bookings', [
      {
        startDate: '2022-08-31',
        endDate: '2022-09-05',
        spotId: 3,
        userId: 1
      },
      {
        startDate: '2022-12-01',
        endDate: '2022-12-10',
        spotId: 2,
        userId: 1
      },
      {
        startDate: '2022-10-01',
        endDate: '2022-10-10',
        spotId: 1,
        userId: 2
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
    await queryInterface.bulkDelete('Bookings', {
      id: {[Op.in]: [1, 2, 3]}
    })
  }
};
