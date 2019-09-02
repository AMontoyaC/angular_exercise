var express = require('express');
var app = express();
var mongoose = require('mongoose');
var port = process.env.PORT || 8080;
var database = require('./config/database');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

mongoose.connect(database.localUrl); 
var db = mongoose.connection;
db.once('open', function() {
    console.log("Connection Successful!");
    
    var UserSchema = mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        }
    });
    
    var User = mongoose.model('User', UserSchema);
    var user1 = new User({ name: 'John Smith', username: 'john_smith', status: 'active' });
    var user2 = new User({ name: 'Nick Doe', username: 'nick_doe', status: 'inactive' });
    var user3 = new User({ name: 'Samantha Johnson', username: 'samantha_johnson', status: 'inactive' });
    var user4 = new User({ name: 'Alicia Clark', username: 'alicia_clark', status: 'active' });
    var user5 = new User({ name: 'Andrea Montoya', username: 'andrea_montoya', status: 'active' });
 
    user1.save(function (err, user) {
      if (err) return console.error(err);      
    });
    user2.save(function (err, user) {
        if (err) return console.error(err);      
      });
    user3.save(function (err, user) {
        if (err) return console.error(err);      
    });
    user4.save(function (err, user) {
        if (err) return console.error(err);      
    });
    user5.save(function (err, user) {
        if (err) return console.error(err);      
    });    
});

app.use(express.static('./public')); 
app.use(morgan('dev')); 
app.use(bodyParser.urlencoded({'extended': 'true'})); 
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride('X-HTTP-Method-Override'));

require('./app/routes.js')(app);

app.listen(port);
console.log("App listening on port " + port);
