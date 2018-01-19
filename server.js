var fs = require('fs');
var data = fs.readFileSync('prices.json', 'utf8');

var prices = JSON.parse(data);
var bodyparser = require('body-parser');

//test
//console.log(prices);


var express = require('express');
var app = express();
var port = 3000;

//launch server, provide confirmation
var server = app.listen(port, function(){
    console.log('Server listening on port ' + port) ;
});

//var html = '<h2>Prices</h2><p>' + JSON.stringify(prices) + '</p>';

app.use(express.static('website'));
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

app.get('/', function(req,res){
    //res.write(data);
    res.write('hello');
});