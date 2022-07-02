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
    await queryInterface.bulkInsert('Spots', [
      {
        hostId: 1,
        address: '123 Disney Lane',
        city: 'San Francisico',
        state: 'California',
        country: 'United States of America',
        latitude: 37.7645358,
        longitude: -122.4730327,
        name: 'App Academy',
        description: 'Place where web developers are created',
        pricePerNight: 123,
        previewImage: 'image url'
      },
      {
        hostId: 1,
        address: '123 Bear Ave',
        city: 'Big Bear',
        state: 'California',
        country: 'United States of America',
        latitude: -37.7645358,
        longitude: -122.4730327,
        name: 'Big Bear Mansion',
        description: 'Stay for large groups who like to enjoy the snow',
        pricePerNight: 523,
        previewImage: 'image url'
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
    await queryInterface.bulkDelete('Spots', {
      address: { [Op.in]: ['123 Disney Lane', '123 Bear Ave'] }
    })
  }
};
