"use strict";

var request = require('supertest');
var express = require('express');
var demand = require('must');

var app = require('../bin/www'); //app undertest

//make sure the root URL doesn't exist. 
//really a sanity check for our tests
describe('basics',function(){
	it('should return 404 on /',function(done) {
		request(app)
		.get('/')
		.set('Accept','application/json')
		.expect(404,done);
	})

    it('should return a list of plants',function(done) {
        request(app)                                    // create a new HTTP request...
        .get('/v1/plants')                              // of type GET /v1/plants
        .set('Accept', 'application/json')              // set Accept header to ask for json response
        .expect('Content-Type',/json/)                  // content type header should be json
        .expect(200, function(err,res) {                // need status 200 OK, and the following...
          demand(err).be.empty();
          demand(res.body).not.be.empty();
          demand(res.body.plants.length).equal(100);
          
          //get an example record
          var firstPlant = res.body.plants[0];
          demand(firstPlant).not.be.empty();
          demand(firstPlant.name).not.be.empty();
          demand(firstPlant.scientific_name).not.be.empty();
          done();
        })
      });
  
  it('should return a particular plant',function(done){
       request(app)                                         // create a new HTTP request...
       .get('/v1/plants/17590')                             // endpoint for single plant, very RESTful, yes
       .set('Accept', 'application/json')                   // i want JSON back
       .expect('Content-Type',/json/)                       // so i should get JSON back
       .expect(200, {    id: 17590,                         // check it: i can check for an entire object!
                       name: 'Agardh lupine',
                       description: null,
                       create_dt: null,
                       user_id: null,
                       zones: null,
                       created_at: '2015-09-07T13:50:06.654Z',
                       updated_at: '2015-09-07T13:50:06.654Z',
                       color: '',
                       color_family: null,
                       states: 'USA (CA)',
                       growth_season: '',
                       shopping_list_id: null,
                       garden_id: null,
                       duration: 'Annual',
                       scientific_name: 'Lupinus agardhianus',
                       foliage_color: '',
                       seed_color: null,
                       fruit_color: '',
                       shade_tolerance: null },done);
    });
 
});
