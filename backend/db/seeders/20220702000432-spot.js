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
        previewImage: 'https://cdn.tatlerasia.com/asiatatler/i/ph/2019/07/18161159-3-super-penthouse_cover_2000x1168.jpg'
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
        previewImage: 'https://www.sbsun.com/wp-content/uploads/2020/06/SBS-L-AURORA-0615-07-1.jpg?w=620'
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
        previewImage: 'https://en.mansionesmiami.com/wp-content/uploads/2020/07/espectacular-mansion-en-miami-beach-con-luces-de-noche.jpg'
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
        previewImage: 'https://media.vrbo.com/lodging/28000000/27320000/27314000/27313935/e7c3076b.c10.jpg'
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
        pricePerNight: 143,
        previewImage: 'https://architecturesstyle.com/wp-content/uploads/2021/01/modern-beach-house-3.jpg'
      },
      {
        ownerId: 1,
        address: '123 Forest Ave',
        city: 'Lake Forest',
        state: 'California',
        country: 'United States of America',
        latitude: 69.7645358,
        longitude: 39.4730327,
        name: 'Vail',
        description: 'Modern home',
        pricePerNight: 143,
        previewImage: 'https://www.brandonarchitects.com/content/EP1Jx_4KFZpN_l.jpg'
      },
      {
        ownerId: 3,
        address: '123 Maple Ave',
        city: 'Newport Beach',
        state: 'California',
        country: 'United States of America',
        latitude: 79.7645358,
        longitude: 50.4730327,
        name: 'River',
        description: 'Nearby downtown',
        pricePerNight: 142,
        previewImage: 'https://www.brandonarchitects.com/content/QuoFlAhpwCTJ_l.jpg'
      },
      {
        ownerId: 1,
        address: '123 Test Ave',
        city: 'Tampa',
        state: 'Florida',
        country: 'United States of America',
        latitude: 79.7645358,
        longitude: 50.4730327,
        name: 'Great House',
        description: 'Nearby downtown',
        pricePerNight: 333,
        previewImage: 'https://i.pinimg.com/originals/85/63/a6/8563a69c15278578ee1eead136d33e72.jpg'
      },
      {
        ownerId: 1,
        address: '123 Test2 Ave',
        city: 'Tampa',
        state: 'Florida',
        country: 'United States of America',
        latitude: 79.7645358,
        longitude: 50.4730327,
        name: 'Great House',
        description: 'Nearby downtown',
        pricePerNight: 654,
        previewImage: 'https://cdn.onekindesign.com/wp-content/uploads/2015/07/Manhattan-Beach-House-DISC-Interiors-01-1-Kindesign-600x397.jpg'
      },
      // {
      //   ownerId: 1,
      //   address: '123 Test3 Ave',
      //   city: 'Tampa',
      //   state: 'Florida',
      //   country: 'United States of America',
      //   latitude: 79.7645358,
      //   longitude: 50.4730327,
      //   name: 'Great House',
      //   description: 'Nearby downtown',
      //   pricePerNight: 332,
      //   previewImage: 'https://cdn.onekindesign.com/wp-content/uploads/2020/03/Modern-Zen-House-Brandon-Architects-01-1-Kindesign.jpg'
      // },
      // {
      //   ownerId: 1,
      //   address: '123 Test4 Ave',
      //   city: 'Tampa',
      //   state: 'Florida',
      //   country: 'United States of America',
      //   latitude: 79.7645358,
      //   longitude: 50.4730327,
      //   name: 'Great House',
      //   description: 'Nearby downtown',
      //   pricePerNight: 444,
      //   previewImage: 'https://cdn.onekindesign.com/wp-content/uploads/2021/06/Midcentury-Modern-Custom-Home-Brandon-Architects-01-1-Kindesign.jpg'
      // },
      // {
      //   ownerId: 1,
      //   address: '123 Test5 Ave',
      //   city: 'Tampa',
      //   state: 'Florida',
      //   country: 'United States of America',
      //   latitude: 10.7645358,
      //   longitude: 20.4730327,
      //   name: 'Great House',
      //   description: 'Nearby downtown',
      //   pricePerNight: 547,
      //   previewImage: 'https://www.brandonarchitects.com/content/JD6lXNLjaxFf_s.jpg'
      // },
      // {
      //   ownerId: 1,
      //   address: '123 Test6 Ave',
      //   city: 'Costa Mesa',
      //   state: 'California',
      //   country: 'United States of America',
      //   latitude: -79.7645358,
      //   longitude: -50.4730327,
      //   name: 'Great House',
      //   description: 'Nearby downtown',
      //   pricePerNight: 88,
      //   previewImage: 'https://www.brandonarchitects.com/content/r72VvzpIUAkP_s.jpg'
      // },
      // {
      //   ownerId: 1,
      //   address: '123 Test7 Ave',
      //   city: 'Newport Beach',
      //   state: 'California',
      //   country: 'United States of America',
      //   latitude: 100.7645358,
      //   longitude: 162.4730327,
      //   name: 'Signal',
      //   description: 'Nearby downtown',
      //   pricePerNight: 953,
      //   previewImage: 'https://www.brandonarchitects.com/content/GfauCgU6XLFm_s.jpg'
      // },
      // {
      //   ownerId: 1,
      //   address: '123 Test8 Ave',
      //   city: 'Newport Beach',
      //   state: 'California',
      //   country: 'United States of America',
      //   latitude: 2.7645358,
      //   longitude: 41.4730327,
      //   name: 'Harbor Island',
      //   description: 'Nearby downtown',
      //   pricePerNight: 375,
      //   previewImage: 'https://www.brandonarchitects.com/content/8UsqvBWzr_l0_s.jpg'
      // },
      // {
      //   ownerId: 1,
      //   address: '123 Test9 Ave',
      //   city: 'Corona Del Mar',
      //   state: 'California',
      //   country: 'United States of America',
      //   latitude: 10.7645358,
      //   longitude: 99.4730327,
      //   name: 'Orrington II',
      //   description: 'Nearby downtown',
      //   pricePerNight: 234,
      //   previewImage: 'https://www.brandonarchitects.com/content/eraUOwQ8CnxP_s.jpg'
      // },
      // {
      //   ownerId: 1,
      //   address: '123 Test10 Ave',
      //   city: 'Newport Beach',
      //   state: 'California',
      //   country: 'United States of America',
      //   latitude: 132.7645358,
      //   longitude: 23.4730327,
      //   name: 'South Bay Front',
      //   description: 'Nearby downtown',
      //   pricePerNight: 532,
      //   previewImage: 'https://www.brandonarchitects.com/content/yj9OcUe73IXa_s.jpg'
      // },
      // {
      //   ownerId: 1,
      //   address: '123 Test11 Ave',
      //   city: 'Newport Beach',
      //   state: 'California',
      //   country: 'United States of America',
      //   latitude: -79.7645358,
      //   longitude: 100.4730327,
      //   name: 'Hazel I',
      //   description: 'Nearby downtown',
      //   pricePerNight: 321,
      //   previewImage: 'https://www.brandonarchitects.com/content/uPCqxgOkFr8B_l.jpg'
      // },
      // {
      //   ownerId: 1,
      //   address: '123 Test12 Ave',
      //   city: 'Newport Beach',
      //   state: 'California',
      //   country: 'United States of America',
      //   latitude: -123.7645358,
      //   longitude: 32.4730327,
      //   name: 'Great House',
      //   description: 'Nearby downtown',
      //   pricePerNight: 60,
      //   previewImage: 'https://www.brandonarchitects.com/content/Ptgn_NBywMZd_s.jpg'
      // },
      // {
      //   ownerId: 1,
      //   address: '123 Test13 Ave',
      //   city: 'Corona Del Mar',
      //   state: 'California',
      //   country: 'United States of America',
      //   latitude: 22.7645358,
      //   longitude: -52.4730327,
      //   name: 'Larkspur V',
      //   description: 'Nearby downtown',
      //   pricePerNight: 547,
      //   previewImage: 'https://www.brandonarchitects.com/content/BGJpEhRlZL_j_l.jpg'
      // },
      // {
      //   ownerId: 1,
      //   address: '123 Test14 Ave',
      //   city: 'Corona Del Mar',
      //   state: 'California',
      //   country: 'United States of America',
      //   latitude: 32.7645358,
      //   longitude: -99.4730327,
      //   name: 'Great House',
      //   description: 'Nearby downtown',
      //   pricePerNight: 90,
      //   previewImage: 'https://www.brandonarchitects.com/content/4rhwK1xbaXeN_l.jpg'
      // },
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
      address: { [Op.in]: ['123 Luxury Lane', '123 Bear Ave', '123 Beach Ave', '123 Ocean Ave', '123 City Ave',
      '123 Forest Ave',
      '123 Maple Ave',
      '123 Test2 Ave',
      // '123 Test3 Ave',
      // '123 Test4 Ave',
      // '123 Test5 Ave',
      // '123 Test6 Ave',
      // '123 Test7 Ave',
      // '123 Test8 Ave',
      // '123 Test9 Ave',
      // '123 Test10 Ave',
      // '123 Test11 Ave',
      // '123 Test12 Ave',
      // '123 Test13 Ave',
      // '123 Test14 Ave',
      '123 Test Ave',
    ] }
    })
  }
};
