import fs from 'fs';
import csv from 'csv';
var adminCodeToZip = require('../controllers/city.js').adminCodeToZip;
var db = require('../models/');
const City = db.sequelize.import('cities', require('../models/cities'));

/**
 * Initial seed the database with the csv file, loading it, parsing and then committing to db
*/
export default function seed(){
    var input = fs.createReadStream('/Users/shawnelbaz/backend-coding-challenge/src/data/cities_canada-usa.tsv');
    var parser = csv.parse({
        delimiter: '\t',
        columns: true,
        skip_lines_with_error: true,
        relax_column_count: true  
    })  
    var transform = csv.transform(function(row) {
    
    var resultObj = {
        name: row['name'],
        country: row['country'],
        admin1: adminCodeToZip(row['admin1']),
        longitude: row['long'],
        latitude: row['lat'],
        population: row['population'],
    }

    City.create(resultObj)
        .then(function() {
        })
        .catch(function(err) {
            console.log('Error encountered: ' + err)
        })
    });

input.pipe(parser).pipe(transform)
}

