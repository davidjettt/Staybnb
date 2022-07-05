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
    await queryInterface.bulkInsert('Reviews', [
      {
        userId: 3,
        spotId: 3,
        review: 'Very nice, luxurious place. Right by the beach. Had a good time. Will book again.',
        stars: 5
      },
      {
        userId: 4,
        spotId: 1,
        review: 'Good place.',
        stars: 4
      },
      {
        userId: 3,
        spotId: 2,
        review: 'Booked this for a snowboarding trip. Very nearby the slopes. Accomadated everyone.',
        stars: 5
      },
      {
        userId: 2,
        spotId: 1,
        review: 'Great stay by the strip. Had a great time',
        stars: 5
      },
      {
        userId: 2,
        spotId: 4,
        review: 'Great stay. Very nostalgic',
        stars: 5
      },
      {
        review: 'Okay stay',
        stars: 3,
        userId: 4,
        spotId: 4
      },
      {
        review: 'Good stay',
        stars: 4,
        userId: 1,
        spotId: 5
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Reviews', {
      id: {[Op.in]: [1, 2, 3, 4, 5, 6, 7]}
    })
  }
};
