import fs from 'fs';
import csv from 'csv';
const Sequelize = require('sequelize');
var adminCodeToZip = require('../controllers/city.js').adminCodeToZip;
const sequelize = new Sequelize(config.database, config.username, config.password, config);
var model = sequelize['import']('../models/cities');

var input = fs.createReadStream('/Users/shawnelbaz/backend-coding-challenge/src/data/cities_canada-usa.tsv');
var parser = csv.parse({
    delimiter: '\t',
    columns: true
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
    console.log(resultObj);
    model.create(resultObj)
        .then(function() {
            console.log('Record created')
        })
        .catch(function(err) {
            console.log('Error encountered: ' + err)
        })
})

input.pipe(parser).pipe(transform)