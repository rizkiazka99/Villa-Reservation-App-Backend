const { Op } = require('sequelize');
const { Booking, Villa, User } = require('../models');
const midtransClient = require('midtrans-client');

let coreApi = new midtransClient.CoreApi({
    isProduction : false,
    serverKey : 'SB-Mid-server-ztEIEQu1Agb6Al3dlkVcMqWY',
    clientKey : 'SB-Mid-client-xy-QSZoo-av5lDdE'
});

class BookingController {
    static async getAll(request, response) {
        try {
            let result = await Booking.findAll({
                order: [
                    ['id', 'asc']
                ],
                include: [User, Villa]
            });

            if (result.length > 0) {
                const fixedData = result.map((booking) => {
                    return {
                        id: booking.id,
                        UserId: booking.UserId,
                        VillaId: booking.VillaId,
                        total_price: booking.total_price,
                        booking_start_date: booking.booking_start_date,
                        booking_end_date: booking.booking_end_date,
                        payment: JSON.parse(booking.payment),
                        status: booking.status,
                        payment_via: booking.payment_via,
                        User: booking.User,
                        Villa: booking.Villa,
                        createdAt: booking.createdAt,
                        updatedAt: booking.updatedAt,
                    }
                });

                response.status(200).json({
                    status: true,
                    message: 'All Bookings fetched',
                    data: fixedData
                });
            } else {
                response.status(404).json({
                    status: true,
                    message: 'No Bookings found',
                    data: result
                });
            }
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
            const UserId = +request.params.UserId;

            let result = await Booking.findAll({
                where: {
                    UserId: UserId
                },
                order: [
                    ['id', 'asc']
                ],
                include: [User, Villa]
            });

            if (result.length > 0) {
                const fixedData = result.map((booking) => {
                    return {
                        id: booking.id,
                        UserId: booking.UserId,
                        VillaId: booking.VillaId,
                        total_price: booking.total_price,
                        booking_start_date: booking.booking_start_date,
                        booking_end_date: booking.booking_end_date,
                        payment: JSON.parse(booking.payment),
                        status: booking.status,
                        payment_via: booking.payment_via,
                        User: booking.User,
                        Villa: booking.Villa,
                        createdAt: booking.createdAt,
                        updatedAt: booking.updatedAt
                    }
                });

                response.status(200).json({
                    status: true,
                    message: 'All Bookings fetched',
                    data: fixedData
                });
            } else {
                response.status(404).json({
                    status: true,
                    message: 'No Bookings found',
                    data: result
                });
            }
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
            const VillaId = +request.params.VillaId;

            let result = await Booking.findAll({
                where: {
                    VillaId: VillaId
                },
                order: [
                    ['id', 'asc']
                ],
                include: [User, Villa]
            });

            if (result.length > 0) {
                const fixedData = result.map((booking) => {
                    return {
                        id: booking.id,
                        UserId: booking.UserId,
                        VillaId: booking.VillaId,
                        total_price: booking.total_price,
                        booking_start_date: booking.booking_start_date,
                        booking_end_date: booking.booking_end_date,
                        payment: JSON.parse(booking.payment),
                        status: booking.status,
                        payment_via: booking.payment_via,
                        User: booking.User,
                        Villa: booking.Villa,
                        createdAt: booking.createdAt,
                        updatedAt: booking.updatedAt
                    }
                });

                response.status(200).json({
                    status: true,
                    message: 'All Bookings fetched',
                    data: fixedData
                });
            } else {
                response.status(404).json({
                    status: true,
                    message: 'No Bookings found',
                    data: result
                });
            }
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
            const id = request.params.id;

            let result = await Booking.findByPk(id, {
                include: [User, Villa]
            });

            if (result !== null) {
                result.payment = JSON.parse(result.payment)

                response.status(200).json({
                    status: true,
                    message: 'Booking fetched',
                    data: result
                });
            } else {
                response.status(404).json({
                    status: true,
                    message: 'Booking wasn\'t found',
                    data: result
                });
            }
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
            const { VillaId, total_price, booking_start_date, booking_end_date, payment_via } = request.body;

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
                            { booking_start_date },
                            { booking_end_date }
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
                    let chargeResponse = await coreApi.charge(request.body);
                    const dataBooking = {
                        id: chargeResponse.order_id,
                        UserId: UserId,
                        VillaId: VillaId,
                        total_price: total_price,
                        booking_start_date: booking_start_date,
                        booking_end_date: booking_end_date,
                        payment: JSON.stringify(chargeResponse),
                        status: chargeResponse.transaction_status,
                        payment_via: payment_via
                    }
                    let result = await Booking.create(dataBooking);

                    response.status(201).json({
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

    // Can't be used locally
    static async notification(request, response) {
        try {
            let statusResponse = await coreApi.transaction.notification(request.body);
            let orderId = statusResponse.order_id;
            let payment = JSON.stringify(statusResponse);
            
            let result = await Booking.update({
                payment: payment,
                status: statusResponse.transaction_status
            }, { 
                where: {
                    id: orderId
                }
            });

            result[0] === 1 ? response.status(200).json({
                status: true,
                message: 'Succesfully notified Midtrans about the payment',
                data: null
            }) : response.status(500).json({
                status: false,
                message: 'Failed to notify Midtrans about the payment',
                data: null
            });
        } catch(err) {
            response.status(500).json({
                status: false,
                message: String(err),
                data: null
            });
        }
    }

    // notification's alternative for local usage
    static async check(request, response) {
        try {
            const orderId = request.params.order_id;
            let statusResponse = await coreApi.transaction.status(orderId);
            let payment = JSON.stringify(statusResponse);

            let result = await Booking.update({
                payment: payment,
                status: statusResponse.transaction_status
            }, {
                where: {
                    id: orderId
                }
            });

            result[0] === 1 ? response.status(200).json({
                status: true,
                message: 'Succesfully notified Midtrans about the payment',
                data: null
            }) : response.status(500).json({
                status: false,
                message: 'Failed to notify Midtrans about the payment',
                data: null
            });
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
                    message: `Booking with an ID of ${id} wasn't found`,
                    data: null
                });
            } else {
                if (idAuth !== selectedBooking.UserId || roleAuth !== 'Admin') {
                    response.status(403).json({
                        status: false,
                        message: 'You are not the authorized user',
                        data: null
                    });
                } else {
                    let result = await Booking.destroy({
                        where: { id }
                    });

                    result === 1 ? response.status(200).json({
                        status: true,
                        message: 'Your booking has been cancelled',
                        data: null
                    }) : response.status(403).json({
                        status: false,
                        message: 'Your booking couldn\'t be cancelled',
                        data: null
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
}

module.exports = BookingController;