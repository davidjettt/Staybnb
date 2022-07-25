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
    await queryInterface.bulkInsert('Images', [
      {
        spotId: 1,
        reviewId: null,
        url: 'https://cdn.tatlerasia.com/asiatatler/i/ph/2019/07/18161159-3-super-penthouse_cover_2000x1168.jpg'
      },
      {
        spotId: 1,
        reviewId: null,
        url: 'https://imageio.forbes.com/specials-images/imageserve/5d0f16f334a5c40008492f2e/Two-story-penthouse/960x0.jpg?format=jpg&width=960'
      },
      {
        spotId: 1,
        reviewId: null,
        url: 'https://onecms-res.cloudinary.com/image/upload/s--UDdRJzYD--/c_crop,h_743,w_1322,x_4,y_757/c_fill,g_auto,h_676,w_1200/f_auto,q_auto/v1/mediacorp/cna/image/2022/04/27/super_penthouse_marina_bay_residences_studio_if.png?itok=by-r187R'
      },
      {
        spotId: 1,
        reviewId: null,
        url: 'https://ycdn.space/h/2021/07/a-view-from-a-height-life-in-a-penthouse-001.jpg'
      },
      {
        spotId: 2,
        reviewId: null,
        url: 'https://www.sbsun.com/wp-content/uploads/2020/06/SBS-L-AURORA-0615-07-1.jpg?w=620'
      },
      {
        spotId: 2,
        reviewId: null,
        url: 'https://ycdn.space/h/2021/07/a-view-from-a-height-life-in-a-penthouse-001.jpg'
      },
      {
        spotId: 2,
        reviewId: null,
        url: 'https://photos.bookerville.com/prop9735/main/main.jpg'
      },
      {
        spotId: 2,
        reviewId: null,
        url: 'https://photos.bookerville.com/prop3365/main/main.jpg'
      },
      {
        spotId: 3,
        reviewId: null,
        url: 'https://imgcy.trivago.com/c_limit,d_dummy.jpeg,f_auto,h_1300,q_auto,w_2000/itemimages/21/02/21026656_v1.jpeg'
      },
      {
        spotId: 3,
        reviewId: null,
        url: 'https://a0.muscache.com/im/pictures/d03d9889-b6c3-42f5-ad84-2c6c4b7a57b2.jpg?im_w=2560'
      },
      {
        spotId: 3,
        reviewId: null,
        url: 'https://architecturesstyle.com/wp-content/uploads/2021/01/modern-beach-house-3.jpg'
      },
      {
        spotId: 4,
        reviewId: null,
        url: 'https://media.vrbo.com/lodging/28000000/27320000/27314000/27313935/e7c3076b.c10.jpg'
      },
      {
        spotId: 4,
        reviewId: null,
        url: 'https://media.vrbo.com/lodging/28000000/27320000/27314000/27313935/ac094ab4.f10.jpg'
      },
      {
        spotId: 4,
        reviewId: null,
        url: 'https://media.vrbo.com/lodging/28000000/27320000/27314000/27313935/3c11812e.f10.jpg'
      },
      {
        spotId: 4,
        reviewId: null,
        url: 'https://media.vrbo.com/lodging/28000000/27320000/27314000/27313935/87e772f7.f10.jpg'
      },
      {
        spotId: 5,
        reviewId: null,
        url: 'https://architecturesstyle.com/wp-content/uploads/2021/01/modern-beach-house-3.jpg'
      },
      {
        spotId: 5,
        reviewId: null,
        url: 'https://www.brandonarchitects.com/content/l9sJu_XFtDyx_l.jpg'
      },
      {
        spotId: 5,
        reviewId: null,
        url: 'https://www.brandonarchitects.com/content/WvHalpNbDTYK_l.jpg'
      },
      {
        spotId: 5,
        reviewId: null,
        url: 'https://www.brandonarchitects.com/content/9aotMsWHnrSy_l.jpg'
      },
      {
        spotId: 6,
        reviewId: null,
        url: 'https://www.brandonarchitects.com/content/EP1Jx_4KFZpN_l.jpg'
      },
      {
        spotId: 6,
        reviewId: null,
        url: 'https://www.brandonarchitects.com/content/14s9ZXuJfIxc_l.jpg'
      },
      {
        spotId: 6,
        reviewId: null,
        url: 'https://www.brandonarchitects.com/content/hLZfmUqi_oRy_l.jpg'
      },
      {
        spotId: 6,
        reviewId: null,
        url: 'https://www.brandonarchitects.com/content/gvQEkqcStMzV_l.jpg'
      },
      {
        spotId: 7,
        reviewId: null,
        url: 'https://www.brandonarchitects.com/content/6RJazue1ySQv_l.jpg'
      },
      {
        spotId: 7,
        reviewId: null,
        url: 'https://www.brandonarchitects.com/content/mLbrxkj9JotQ_l.jpg'
      },
      {
        spotId: 7,
        reviewId: null,
        url: 'https://www.brandonarchitects.com/content/y_KNH3MQgOYX_l.jpg'
      },
      {
        spotId: 8,
        reviewId: null,
        url: 'https://www.brandonarchitects.com/content/lygTb82KRoOB_l.jpg'
      },
      {
        spotId: 8,
        reviewId: null,
        url: 'https://www.brandonarchitects.com/content/YI91cLaCxFfw_l.jpg'
      },
      {
        spotId: 8,
        reviewId: null,
        url: 'https://www.brandonarchitects.com/content/fhuJHxUnFVWz_l.jpg'
      },
      {
        spotId: 9,
        reviewId: null,
        url: 'https://www.brandonarchitects.com/content/p7Tk4nRMwsUy_l.jpg'
      },
      {
        spotId: 9,
        reviewId: null,
        url: 'https://www.brandonarchitects.com/content/nCTJDgdzsxGF_l.jpg'
      },
      {
        spotId: 9,
        reviewId: null,
        url: 'https://www.brandonarchitects.com/content/GHtRbs_4PzAS_l.jpg'
      },
      {
        spotId: null,
        reviewId: 2,
        url: 'https://s.wsj.net/public/resources/images/BN-RT353_HOTY_M_20170123150754.jpg'
      },
      {
        spotId: null,
        reviewId: 1,
        url: 'https://i.ytimg.com/vi/KLwsKK8qfi0/maxresdefault.jpg'
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
      id: {[Op.in]: [1, 2, 3, 4]}
    })
  }
};
