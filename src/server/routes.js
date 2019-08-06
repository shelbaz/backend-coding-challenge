import express from "express";
import getSuggestionScore from "./lib/suggestions"
import {getAll, getMatches} from './controllers/city'

let router = new express.Router();

router.get('/', (req, res) => res.status(200).send({
    message: 'Default endpoint',
  }));

// router.post('*', (req, res) => res.status(200).send({
// message: 'Welcome to the default API route',
// }));

// Suggestions GET endpoint for generating the list of potential matches and their score
router.get('/suggestions', (req, res) => res.status(200).send(
  {
    message: getSuggestionScore(),
})); 

// Get all cities in the DB 
router.get('/cities', (req, res) => res.status(200).send({
  data: getAll(),
}));

router.get('/mycities/', (req, res) => {
  var city = req.query.city;
  var lat = req.query.lat;
  var long = req.query.long;
  
  res.status(200).send({
  
  })
})

export default router;