const express = require('express');
const index = require('../views/index.js');


let router = express.Router();

router.get('/', (req, res, next) => {
  res.send(index.main());
});

router.post('/', (req, res, next) => {
  console.log('WRITE ME');
});

router.get('/add', (req, res, next) => {
  res.send(index.addPage());
});

module.exports = router;
