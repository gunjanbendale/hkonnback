var express = require('express');
var router = express.Router();
var expressValidator = require('express-validator');
router.use(expressValidator())
var controller = require('../model/controller_user');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const secret = "supersecretkey";
/* GET home page. */
router.get('/',isAuthenticated, function(req, res, next) {
  console.log(res.locals);
  var x = res.locals.userId;
  console.log(x);
  res.json({
    success:"true",
    id : x,
    message : "successful",
    })
});
 

router.post('/bookappt',controller.apptbook); //book an appointment
router.post('/donateblood',controller.donateblood); //user wants to donate blood
router.post('/searchbank',controller.searchbank); //user searches for blood bank nearby
router.post('/profile',controller.userprofile);  //get user profile
router.post('/login',controller.login);
router.post('/signup',controller.signup);

function isAuthenticated(req, res, next){
  if(req.headers['authorization']){
      jwt.verify(req.headers['authorization'], secret, function(err, decoded){
          if(err){
              console.log(err);
              return handleError(err, null, res);
          }
          res.locals.userId = decoded.id;
          console.log("calling next now and " + res.locals.userId);
          return next();
      })
  }else{
      res.json({
          success:false,
          auth:false,
          msg:"authentication unsuccessful, please login again"
      });
  }
}



module.exports = router;
