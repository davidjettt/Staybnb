'use strict';

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
    await queryInterface.bulkInsert('Images', [
      {
        spotId: 3,
        reviewId: null,
        url: 'https://www.homebunch.com/wp-content/uploads/2021/04/interior-design-ideas-Marn_SHIE_web_513.jpg'
      },
      {
        spotId: null,
        reviewId: 2,
        url: 'https://s.wsj.net/public/resources/images/BN-RT353_HOTY_M_20170123150754.jpg'
      },
      {
        spotId: 1,
        reviewId: null,
        url: 'https://www.las-vegas-penthouses.com/wp-content/uploads/sites/418/2013/02/mandarin-bar-mandarin-oriental-las-vegas.jpg'
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
    await queryInterface.bulkDelete('Images', {
      id: {[Op.in]: [1, 2, 3]}
    })
  }
};
