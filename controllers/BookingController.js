const { Op } = require('sequelize');
const { Booking, Villa, User } = require('../models');

class BookingController {
    static async getAll(request, response) {
        try {
            let result = await Booking.findAll({
                order: [
                    ['id', 'asc']
                ],
                include: [User, Villa]
            });

            response.status(200).json({
                status: true,
                message: 'All Bookings fetched',
                data: result
            });
        } catch(err) {
            response.status(500).json({
                status: false,
                message: String(err),
                data: null
            });
        }
    }

    static async getByUser(request, response) {
        try {
            const UserId = +request.params.id;

            let result = await Booking.findAll({
                where: {
                    UserId: UserId
                },
                order: [
                    ['id', 'asc']
                ],
                include: [User, Villa]
            });

            response.status(200).json({
                status: true,
                message: 'Bookings fetched',
                data: result
            });
        } catch(err) {
            response.status(500).json({
                status: false,
                message: String(err),
                data: null
            });
        }
    }

    static async getByVilla(request, response) {
        try {
            const VillaId = +request.params.id;

            let result = await Booking.findAll({
                where: {
                    VillaId: VillaId
                },
                order: [
                    ['id', 'asc']
                ],
                include: [User, Villa]
            });

            response.status(200).json({
                status: true,
                message: 'Bookings fetched',
                data: result
            });
        } catch(err) {
            response.status(500).json({
                status: false,
                message: String(err),
                data: null
            });
        }
    }

    static async getById(request, response) {
        try {
            const id = +request.params.id;

            let result = await Booking.findByPk(id);

            response.status(200).json({
                status: true,
                message: 'Booking fetched',
                data: result
            });
        } catch(err) {
            response.status(500).json({
                status: false,
                message: String(err),
                data: null
            });
        }
    }

    static async book(request, response) {
        try {
            const roleAuth = request.userData.role;
            const UserId = +request.userData.id;
            const { VillaId, total_price, booking_start_date, booking_end_date, payment, status } = request.body;

            if (roleAuth !== 'User') {
                response.status(403).json({
                    status: false,
                    message: 'Only Users are allowed to do this action',
                    data: null
                });
            } else {
                let duplicateBooking = await Booking.findAll({
                    where: {
                        [Op.and]: [
                            { UserId },
                            { VillaId },
                            { booking_start_date }
                        ]
                    }
                });

                if (duplicateBooking.length !== 0) {
                    response.status(403).json({
                        status: false,
                        message: 'You already have a booking on the same Villa at the same date',
                        data: null
                    });
                } else {
                    let result = await Booking.create({
                        VillaId, total_price, booking_start_date, booking_end_date, payment, status
                    });

                    response.status(200).json({
                        status: true,
                        message: 'Your booking has been made!',
                        data: result
                    });
                }
            }
        } catch(err) {
            response.status(500).json({
                status: false,
                message: String(err),
                data: null
            });
        }
    }

    static async cancel(request, response) {
        try {
            const id = +request.params.id;
            const idAuth = +request.userData.id;
            const roleAuth = request.userData.role;

            let selectedBooking = await Booking.findByPk(id);

            if (!selectedBooking) {
                response.status(404).json({
                    status: false,
                    message: `Booking with an ID of ${id} wasn't found`
                });
            } else {
                if (idAuth !== selectedBooking.UserId || roleAuth !== 'Admin') {
                    response.status(403).json({
                        status: false,
                        message: 'You are not the authorized user'
                    });
                } else {
                    let result = await Booking.destroy({
                        where: { id }
                    });

                    result === 1 ? response.status(200).json({
                        status: true,
                        message: 'Your booking has been cancelled'
                    }) : response.status(403).json({
                        status: false,
                        message: 'Your booking couldn\'t be cancelled'
                    });
                }
            }
        } catch(err) {
            response.status(500).json({
                status: false,
                message: String(err)
            });
        }
    }
}

module.exports = BookingController;