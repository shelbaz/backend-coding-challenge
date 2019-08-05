import {City} from "../models/cities"
var parseString = require('xml2js').parseString;

const TOTAL_POPULATION = 240097546;
const CANADA = "CA";
const USA = "US";

function getSuggestionScore(c1_latitude, c1_longtitude){

    let distanceScore = distanceWeight * (1.0 / calculateDistance(c1_latitude, c1_longtitude, c2_latitude, c2_longtitude));
    let populationScore = populationWeight * getPopulationPercentage(population, country, TOTAL_POPULATION);
    let apiScore = getGoogleMapsCentainty(c1_latitude, c1_longtitude);
    let totalScore = distanceScore + populationScore + apiScore; 
}

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

function getPopulationPercentage(population, country, TOTAL_POPULATION){
        if (population && country){
                return (population/TOTAL_POPULATION);
            }
}

function getGoogleMapsCentainty(c1_latitude, c1_longtitude){
    
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

