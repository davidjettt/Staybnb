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
        city: 'Chicago',
        state: 'Illinois',
        country: 'United States of America',
        latitude: 65.7640058,
        longitude: -456.4000327,
        name: 'Chi Town Penthouse',
        description: "Make yourself at home in downtown Chicago in your spacious suite or explore the on-site amenities like the outdoor pool, fitness room, running track, basketball court, or relax in the lounge. The Penthouse at Grand Plaza has a desirable location on State Street with shopping, dining, and sightseeing just steps away and our doormen are always happy to point you in the right direction.",
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
        description: "Big Bear Mansion is a historic wedding venue located in the heart of the Inland Empire in Big Bear Lake, California. Nestled in the mountainous San Bernardino National Forest, this lodge provides a magical woodland setting for special occasions. The log manor was built in 1920 and was fully renovated and restored in 2017 as an event venue. It boasts retro charm and modern amenities and is a tranquil spot to take the next step forward in your love story.",
        pricePerNight: 1523,
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
        description: "This new 2018 construction has an open and spacious common areas, double-height ceilings and tall high impact windows, with lots of natural light and a beautiful minimalist kitchen design. Luxurious master bedroom upstairs with a wet bar plus den or office space, All of the bedrooms have en-suite bathrooms and long balconies that allow you to enjoy the classic Coconut Groves vegetation",
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
        description: "Recently completed, contemporary, Self Catered Cottage 30 meters from beach. Unparalleled sea views. Every facility to make the house totally self contained, hot tub with sea views, hydrotherapy bath, steam shower, games room. Visiting masseurs, south west coastal path 100m away. ",
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
        description: "Signal's timeless European Transitional style sets a new precedent for residences of the LA area. Rich and natural textures made from materials of the highest quality complement the architectural forms and make this home feel very comfortable and warm. Additionally, living spaces have been designed to maximize connectivity between people and nature.",
        pricePerNight: 843,
        previewImage: 'https://architecturesstyle.com/wp-content/uploads/2021/01/modern-beach-house-3.jpg'
      },
      {
        ownerId: 1,
        address: '123 Forest Ave',
        city: 'Vail',
        state: 'Colorado',
        country: 'United States of America',
        latitude: 69.7645358,
        longitude: 39.4730327,
        name: 'The Vail',
        description: "This mountain modern home is situated on a half-acre parcel in the Gore range of the Rocky Mountains. The structure was designed as a duplex home totaling 10,063 s.f. with both units featuring master suites, secondary bedrooms, laundry, kitchen, great room, dining, outdoor patios, and roof decks. The units are separated by a large concrete demising wall 30' tall",
        pricePerNight: 1143,
        previewImage: 'https://www.brandonarchitects.com/content/EP1Jx_4KFZpN_l.jpg'
      },
      {
        ownerId: 5,
        address: '123 Maple Ave',
        city: 'Newport Beach',
        state: 'California',
        country: 'United States of America',
        latitude: 79.7645358,
        longitude: 50.4730327,
        name: 'River',
        description: "Located on the north side of the Newport Peninsula, this home is the ideal modern beach escape. In close proximity to both restaurants and beach, this retreat is tucked along the Balboa Coves. The modern design helped maximize the overall design with expansive windows that connect the beach sunsets to the west and the rolling Newport Beach hillside sunrises to the east.",
        pricePerNight: 942,
        previewImage: 'https://www.brandonarchitects.com/content/QuoFlAhpwCTJ_l.jpg'
      },
      {
        ownerId: 5,
        address: '123 Test Ave',
        city: 'Tampa',
        state: 'Florida',
        country: 'United States of America',
        latitude: 79.7645358,
        longitude: 50.4730327,
        name: 'South Bay Front',
        description: "This transitional-style home was designed for a highly visible lot along Newport Beach's Harbor boardwalk. The use of traditional wood siding and paneling details, steel windows and doors, and rich warm wood and stone create a familiar feel combined with unique, modern accents. This home utilizes the first floor living space along the boardwalk with a semi-public patio. The courtyard, entertainment room, and rooftop balcony provide private areas to enjoy the Southern California views and weather. There are three secondary bedrooms, a master suite with his and hers closets, laundry, mudroom, bonus room and rooftop cabana.",
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
        name: 'Hazel II',
        description: "As a remodel of an existing home overlooking the canyon, with an opportunity for views all the way to Catalina Island, Hazel II provided unique design challenges focused on maximizing the potential of the site while working within the constraints of a redesign. To this end, a second and third floor were added on top of the existing home, which added a private master bedroom level with a large viewing deck, along with a third floor bonus covered area with yet another view deck. The open floor plan concept used throughout the redesign, featuring large doors and windows opening onto the canyon with ocean views, allows the homeowner to utilize and enjoy the home's scenic potential to the fullest.",
        pricePerNight: 654,
        previewImage: 'https://www.brandonarchitects.com/content/4rhwK1xbaXeN_l.jpg'
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
