var mongoose = require('mongoose');
var schema= require('./user_schema');

module.exports = {
   
  apptbook : function(req,res){
        let bookappt = new schema.bookanappt(req.body);
        bookappt.save()
      .then(doc => {
        res.send("inserted");
        console.log(doc);
      })
      .catch(err => {
        console.log(err)
      });
    },
   
   userprofile: function(req,res){
      schema.profile.find({_id:req.params.id},function(err,docs){
        if(err||!docs){
          console.log(err);
        }
        else{
        res.json(docs);
        console.log(docs);
        }
      });
    },

  donateblood : function(req,res){
      let donatebl = new schema.donate(req.body);
      donatebl.save()
    .then(doc => {
      res.send("inserted");
      console.log(doc);
    })
    .catch(err => {
      console.log(err)
    });
  },
  searchbank: function(req,res){
    schema.donate.find({bgrp:req.params.bgrp,city:req.params.city},function(err,docs){
      if(err||!docs){
        console.log(err);
      }
      else{
      res.json(docs);
      console.log(docs);
      }
    });
  },

  
}