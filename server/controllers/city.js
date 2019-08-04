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

export default Cities