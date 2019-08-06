import {City} from "../models/cities"
var parseString = require('xml2js').parseString;

const TOTAL_POPULATION = 240097546;
const CANADA = "CA";
const USA = "US";

/**
 * Compute a certainty score for the potential match of query.
 *
 * @param {String} city The potential city.
 * @param {Double} c1_latitude The latitude in the search.
 * @param {Double} c1_longitude The longitude in the search.
 * @param {Double} c2_latitude The latitude of the potential match.
 * @param {Double} c2_longitude The The longitude of the potential match.
 * @return {Integer} between 0-1 to compute certainty.
*/
function getSuggestionScore(city, c1_latitude, c1_longtitude, c2_latitude, c2_longtitude){

    let distanceScore = distanceWeight * (1.0 / calculateDistance(c1_latitude, c1_longtitude, c2_latitude, c2_longtitude));
    let populationScore = populationWeight * getPopulationPercentage(population, country, TOTAL_POPULATION);
    let apiScore = getGeocodeCertainty(c1_latitude, c1_longtitude);
    let totalScore = distanceScore + populationScore + apiScore;
    return totalScore; 
}

/**
 * Generate the suggestions array of objects with their attributes 
 *
 * @param {String} query The partial or full query of a city.
 * @param {Double} c1_latitude The latitude in the search.
 * @param {Double} c1_longitude The longitude in the search.
 * @return {Array of {Objects}} between 0-1 to compute certainty.
 * @return Object attributes : name, lattitude, longitude, score
*/
function generateSuggestions(query, c1_latitude, c1_longtitude){

}

/**
 * Calculate the distance between 2 lat long coordinates 
 *
 * @param {Double} c1_latitude The latitude of point 1.
 * @param {Double} c1_longitude The longitude of point 1.
 * @param {Double} c2_latitude The latitude of point 2.
 * @param {Double} c2_longitude The longitude of point 2.
 * @return {Integer} distance in kms between both points
*/
function calculateDistance(c1_longtitude, c1_latitude, c2_longtitude, c2_latitude){
    if ((c1_latitude == c2_latitude)     && 
        (c1_longtitude == c2_longtitude) || 
        (!c1_latitude || !c2_latitude || !c1_longtitude || !c2_longtitude)
        ){
		return 0;
	}
	else {
            var p = 0.017453292519943295;    // Math.PI / 180
            var c = Math.cos;
            var a = 0.5 - c((lat2 - lat1) * p)/2 + 
                    c(lat1 * p) * c(lat2 * p) * 
                    (1 - c((lon2 - lon1) * p))/2;
          
            return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
	}
}

/**
 * Calculate the percentage of the population of the city vs total population of all cities in the csv 
 *
 * @param {Integer}population Population count of the city.
 * @param {String}country Country of the city.
 * @param {Integer} TOTAL_POPULATION Total population of all cities in the csv.
 * @return {Double} between 0-1 percentage of population 
*/
function getPopulationPercentage(population, country, TOTAL_POPULATION){
        if (population && country){
                return (population/TOTAL_POPULATION);
            }
}

/**
 * Geocode Localization for extra certainty using API
 *
 * @param {Double} c1_latitude The latitude of point 1.
 * @param {Double} c1_longitude The longitude of point 1.
 * @return {String} Potential guess of the city from the coordinates 
*/
function getGeocodeCertainty(c1_latitude, c1_longtitude){
    
    var url = 'https://geocode.xyz/LAT,LONG?geoit=xml';
    url = url.replace('LAT', c1_latitude);
    url = url.replace('LNG', c1_longtitude);
    fetch(url)
    .then(data =>{
        parseString(data, function (err, result) {
            let jsonData = JSON.stringify(result);
            return jsonData.geodata.city;
        });
    })
    .then(res => {return console.log(res)})   
    
}

