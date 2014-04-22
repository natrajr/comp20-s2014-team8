var express = require('express');
var app = express();
//app.use(express.json());
//app.use(express.urlencoded());
bodyParser = require('body-parser');
app.use(bodyParser());
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.use('/static', express.static(__dirname + '/static'));

app.get('/', function(request,response){
	response.render('landing.html');
})

app.get('/currency', function(request,response){
	response.render('currency.html');
});

app.get('/market', function(request,response){
	response.render('market.html');
});

app.get('/news', function(request,response){
	response.render('news.html');
});

//MongoDB
var mongo = require('mongodb');

var mongoUri = process.env.MONGOLAB_URI ||
	process.env.MONGOHQ_URL ||
	'mongodb://localhost/2048';

var port = Number(process.env.PORT || 3000);

app.listen(port);