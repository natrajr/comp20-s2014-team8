var request=require("request");
var cheerio=require("cheerio");
var mongo=require("mongodb");
var mongoUri = process.env.MONGOLAB_URI ||
	process.env.MONGOHQ_URL ||
	'mongodb://localhost/crypto';
var url= "http://www.cryptoarticles.com/crypto-news/?month=april-2014";
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

	$('h1.entry-title').each(function(i,element){
		var a = $(this);
		var title = a.text();
		title = title.replace(/(\r\n|\n|\r)/gm,"").trim();
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
							if (parsedResults[i].title == items[items.length - 1]["title"]){
								i--;
								break;
							}
							i++;
						}
						if (i == parsedResults.length){i--;}
					}

					//loop backwards, adding oldest unentered article to database and
					//adding each more recent entry too
					while (i>=0){
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
};