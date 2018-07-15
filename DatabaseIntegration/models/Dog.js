var mongoose = require('mongoose');

var connectionString = ''; //see Canvas for value
mongoose.connect(connectionString, { useNewUrlParser: true });

// local db connection settings 
// var ip = process.env.ip || '127.0.0.1';
// mongoose.connect('mongodb://' +ip+ '/<DB_NAME>');

var conn = mongoose.connection; 
conn.on('error', console.error.bind(console, 'connection error:'));

// define Dog model in JSON key/value pairs
// values indicate the data type of each key
var dogSchema = mongoose.Schema({
 title: { type: String, required: true },
 color: String,
 local: Boolean
}); 

module.exports = mongoose.model('Dog', dogSchema);
