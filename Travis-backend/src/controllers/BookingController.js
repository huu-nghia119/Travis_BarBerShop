const BookingService = require('../services/BookingService')
const Booking =require('../models/BookingModel')
const JwtService = require('../services/JwtService')

const createBooking = async (req, res) => {
    try {
        const { bookingName, bookingEmail, bookingPhone, bookingDate, bookingTime} = req.body
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        const isCheckEmail = reg.test(bookingEmail)    
        if (!bookingName || !bookingEmail || !bookingPhone || !bookingDate || !bookingTime) {
            return res.status(400).json({
                status: 'ERR',
                message: 'All fields are required'
            });
        } else if (!isCheckEmail) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Invalid email format'
            });
        }

        
        const response = await BookingService.createBooking(req.body)
        return res.status(200).json(response)
    } catch (e) {
        console.error('Server error:', e);
        return res.status(500).json({
            message: e
        })
    }
}

const updateBooking = async (req, res) => {
    try {
        const bookingId = req.params.id
        const data = req.body
        if (!bookingId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The bookingId is required'
            })
        }
        const response = await BookingService.updateBooking(bookingId, data)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const deleteBooking = async (req, res) => {
    try {
        const bookingId = req.params.id
        if (!bookingId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The bookingId is required'
            })
        }
        const response = await BookingService.deleteBooking(bookingId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const deleteMany = async (req, res) => {
    try {
        const ids = req.body.ids
        if (!ids) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The ids is required'
            })
        }
        const response = await BookingService.deleteManyBooking(ids)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}


const getAllBooking = async (req, res) => {
    try {
        const response = await BookingService.getAllBooking()
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getDetailsBooking = async (req, res) => {
    try {
        const bookingId = req.params.id
        if (!bookingId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The id is required'
            })
        }
        const response = await BookingService.getDetailsBooking(bookingId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}


module.exports = {
    createBooking,
    getDetailsBooking,
    updateBooking,
    deleteBooking,
    getAllBooking,
    deleteMany
}
