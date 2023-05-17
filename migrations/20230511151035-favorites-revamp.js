'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Favorites', 'LocationId');
    await queryInterface.removeColumn('Favorites', 'name');
    await queryInterface.removeColumn('Favorites', 'description');
    await queryInterface.removeColumn('Favorites', 'price');
    await queryInterface.removeColumn('Favorites', 'map_url');
    await queryInterface.addColumn('Favorites', 'VillaId', Sequelize.INTEGER);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('Favorites', 'LocationId', Sequelize.INTEGER);
    await queryInterface.addColumn('Favorites', 'name', Sequelize.STRING);
    await queryInterface.addColumn('Favorites', 'description', Sequelize.STRING);
    await queryInterface.addColumn('Favorites', 'price', Sequelize.BIGINT);
    await queryInterface.addColumn('Favorites', 'map_url', Sequelize.STRING);
    await queryInterface.removeColumn('Favorites', 'VillaId');
  }
};
