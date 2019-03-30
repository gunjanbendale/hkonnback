var express = require('express');
var router = express.Router();

var controller = require('../model/controller_user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
 
router.post('/bookappt',controller.apptbook); //book an appointment
router.post('/donateblood',controller.donateblood); //user wants to donate blood
router.post('/searchbank',controller.searchbank); //user searches for blood bank nearby
router.get('/profile',controller.userprofile);  //get user profile




module.exports = router;
