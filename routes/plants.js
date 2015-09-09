"use strict";

var express = require('express');
var router = express.Router();

var plantsController = require('../controllers/plants');

/* /plants */
router.get('/', function(req, res) {
	return plantsController.index.json(req,res);
});

module.exports = router;
