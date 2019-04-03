var mongoose = require('mongoose');
var schema= require('./user_schema');
var express = require('express');
var api=express.Router();
var expressValidator = require('express-validator');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
api.use(expressValidator());

const secret = "supersecretkey";
function handleError(err, msg, res){
  console.log(err);
  if(msg == undefined){
      msg = "there was some error at the server";
  }
  return res.json({
      success:false,
      msg: msg,
      err:err
  });
};

 function findByUsername(username,callback){
  console.log(username);
  schema.profile.findOne({email:username},callback);
};

function comparePassword(candidatepassword,password,callback){
  bcrypt.compare(candidatepassword, password, function(err, isMatch){
    if(err)return callback(err, false);
  return callback(null, isMatch);
})
};
function createUser(newUser, callback) {
  bcrypt.hash(newUser.password, 10, function(err, hash){
      if(err)throw err;
      newUser.password = hash;
      newUser.save(newUser, callback);
  });
};



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
     var x = new mongoose.Types.ObjectId(req.params.id);
     console.log(x);
     //check
      schema.profile.findOne(req.params.id,function(err,docs){
        if(err||!docs){
          console.log(err);
        }
        else{
          console.log(docs);
        return res.json({
          
          user:docs,
          success: "true",
          message : "user retrieved"
        });
        
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
    schema.donate.find({bgrp:req.params.bgrp,city:req.params.city,area:req.params.area},function(err,docs){
      if(err||!docs){
        console.log(err);
      }
      else{
      res.json(docs);
      console.log(docs);
      }
    });
  },
  

  login :function(req,res){
     //extracting all the info from request parameters
     var username = req.body.username;
     var password = req.body.password;
     //var captcha = req.body.captcha;
     //console.log(req);
     //checking all the form-data is right
     req.checkBody('username', 'please enter a valid username').isEmail();
     req.checkBody('password', 'please enter a valid password').notEmpty();
     //req.checkBody('captcha', 'Captcha is incorrect').equals(req.session.captcha);
     console.log('login hit');
     //console.log(req.body);
     //getting all the validation errors
     var errors = req.validationErrors();
     if(errors){
         res.send(errors)
     }else{
         //console.log('else called');
         console.log(username, password);
         //checking the user credentials for loggin him in with session
         findByUsername(username, function (err, user) {
             if(err){
                 console.log(err);
                 return handleError(err, null, res);
             }
             console.log(user);
             if(!user){
                 console.log("user with username : " + username + " not found");
                 msg = "user with this username does not exist";
                 return handleError(null, msg, res);
             }
             comparePassword(password, user.password, function (err, isMatch) {
                 if(err){
                     return handleError(err, null, res);
                 }
                 if(!isMatch){
                     return handleError(null, "wrong password", res);
                 }
                 jwt.sign({id: user._id}, secret, function(err, token){
                     if(err)handleError(err, null, res);
                     console.log(token);
                     return res.json({
                       success:"true",
                       message:"login successful",
                       token:token,
                       _id:user._id,
                       user : user,
                     })
                   //return getAllUserDashboardDetails(req, res, user._id, token);
                 })
             });
 
         });
 
 }
  },

  
  signup : function(req,res){
    var name = req.body.name;
    var email = req.body.email;
    var mobile = req.body.contact;
    var city = req.body.city;
    var dob = req.body.dob;
    var password = req.body.password;
    var address = req.body.address;

    //console.log(req.body.name);
    //console.log(name);

    req.checkBody('name', 'Name cannot be empty').notEmpty();
    req.checkBody('email', 'Email cannot be empty').notEmpty();
    req.checkBody('contact', 'contact cannot be empty').notEmpty();
    //req.checkBody('pan', 'Pan cannot be empty').notEmpty();
    //req.checkBody('gstin', 'GSTIN cannot be empty').notEmpty();
    req.checkBody('email', "Enter a valid email").isEmail();
    req.checkBody('password', 'password cannot be empty').notEmpty();


    var errors = req.validationErrors();
    //console.log(errors);

    if(errors){
        //console.log(errors);
        return handleError(errors, null, res);
    }else{
        //console.log('else block called');
        var newUser = new schema.profile({
            name:name,
            email:email,
            contact:mobile,
            city:city,
            dob:dob,
            address:address,
            password:password,
        });

        createUser(newUser, function (err, user) {
          if(err){
              return handleError(err, null, res);
          }else{
              //console.log(user);
              res.json({
                  success:true,
                  msg: 'user created'
              });
          }
      });
    }
  },



  }
