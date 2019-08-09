import express from "express";
import {CityController} from './controllers/cityController'

let router = new express.Router();

// Default root endpoint for frontend 
router.get('/', (req, res, next) => res.render('index.ejs', { title: 'Express' }));

// Suggestions GET endpoint for generating the list of potential matches and their score
router.get('/suggestions', CityController.getMatches); 

// Get all cities in the DB 
router.get('/cities', CityController.getAll);

export default router;