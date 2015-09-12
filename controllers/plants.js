"use strict";

var pg = require('pg');
var conString = process.env.DATABASE_URL || 'postgres://localhost:5432/flowerthing_dev';
var MAX_RESULTS = 100;


exports.index = {
  json: function getJson(req,res) {
    pg.connect(conString,function(err,client,done){
      if(err) {
        return res.status(500).json({ error:err });
      }
      var plants = [];

      var query = client.query('SELECT * from PLANTS order by name ASC limit ' + MAX_RESULTS);
      query.on('row', function(row) {
        plants.push(row);
      });

      query.on('end',function(){
        done(); //release to pool
        var results = { plants: plants };
        // console.log(results);
        return res.status(200).json(results);
      })
    })
  }
}



    
exports.getById = {
  json: function getJson(id,res) {
    pg.connect(conString,function(err,client,done) {            //connect to the database
      if(err) {
        return res.status(500).json({ error:err });
      }

      var query = query = client.query('SELECT * from PLANTS where id=$1 order by name ASC limit ' + MAX_RESULTS,[id]);
      var result = []
      query.on('row', function(row) {
        result.push(row);                                       //as each row is emitted, add it to result array
      });

      query.on('end',function(){
        done(); //release to pool
        return res.status(200).json(result[0]);                 //return the result (there should be only one!)
      })
    })
  }
}




