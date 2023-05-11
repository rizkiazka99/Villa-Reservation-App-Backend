'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('VillaReviews', 'rating')
    await queryInterface.addColumn('VillaReviews', 'rating', Sequelize.DOUBLE);
    await queryInterface.changeColumn('VillaReviews', 'comment', Sequelize.STRING(1024));
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('VillaReviews', 'rating');
    await queryInterface.addColumn('VillaReviews', 'rating', Sequelize.STRING);
    await queryInterface.changeColumn('VillaReviews', 'comment', Sequelize.STRING);
  }
};
