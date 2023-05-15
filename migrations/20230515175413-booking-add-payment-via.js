'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Bookings', 'payment_via', Sequelize.STRING);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Bookings', 'payment_via');
  }
};
