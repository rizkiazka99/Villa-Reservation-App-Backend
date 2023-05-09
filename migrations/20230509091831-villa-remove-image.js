'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Villas', 'image_name');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('Villas', 'image_name', Sequelize.STRING);
  }
};
