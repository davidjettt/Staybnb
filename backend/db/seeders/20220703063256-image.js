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
        spotId: 1,
        reviewId: null,
        url: 'https://i.ytimg.com/vi/y2MAt1D8A5M/maxresdefault.jpg'
      },
      {
        spotId: 2,
        reviewId: null,
        url: 'https://www.sbsun.com/wp-content/uploads/2020/06/SBS-L-AURORA-0615-07-1.jpg?w=620'
      },
      {
        spotId: 2,
        reviewId: null,
        url: 'https://www.gannett-cdn.com/presto/2019/01/05/PDEM/bfd9a744-5d66-4e76-9cb5-5cca353c5216-13.jpg?crop=1919,1079,x0,y80&width=660&height=372&format=pjpg&auto=webp'
      },
      {
        spotId: 2,
        reviewId: null,
        url: 'https://photos.bookerville.com/prop9735/main/main.jpg'
      },
      {
        spotId: 2,
        reviewId: null,
        url: 'https://photos.bookerville.com/prop3365/edgewood_bedroom2_v2s.jpg'
      },
      {
        spotId: 2,
        reviewId: null,
        url: 'https://imgcy.trivago.com/c_limit,d_dummy.jpeg,f_auto,h_1300,q_auto,w_2000/itemimages/21/02/21026656_v1.jpeg'
      },
      {
        spotId: 3,
        reviewId: null,
        url: 'https://en.mansionesmiami.com/wp-content/uploads/2020/07/espectacular-mansion-en-miami-beach-con-luces-de-noche.jpg'
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
        spotId: 3,
        reviewId: null,
        url: 'https://en.mansionesmiami.com/wp-content/uploads/2020/07/mansion-en-venetian-islands-miami-de-noche.jpg'
      },
      {
        spotId: 3,
        reviewId: null,
        url: 'http://cdn.home-designing.com/wp-content/uploads/2018/03/Retractable-doors-1.jpg'
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
        spotId: 4,
        reviewId: null,
        url: 'https://www.kiawahisland.com/wp-content/uploads/kiawah-modern-image.jpeg'
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
        spotId: 5,
        reviewId: null,
        url: 'https://archello.s3.eu-central-1.amazonaws.com/images/2019/03/17/Modern-Beach-House-Design-4.1552835287.7363.jpg'
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
        spotId: 6,
        reviewId: null,
        url: 'https://www.brandonarchitects.com/content/F3L_ZcsOHRG0_l.jpg'
      },
      {
        spotId: 7,
        reviewId: null,
        url: 'https://www.brandonarchitects.com/content/QuoFlAhpwCTJ_l.jpg'
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
        spotId: 7,
        reviewId: null,
        url: 'https://www.brandonarchitects.com/content/61mBoVJAHlsS_l.jpg'
      },
      {
        spotId: 7,
        reviewId: null,
        url: 'https://www.brandonarchitects.com/content/maGRBLhoHdOs_l.jpg'
      },
      {
        spotId: 8,
        reviewId: null,
        url: 'https://i.pinimg.com/originals/85/63/a6/8563a69c15278578ee1eead136d33e72.jpg'
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
        spotId: 8,
        reviewId: null,
        url: 'https://www.brandonarchitects.com/content/SiuJLl8Ak6mO_l.jpg'
      },
      {
        spotId: 9,
        reviewId: null,
        url: 'https://www.brandonarchitects.com/content/4rhwK1xbaXeN_l.jpg'
      },
      {
        spotId: 9,
        reviewId: null,
        url: 'https://www.brandonarchitects.com/content/nCTJDgdzsxGF_l.jpg'
      },
      {
        spotId: 9,
        reviewId: null,
        url: 'https://www.brandonarchitects.com/content/Hfki6FyKCeL0_l.jpg'
      },
      {
        spotId: 9,
        reviewId: null,
        url: 'https://www.brandonarchitects.com/content/xBDTb4n0RlNY_l.jpg'
      },
      {
        spotId: 9,
        reviewId: null,
        url: 'https://www.brandonarchitects.com/content/aBnGjLcZpiXq_l.jpg'
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
      {
        spotId: null,
        reviewId: 3,
        url: 'https://www.brandonarchitects.com/content/LEs2aNr6gq9F_l.jpg'
      },
      {
        spotId: null,
        reviewId: 4,
        url: 'https://www.brandonarchitects.com/content/yuQ6wmf5BHVD_l.jpg'
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
