import express from "express";
import {getSuggestionScore} from "./lib/suggestions"
import {CityController} from './controllers/cityController'

let router = new express.Router();

router.get('/', (req, res, next) => res.render('index.ejs', { title: 'Express' }));

// router.post('*', (req, res) => res.status(200).send({
// message: 'Welcome to the default API route',
// }));

// Suggestions GET endpoint for generating the list of potential matches and their score
router.get('/suggestions', CityController.getMatches); 

// Get all cities in the DB 
router.get('/cities', CityController.getAll);

export default router;