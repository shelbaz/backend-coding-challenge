import model from '../models';

const { City } = model;

class Cities {
  static create(req, res) {
    const { name, country_code, admin1_code, longitude, latitude } = req.body
    const { userId } = req.params
    return City
      .create({
        name,
        country_code,
        admin1_code,
        longitude,
        latitude
      })
      .then(city => res.status(201).send({
        message: `Your city ${name} has been created successfully `,
        book
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
    }
}

export {Cities, adminCodeToZip}