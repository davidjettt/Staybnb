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
        review: "Absolutely beautiful home and gorgeous view! Just far enough away from downtown Palm Springs to be out of the action but still close enough to walk to a few cute places.",
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
        review: "Wonderful location and modern amenities, host was super responsive a terrific stay overall. Would love to come back.",
        stars: 5
      },
      {
        userId: 2,
        spotId: 4,
        review: "This home is extraordinary. The surrounding landscape is breathtaking. The home is peaceful and beautifully decorated and maintained. This is the perfect place to visit to get away",
        stars: 5
      },
      {
        userId: 4,
        spotId: 4,
        review: "Lovely quintessential upscale house. Pictures and amenities are accurate.",
        stars: 3
      },
      {
        userId: 1,
        spotId: 5,
        review: "Overall not a bad place to stay (location, amenities) but I was also grossed out by a lot of things. The towels, rugs, bath mats, couches, bedding were very used and/or unclean",
        stars: 4
      },
      {
        userId: 3,
        spotId: 1,
        review: "10 out of 10 experience! I was left speechless by the environment & atmosphere in some moments!",
        stars: 4
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
