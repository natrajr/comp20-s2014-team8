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
	console.log($(".summary-title a").text());
}