"use strict";

var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/flowerthing_dev';

var client = new pg.Client(connectionString);

module.exports = client;