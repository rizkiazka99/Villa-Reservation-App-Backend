'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Villas', 'phone', Sequelize.BIGINT);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Villas', 'phone');
  }
};
