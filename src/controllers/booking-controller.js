
const { StatusCodes } = require('http-status-codes')
const {bookingService} = require('../services/index')
const { SuccessResponse, ErrorResponse } = require('../utils/common')
const { Model } = require('sequelize')


const createBooking = async (req,res,next)=>{
    try{
       
        const booking = await bookingService.createBooking({flightId:req.body.flightId,userId:req.body.userId,noOfSeats:req.body.noOfSeats});
        SuccessResponse.data = booking
        return res.status(StatusCodes.OK).json(SuccessResponse)

    }catch(error){
        ErrorResponse.error = error;
       
       
        return res.status(error.statusCode).json(ErrorResponse);
        
    }

}
const makePayment = async (req,res,next)=>{
    try{
     
        const booking = await bookingService.makePayment({totalCost:req.body.totalCost,
            userId:req.body.userId,
            bookingId:req.body.bookingId});
            
        SuccessResponse.data = booking
        return res.status(StatusCodes.OK).json(SuccessResponse)

    }catch(error){
        ErrorResponse.error = error;
       
       
        return res.status(error.statusCode).json(ErrorResponse);
        
    }

}
module.exports ={createBooking,makePayment}