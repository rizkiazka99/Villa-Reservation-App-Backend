'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Favorites', 'image_name');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('Favorites', 'image_name', Sequelize.STRING);
  }
};
