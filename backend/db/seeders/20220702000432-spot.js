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
        ownerId: 1,
        address: '123 Luxury Lane',
        city: 'Las Vegas',
        state: 'Nevada',
        country: 'United States of America',
        latitude: 37.7645358,
        longitude: -122.4730327,
        name: 'Luxury Penthouse',
        description: 'Luxury experience for the curious',
        pricePerNight: 523,
        previewImage: 'image url'
      },
      {
        ownerId: 1,
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
      },
      {
        ownerId: 2,
        address: '123 Beach Ave',
        city: 'Miami',
        state: 'Florida',
        country: 'United States of America',
        latitude: 57.7645358,
        longitude: 22.4730327,
        name: 'Party Sanctuary',
        description: 'Fun stay for large groups who enjoy the Miami life',
        pricePerNight: 647,
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
      address: { [Op.in]: ['123 Luxury Lane', '123 Bear Ave', '123 Beach Ave'] }
    })
  }
};
