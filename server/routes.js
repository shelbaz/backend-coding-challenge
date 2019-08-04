import express from "express";

let router = new express.Router();

router.get('/', (req, res) => res.status(200).send({
    message: 'Default endpoint',
  }));

router.post('/suggestions', (req, res) => res.status(200).send({
    message: 'Suggestions endpoint',
})); 

export default router;