var express = require('express');
var app = express();
bodyParser = require('body-parser');
ejs = require('ejs');
app.use(bodyParser());
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.use('/static', express.static(__dirname + '/static'));

//MongoDB
var mongo = require('mongodb');

var mongoUri = process.env.MONGOLAB_URI ||
	process.env.MONGOHQ_URL ||
	'mongodb://localhost/crypto';

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
		mongo.Db.connect(mongoUri, function(error, db){
			db.collection('news', function(err,collection){
				collection.find().toArray(function(err, items){
					if(!err){
						var i = 0;
						//database empty
						if (items.length == 0){
								i = parsedResults.length - 1;
						}
						else{
							while (i < parsedResults.length){
								//loop until first entry in database found (most recent in database)
								if (parsedResults[i].title == items[items.length-1]["title"]){
									i--;
									break;
								}
								i++;
							}
							if (i == parsedResults.length){i--;}
						}
						//loop backwards, adding oldest unentered article to database and
						//adding each more recent entry too
						while (i >= 0){
							var record = {
								"title" : parsedResults[i].title,
								"url"   : parsedResults[i].url
							};
							collection.insert(record, {safe:true},function(err,records){});
							i--;
						}
					}
					else{};
				});
			});
		});
		mongo.Db.connect(mongoUri, function(error, db){
			db.collection('news', function(err,collection){
				collection.find().toArray(function(err, items){
					newItems = items.reverse();
					response.render('news.ejs',{newsItems: newItems});
				});
			});
		});
	};
});

var port = Number(process.env.PORT || 3000);

app.listen(port);