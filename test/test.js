import 'chai/register-should';
var assert = require('assert');
import {calculateDistance, getPopulationPercentage, getSuggestionScore} from '../src/server/lib/suggestions';


describe('Testing the suggestions endpoints:', () => {
    it('It should return a list of matching suggestions', (done) => {
        let suggestions = {
            "suggestions": [
                {
                    "name": "Saskatoon, SK, CA",
                    "latitude": 52.11679,
                    "longitude": -106.63452,
                    "score": 0.13638845371653102
                },
                {
                    "name": "Fort Saskatchewan, AB, CA",
                    "latitude": 53.71684,
                    "longitude": -113.2187,
                    "score": 0.08641837705744926
                }
            ]
        };
        let cityMatches = [];
        cityMatches.push({id: 1,
            name: "Saskatoon",
            country:"CA",
            admin1:"SK",
            latitude: 52.11679,
            longitude: -106.63452,
            population: 198958});
        cityMatches.push({
            id: 2,
            name: "Fort Saskatchewan",
            country: "CA",
            admin1: "AB",
            latitude: 53.71684,
            longitude: -113.2187,
            population: 14957
        });
        let suggestionsList = {};
        suggestionsList.suggestions = [];

        for(let city in cityMatches){
            let cityStateCountry = cityMatches[city].name + ', ' + cityMatches[city].admin1 + ', ' + cityMatches[city].country;
            let suggestionsObj = {
            "name": cityStateCountry ,
            "latitude": cityMatches[city].latitude,
            "longitude": cityMatches[city].longitude,
            "score": getSuggestionScore(cityMatches[city].name, latitude, longitude, parseFloat(cityMatches[city].latitude), parseFloat(cityMatches[city].longitude), cityMatches[city].population, lookupValue)
            };
            suggestionsList.suggestions.push(suggestionsObj);
        }
        var sortedList = suggestionsList.suggestions.sort((a, b) => parseFloat(b.score) - parseFloat(a.score));
        if (sortedList.length>5){
            sortedList = sortedList.slice(0, 5);
        }
        var finalList = {};
        finalList.suggestions = [];
        finalList.suggestions = sortedList
       
        assert.deepEqual(finalList, suggestions);
    })
});

/* Test */
it('should calculate & return distance in km between 2 points', function(){
    let c1_latitude = 38.898556;
    let c1_longitude = -77.037852;
    let c2_latitude = 38.897147;
    let c2_longitude = -77.043934;
    let finalDistance = 0.549; // km
    var distance = calculateDistance(c1_latitude, c1_longitude, c2_latitude, c2_longitude);
    assert.equal(Number((distance).toFixed(3)), finalDistance);
});

/* Test */
it('should calculate the population percentage of total population', function(){
    let TOTAL_POPULATION = 1000000;
    let population = 100000
    let finalPercentage = 0.1; // km
    var populationPercentage = getPopulationPercentage(population, TOTAL_POPULATION);
    assert.equal(finalPercentage, populationPercentage);
});

/* Test */
it('Get a score given a query, lat long for potential city', function(){
    
    let correctScore = 0.4959325032539845;
    let likely_city = 'London';
    let c1_latitude = 43.70011;
    let c1_longitude = -79.4163;
    let c2_latitude = 42.98339;
    let c2_longitude = -81.23304;

    var score = getSuggestionScore(likely_city, c1_latitude, c1_longitude, c2_latitude, c2_longitude, 500000, 'Londo');

    assert.equal(score, correctScore);
});
