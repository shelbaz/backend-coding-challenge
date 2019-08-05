var db = require('../models/index');
const City = db.sequelize.import('cities', require('../models/cities'));


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
}

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