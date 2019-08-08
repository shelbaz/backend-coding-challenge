var db = require('../models/');
const City = db.sequelize.import('cities', require('../models/cities'));
import sequelize from 'sequelize';
import { logger } from '../lib/logger';
const Op = sequelize.Op;

/**
 * City Service for the cityControllers
 */
class CityService {

    /**
     * Function for returning all rows in cities table
     * @return {Array of {Objects}} All cities with all their columns
    */
    static async getAllCities() {
        try {
            return await City.findAll();
        } catch (error) {
            throw error;
        }
    }

    /**
     * Function for adding a new city in the cities table
     * @param {String} name The city name
     * @param {String} country The country the city is in (US or CA)
     * @param {String} admin1 The 2 character state or province code 
     * @param {Float} latitude The latitude in the search.
     * @param {Float} longitude The longitude in the search.
     * @param {Double} population The population of the city.
    */
    static async addCity(name, country, admin1, longitude, latitude, population){
        try {
            return await City.create(name, country, admin1, longitude, latitude, population);
        } catch (error){
            throw error;
        }
    }

     /**
     * Function for finding a partial match to a city name, using trigram lookup on names column
     * @param {String} lookupValue The full or partial city name being searched
    * @return {Array of {Objects}} All cities partial or full matching the name column

    */
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