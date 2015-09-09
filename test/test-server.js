"use strict";

var request = require('supertest');
var express = require('express');
var demand = require('must');

var app = require('../bin/www'); //app undertest

describe('basics',function(){
	it('should return 404 on /',function(done){
		request(app)
		.get('/')
		.set('Accept','application/json')
		.expect(404,done);
	})
});

//when we ask for a list of plants, look for a body something like this:
//{ "plants" : [ {}, {}, {}, ...]} where each {} is a plant
describe('GET /v1/plants',function(){
     it('should return a list of plants',function(done){
          request(app)
          .get('/v1/plants')
          .set('Accept', 'application/json')
          .expect('Content-Type',/json/)
          .expect(200, {   id: 17590,
                           name: 'Agardh lupine',
                           description: null,
                           create_dt: null,
                           user_id: null,
                           zones: null,
                           created_at: 'Mon Sep 07 2015 06:50:06 GMT-0700 (PDT)',
                           updated_at: 'Mon Sep 07 2015 06:50:06 GMT-0700 (PDT)',
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

 	it('should return a list of plants',function(done){
		request(app)
		.get('/v1/plants')
		.set('Accept', 'application/json')
		.expect('Content-Type',/json/)
        .expect(200, function(err,res) {
			// console.log(res.body.plants[0]);
			demand(err).be.empty();
			demand(res.body).not.be.empty();
			demand(res.body.plants.length).equal(100);
			//get an example record
			demand(res.body.plants[0]).not.be.empty();
			demand(res.body.plants[0].name).not.be.empty();
			demand(res.body.plants[0].scientific_name).not.be.empty();
			done();
		})
   	});

   	it('should return a particular plant',function(done){
   		request(app)
   		.get('/v1/plants/17590')
		.set('Accept', 'application/json')
		.expect('Content-Type',/json/)
        .expect(200, {  	id: 17590,
                           name: 'Agardh lupine',
                           description: null,
                           create_dt: null,
                           user_id: null,
                           zones: null,
                           created_at: 'Mon Sep 07 2015 06:50:06 GMT-0700 (PDT)',
                           updated_at: 'Mon Sep 07 2015 06:50:06 GMT-0700 (PDT)',
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

   	xit('should return a plant based on query',function(done) {
   		request(app)
   		.get('/v1/plants/?name=wattle')
   		.set('Accept','application/json')
   		.expect('Content-Type',/json/)
   		.expect(200)
		.end(function(err,res) {
			console.log(res.body.plants[0]);
			demand(err).be.empty();
			demand(res.body).not.be.empty();
			demand(res.body.plants.length).gte(1);
			//get an example record
			demand(res.body.plants[0]).not.be.empty();
			demand(res.body.plants[0].name).not.be.empty();
			demand(res.body.plants[0].scientific_name).not.be.empty();
			done();
		})
   	})
});
