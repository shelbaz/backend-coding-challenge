import chai from 'chai';
import chatHttp from 'chai-http';
import 'chai/register-should';
import app from '../src/app';
var assert = require('assert');
import {getGeocodeCertainty, calculateDistance, getPopulationPercentage, getSuggestionScore} from '../src/server/lib/suggestions';


chai.use(chatHttp);

// describe('Testing the suggestions endpoints:', () => {
//     it('It should return a list of matching suggestions', (done) => {
//       const url = '?q=Londo&latitude=43.70011&longitude=-79.4163'
//       chai.request(app)
//         .get('/suggestions/' + url)
//         .end((err, res) => {
//           expect(res.status).to.equal(201);
//           expect(res.body.data).to.include({
//             // expected response arr of objs : TODO
//           });
//           done();
//         });
//     })
// });

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
    
    let correctScore = 0.4217;
    let likely_city = 'London';
    let c1_latitude = 43.70011;
    let c1_longitude = -79.4163;
    let c2_latitude = 42.98339;
    let c2_longitude = -81.23304;

    var score = getSuggestionScore(likely_city, c1_latitude, c1_longitude, c2_latitude, c2_longitude, 500000, 'Londo');

    assert.equal(score, correctScore);
});
