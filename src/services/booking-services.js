const axios = require('axios')
const { BookingRepository } = require('../repositories')
const db = require('../models')
const bookingRespository = new BookingRepository()
const Apperror = require('../utils/errors/app-error');
const { FLIGHT_SERVICE } = require('../config/server-config')
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



module.exports = {createBooking}