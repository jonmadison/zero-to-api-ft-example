"use strict";

var express = require('express');
var router = express.Router();

var plantsController = require('../controllers/plants');

/* /v1/plants */
router.get('/', function(req, res) {                   // root path of API -- /v1/plants
	return plantsController.index.json(req,res);       // return results of index function in controller
});


router.get('/:id', function(req, res) {
	return plantsController.getById.json(req.params.id,res);
});

/* /plants */

module.exports = router;
