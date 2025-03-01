const { where } = require("sequelize");
const { Logger } = require("../config");
const Apperror = require("../utils/errors/app-error");
const { StatusCodes } = require("http-status-codes");

class CrudRepository{
    constructor(model){
        this.model = model
    }

    async create(data){
        try{const response  = await this.model.create(data);
        return response}
        catch(error){
            Logger.error('something went wrong while creating');
            throw error

        }
    }
    async destroy(data){
        try{const response  = await this.model.destroy({
            where:{
                id:data
            }
        });
        if(!response){
            throw new Apperror('not able to find the resource',StatusCodes.NOT_FOUND)
        }
        return response}
        catch(error){
            Logger.error('something went wrong while creating');
            throw error

        }
    }
    async get(data){
        try{const response  = await this.model.findByPk(data);
        if(!response){
            throw new Apperror('not able to find the resource',StatusCodes.NOT_FOUND)
        }
            return response}
        catch(error){
            Logger.error('something went wrong while creating');
            throw error

        }
    }
    async  getAll(){
        try{const response  = await this.model.findAll();
        return response}
        catch(error){
            Logger.error('something went wrong while creating');
            throw error

        }
    }
    async  update(id,data){
        try{const response  = await this.model.update(data,{
            where:{
                id:id
            }
        });

        return response}
        catch(error){
            Logger.error('something went wrong while creating');
            throw error

        }
    }
}

module.exports = CrudRepository