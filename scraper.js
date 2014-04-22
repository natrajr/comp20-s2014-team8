//scraper.js

var request=require("request");
var cheerio=require("cheerio");

var url= "https://coinmarketcap.com/";

var coinInfo=[];
var coinName;
var coinVal;
var coinSupply;

request(url, function(err, resp, body) {
    if (err) {
       console.log(err);
    }
    else {
      	$ = cheerio.load(body);
       	fillInfo();
    }
});

function fillInfo() {
	
	console.log($("no-wrap currency-name a").text());
}
