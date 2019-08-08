var database = require('../models/index');
var db = require('../models/');
const City = db.sequelize.import('cities', require('../models/cities'));

class CityService {
    static async getAllCities() {
        try {
            console.log('hit service');
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
            return await City.findAll({
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
        } catch (error) {
            throw error;
          }
    }
}

export default CityService;