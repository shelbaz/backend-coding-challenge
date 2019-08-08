var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const TOTAL_POPULATION = 240097546;

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
function getSuggestionScore(city, c1_latitude, c1_longtitude, c2_latitude, c2_longtitude, population){
    let equalWeight = 1/2; // a third weight each
    let distanceScore = equalWeight * (1.0 / calculateDistance(c1_latitude, c1_longtitude, c2_latitude, c2_longtitude));// TODO
    let populationScore = equalWeight * getPopulationPercentage(population, TOTAL_POPULATION);
    console.log('distanceScore:' +distanceScore);
    console.log('populationScore:' +populationScore);
    let suggestionScore = 0;
    let suggestionCity = getGeocodeCertainty(c1_latitude, c1_longtitude);
    console.log('suggestion: ' + JSON.stringify(suggestionCity) + ' compared: ' + city)
    if (city == suggestionCity.city + ', ' + suggestionCity.state){
        suggestionScore += equalWeight
    }
    console.log('apiScore:' +suggestionScore);

    let totalScore = distanceScore + populationScore;
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
        var R = 6371; // Radius of the earth in km
        var distanceLat = (c2_latitude-c1_latitude) * (Math.PI/180);  
        var distanceLon = (c2_longtitude-c1_longtitude) * (Math.PI/180); 
        var a = 
          Math.sin(distanceLat/2) * Math.sin(distanceLat/2) +
          Math.cos((c1_latitude) * (Math.PI/180)) * Math.cos((c2_latitude) * (Math.PI/180)) * 
          Math.sin(distanceLon/2) * Math.sin(distanceLon/2)
          ; 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c; // Distance in km
        return d;
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
function getPopulationPercentage(population, TOTAL_POPULATION){
        if (population){
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
    
    var url = 'https://geocode.xyz/LAT,LNG?geoit=json';
    url = url.replace('LAT', c1_latitude);
    url = url.replace('LNG', c1_longtitude);
    console.log('url:' + url)
    
    var xhr = new XMLHttpRequest(); // a new request
    xhr.open("GET",url,false);
    xhr.send(null);
    var json_obj = JSON.parse(xhr.responseText);  
    console.log('json_obj'+ JSON.stringify(json_obj));        
    return {
        city: json_obj.city,
        state: json_obj.state
    };    
}

export {getGeocodeCertainty, getPopulationPercentage, calculateDistance, getSuggestionScore}
