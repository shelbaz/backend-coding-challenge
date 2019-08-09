import chai from 'chai';
import chatHttp from 'chai-http';
import 'chai/register-should';
import {app} from '../src/app';
var assert = require('assert');
import {calculateDistance, getPopulationPercentage, getSuggestionScore} from '../src/server/lib/suggestions';


chai.use(chatHttp);

describe('Testing the suggestions endpoints:', () => {
    it('It should return a list of matching suggestions', (done) => {
      const url = '?q=Londo&latitude=43.70011&longitude=-79.4163'
      chai.request(app)
        .get('/suggestions/' + url)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.data).to.include({
            
                "suggestions": [
                    {
                        "name": "London, ON, CA",
                        "latitude": 42.98339,
                        "longitude": -81.23304,
                        "score": 0.4217199760713868
                    },
                    {
                        "name": "London, OH, US",
                        "latitude": 39.88645,
                        "longitude": -83.44825,
                        "score": 0.283702296272092
                    },
                    {
                        "name": "London, KY, US",
                        "latitude": 37.12898,
                        "longitude": -84.08326,
                        "score": 0.26211646432439983
                    },
                    {
                        "name": "New London, CT, US",
                        "latitude": 41.35565,
                        "longitude": -72.09952,
                        "score": 0.21749554087608675
                    },
                    {
                        "name": "New London, WI, US",
                        "latitude": 44.39276,
                        "longitude": -88.73983,
                        "score": 0.21098522791906896
                    }
                ]
            
          });
          done();
        });
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
    
    let correctScore = 0.4959;
    let likely_city = 'London';
    let c1_latitude = 43.70011;
    let c1_longitude = -79.4163;
    let c2_latitude = 42.98339;
    let c2_longitude = -81.23304;

    var score = getSuggestionScore(likely_city, c1_latitude, c1_longitude, c2_latitude, c2_longitude, 500000, 'Londo');

    assert.equal(score, correctScore.toFixed(4));
});
