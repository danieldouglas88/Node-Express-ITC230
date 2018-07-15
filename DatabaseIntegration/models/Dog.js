var mongoose = require('mongoose');

// remote db connection settings. For security, connectionString should be in a separate file not committed to git
var connectionString = 'mongodb://mongodbdaniel:Qazxsw!123@ds137651.mlab.com:37651/dogsnodejs'
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