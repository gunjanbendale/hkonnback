var mongoose = require('mongoose');
Schema = mongoose.Schema;
mongoose.connect("mongodb://healthkonn_admin:healthkonn_1@ds239055.mlab.com:39055/healthkonn",{useNewUrlParser:true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("db connected");
});

let bookappt = new Schema({
  userId : mongoose.Schema.Types.ObjectId,
  city : String,
  Hospital : String,
  patName : String,
  docName : String,
  docId : mongoose.Schema.Types.ObjectId,
  dateCurr : String,
  apptDate : String,
  apptTime : String,
});

let userprofile = new Schema({
  _id : mongoose.Schema.Types.ObjectId,
  name : String,
  city : String,
  dob : String,
  password : String, 
  address : String, 
  email : String,
  contact : Number,
});

let donateblood = new Schema({
  _id : mongoose.Schema.Types.ObjectId,
  name : String,
  city : String,
  brgp : String,
  age : Number,
  weight : Number,
  height : Number,
  lastdonated : String,
});

var bookanappt = mongoose.model('bookappt',bookappt);
var profile = mongoose.model('userprofile', userprofile);
var donate = mongoose.model('donateblood',donateblood);

module.exports = {bookanappt,profile,donate};