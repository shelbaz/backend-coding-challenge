var db = require('../models/index');
const City = db.sequelize.import('cities', require('../models/cities'));

/**
* City class database helper methods
*/
class Cities {
  
  static async create(req, res) {
    const { name, country, admin1, longitude, latitude, population } = req.body
    return await City
      .create({
        name,
        country,
        admin1,
        longitude,
        latitude,
        population
      })
      .then(city => res.status(201).send({
        message: `Your city ${name} has been created successfully `
      }))
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
      return await City.findAll({});
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
          console.log(error);
      });
    }
}

/**
 * Convert numeric province code to 2 letter code if Canada
 *
 * @param {String} Integer string of province code
 * @return {String} of province code (CA) or state code (US)
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

export {Cities, adminCodeToZip}