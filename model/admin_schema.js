var mongoose = require('mongoose');
Schema = mongoose.Schema;
mongoose.connect("mongodb://healthkonn_admin:healthkonn_1@ds239055.mlab.com:39055/healthkonn",{useNewUrlParser:true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("db connected");
});

let doctor = new Schema({
    hospID : mongoose.Schema.Types.ObjectId,
    docID : mongoose.Schema.Types.ObjectId,
    city : String,
    docName : String,
    qualif : String,
    dob : String,
    dateofjoin : String,
    pan : String ,
    email : String,
    phone : Number
});

var doct = mongoose.model('doctor',doctor);
module.exports = {doct};