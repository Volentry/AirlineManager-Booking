const axios = require('axios')
const { BookingRepository } = require('../repositories')
const db = require('../models')
const bookingRespository = new BookingRepository()
const Apperror = require('../utils/errors/app-error');
const { FLIGHT_SERVICE } = require('../config/server-config')
const {ENUMS} = require('../utils/common');
const {BOOKED,CANCELLED,INITIATED,PENDING} = ENUMS.Booking_Status
const { message } = require('../utils/common/error-response')
const {StatusCodes} = require('http-status-codes')
const createBooking = async (data)=>{
    const transaction = await db.sequelize.transaction()
    try{
       
          
            const flight =   await  axios.get(`${FLIGHT_SERVICE}/api/v1/flights/${data.flightId}`)
            
            if(data.noOfSeats>flight.data.data.totalSeats){
              throw  new Apperror(['NO. of seats not available'],StatusCodes.BAD_REQUEST)
            }
            
            const totalBillAmount = data.noOfSeats * flight.data.data.price
            const bookingPayload = {
                ...data,totalCost:totalBillAmount
            }
           
            const booking = await bookingRespository.create(bookingPayload,transaction)
            await axios.patch(`${FLIGHT_SERVICE}/api/v1/flights/${data.flightId}/seats`,{
                seats:data.noOfSeats,
                dec:1
            })
            await transaction.commit()
            return booking;
          
    }catch(error){
        await transaction.rollback()
       
    }
       
   

}
async function  makePayment(data) {
    const transaction = await db.sequelize.transaction()
    try{
        const bookingDetails = await bookingRespository.get(data.bookingId,transaction)
        if(bookingDetails.totalCost!=data.totalCost){
            throw new Apperror('the price doesnt match',StatusCodes.BAD_REQUEST)
        }
        if(bookingDetails.userId!=data.userId){
            throw new Apperror('the userid doesnt match',StatusCodes.BAD_REQUEST)
        }
        const response = await bookingRespository.update(data.bookingId,{status:BOOKED},transaction)
    }catch(error){
        throw error

    }
    }
    




module.exports = {createBooking,makePayment}