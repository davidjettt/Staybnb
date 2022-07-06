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
        address: '123 Luxury Ave',
        city: 'Las Vegas',
        state: 'Nevada',
        country: 'United States of America',
        latitude: 65.7640058,
        longitude: -456.4000327,
        name: 'Luxury Penthouse',
        description: 'Luxurious penthouse with an amazing view of the strip',
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
      },
      {
        ownerId: 3,
        address: '123 Ocean Ave',
        city: 'Huntington Beach',
        state: 'California',
        country: 'United States of America',
        latitude: 60.7645358,
        longitude: 24.4730327,
        name: 'Beach House',
        description: 'There is a place off of Ocean Avenue',
        pricePerNight: 347,
        previewImage: 'image url'
      },
      {
        ownerId: 3,
        address: '123 City Ave',
        city: 'Los Angeles',
        state: 'California',
        country: 'United States of America',
        latitude: 65.7645358,
        longitude: 30.4730327,
        name: 'City House',
        description: 'Great for those who love the city',
        pricePerNight: 547,
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
      address: { [Op.in]: ['123 Luxury Lane', '123 Bear Ave', '123 Beach Ave', '123 Ocean Ave', '123 City Ave'] }
    })
  }
};
