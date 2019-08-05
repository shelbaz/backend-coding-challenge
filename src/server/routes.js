import express from "express";
import getSuggestionScore from "./lib/suggestions"

let router = new express.Router();

router.get('/', (req, res) => res.status(200).send({
    message: 'Default endpoint',
  }));

// router.post('*', (req, res) => res.status(200).send({
// message: 'Welcome to the default API route',
// }));

router.post('/suggestions', (req, res) => res.status(200).send({
    message: getSuggestionScore(),
})); 

export default router;