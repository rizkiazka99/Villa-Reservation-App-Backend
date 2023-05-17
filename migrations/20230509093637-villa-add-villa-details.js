'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Villas', 'bedroom', Sequelize.INTEGER);
    await queryInterface.addColumn('Villas', 'bathroom', Sequelize.INTEGER);
    await queryInterface.addColumn('Villas', 'swimming_pool', Sequelize.BOOLEAN);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Villas', 'bedroom');
    await queryInterface.removeColumn('Villas', 'bathroom');
    await queryInterface.removeColumn('Villas', 'swimming_pool'); 
  }
};
