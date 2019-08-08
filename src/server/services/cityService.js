var db = require('../models/');
const City = db.sequelize.import('cities', require('../models/cities'));
import sequelize from 'sequelize';
import { logger } from '../lib/logger';
const Op = sequelize.Op;

class CityService {
    static async getAllCities() {
        try {
            return await City.findAll();
        } catch (error) {
            throw error;
        }
    }

    static async addCity(name, country, admin1, longitude, latitude, population){
        try {
            return await City.create(name, country, admin1, longitude, latitude, population);
        } catch (error){
            throw error;
        }
    }

    static async findACity(lookupValue){
        try {
            let cityMatches = await City.findAll({
                attributes: {include: ['name', 'country', 'longitude', 'latitude']},
                  where: {
                    name: {
                      [Op.iLike]: `%${lookupValue}%` // trigram lookup 
                    }
                  }
                });
              
            logger.log('info', JSON.stringify(cityMatches));
            return cityMatches;
    }catch(error){
        logger.log('info', error);
    }
}
}

export default CityService;