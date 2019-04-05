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
 
router.get('/notification',function(req,res,next){

    var FCM = require('fcm-push');
    var serverkey = 'AAAA087ZYvU:APA91bEvPsMeTClENDlUTwgjx8WHeAtSFQmrnPTjSRd7rpDSXuXNFFW3OiGwPnSiRXMdbyjIXT76Ls-M3EPDY_RyC8vqBiL-3J5uz5ZtstjlkkysJg6-daVhWOmmjyndOuZ5c5_FI7wb';  
    var fcm = new FCM(serverkey);
    var message ={  
        to : 'en-RN0-Gyxo:APA91bGELAy6_wvZ7rERgHs-mU9alkvEyY4tRIX_NrPygv2Tfz86nslxcxTD4wSG2UyJ_c1jHeZFOtGqARelqCelQ3bG75NFCtcU261UbD1ku-x-QSXGcWa0vzKI5Dm3qZhqSG52NDWq',
        // collapse_key : '<insert-collapse-key>',
        // data : {
        //     <random-data-key1> : '<random-data-value1>',
        //     <random-data-key2> : '<random-data-value2>'
        // },
        notification : {
            title : 'Appointment',
            body : 'Doctor ki taraf se haan hai'
        }
    };
    fcm.send(message, function(err,response){  
          if(err) {
            console.log("Something has gone wrong !");
        } else {
            console.log("Successfully sent with resposne :",response);
            res.status(200).json({success:true,msg:"NOtification Sent Successfully"});
        }
    });
    });
router.post('/bookappt',controller.apptbook); //book an appointment
router.post('/donateblood',controller.donateblood); //user wants to donate blood
router.post('/searchbank',controller.searchbank); //user searches for blood bank nearby
router.post('/profile',controller.userprofile);  //get user profile
router.post('/login',controller.login);     //Login
router.post('/signup',controller.signup);       // Signup new user
router.post('/appthistory',controller.apptHistory);     // View All Appointments 

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
