import Util from '../lib/utils';
import CityService from '../services/cityService'

const util = new Util();

/**
* City class database helper methods
*/
class CityController {
  static async create(req, res) {
      if (!req.body.name || !req.body.country || !req.body.admin1 || !req.body.longitude || !req.body.latitude || !req.body.population) {
        util.setError(400, 'Incomplete details');
        return util.send(res);
      }
      const { name, country, admin1, longitude, latitude, population } = req.body
      try {
        const createdCity = await CityService.addCity(name, country, admin1, longitude, latitude, population);
        util.setSuccess(201, 'City Added!', createdCity);
        return util.send(res);
      } catch (error) {
        util.setError(400, error.message);
        return util.send(res);
      }
    }

    /**
     * Get only specific attributes of all rows.
     *
     * @param {Request} req.arr The array of attributes selected 
     * @param {Response} res Response of server
     * @return {Array of {Objects}} of all cities
    */
    static async getSome(req, res){
      return await City.findAll({attributes: { include: req.body.arr }}) 
    }

     /**
     * Get all attributes of all rows.
     *
     * @param {Request} req Request of server
     * @param {Response} res Response of server
     * @return {Array of {Objects}} of all cities
    */
    static async getAll(req, res){
      try {
        const allCities = await CityService.getAllCities();
        if (allCities.length > 0) {
          util.setSuccess(200, 'Cities retrieved', allCities);
        } else {
          util.setSuccess(200, 'No cities found');
        }
        return util.send(res);
      } catch (error) {
        util.setError(400, error);
        return util.send(res);
      }
    }
    
    /**
     * Get partial string match of cities in database and return all attributes of matches
     *
     * @param {String} req.body.query Query string
     * @param {Response} res Response of server
     * @return {Array of {Objects}} matches of cities
    */
    static async getMatches(req, res){
      let lookupValue = req.body.query.toLowerCase();

      City.findAll({
          attributes: {include: ['name', 'country', 'longitude', 'latitude']},
          limit: 5,
          where: {
              asset_name: sequelize.where(sequelize.fn('LOWER', sequelize.col('asset_name')), 'LIKE', '%' + lookupValue + '%')
          }
      }).then(function(assets){
          return response.json({
              msg: '** Matches **',
              assets: assets
          });
      }).catch(function(error){
          logger.log('error', error);
      });
    }
}

/**
 * Convert numeric province code to 2 letter code if Canada
 *
 * @param {String} Integer string of province code
 * @return {String} of province code (CA) or state code (US- default)
*/
function adminCodeToZip(adminCode){
    switch(adminCode){
        case '01': return 'AB';
        case '02': return 'BC';
        case '03': return 'MB';
        case '04': return 'NB';
        case '05': return 'NL';
        case '07': return 'NS';
        case '08': return 'ON';
        case '09': return 'PE';
        case '10': return 'QC';
        case '11': return 'SK';
        case '12': return 'YT';
        case '13': return 'NT';
        case '14': return 'NU';
        default: return adminCode;
    }
}
export {CityController, adminCodeToZip}