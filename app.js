var express = require('express');
var app = express();
bodyParser = require('body-parser');
ejs = require('ejs');
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
	var request=require("request");
	var cheerio=require("cheerio");
	var url= "http://www.cryptoarticles.com/";
	request(url, function(err, resp, body) {
	    if (err) {
	       console.log(err);
	    }
	    else {
	      	$ = cheerio.load(body);
	       	getNews();
	    }
	});

	function getNews() {
		var parsedResults = [];

		$('div.summary-title').each(function(i,element){
			var a = $(this);
			var title = a.text();
			var url = a.find("a").attr('href');
			var metadata = {
				title:title,
				url:url
			};
			parsedResults.push(metadata);
		});
		response.render('news.ejs', {newsItems: parsedResults});
	}
});

//MongoDB
var mongo = require('mongodb');

var mongoUri = process.env.MONGOLAB_URI ||
	process.env.MONGOHQ_URL ||
	'mongodb://localhost/2048';

var port = Number(process.env.PORT || 3000);

app.listen(port);