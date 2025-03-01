const CrudRepository = require("./crud-repository");
const {Booking} = require('../models');
const Apperror = require("../utils/errors/app-error");
const { StatusCodes } = require("http-status-codes");
class BookingRepository extends CrudRepository{
    constructor(){
        super(Booking)
    }
    async  createBooking(data,transaction) {
        const response = await Booking.create(data,{transaction:transaction})
        return response
    } 
    async  get(data,transaction) {

        const  response = await this.model.findByPk(data,{transaction:transaction})
        if(!response){
            throw new Apperror('not able to  find the resource',StatusCodes.NOT_FOUND)
        }
        return response
    } 
    async  update(id,data,transaction){
        try{const response  = await this.model.update(data,{
            where:{
                id:id
            }
        },{transaction:transaction});

        return response}
        catch(error){
            Logger.error('something went wrong while creating');
            throw error

        }
    }
}
module.exports = BookingRepository