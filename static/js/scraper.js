//scraper.js

var request=require("request");
var cheerio=require("cheerio");

var url= "http://www.cryptoarticles.com/";

//var coinInfo=[];
//var coinName;
//var coinVal;
//var coinSupply;

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
	//console.log($("div.summary-title.a").text());
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
	console.log(parsedResults);
}