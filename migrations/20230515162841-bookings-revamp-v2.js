'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Bookings', 'booking_start_date', Sequelize.STRING);
    await queryInterface.changeColumn('Bookings', 'booking_end_date', Sequelize.STRING);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Bookings', 'booking_start_date', Sequelize.INTEGER);
    await queryInterface.changeColumn('Bookings', 'booking_end_date', Sequelize.INTEGER);
  }
};
