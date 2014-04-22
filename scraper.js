//scraper.js

var request=require("request");
var cheerio=require("cheerio");

var url= "http://www.cryptocurrencychart.com/";

request(url, function(err, resp, body) {
        if (err) {
            console.log(err);
        }
        else {
        	$ = cheerio.load(body);
        }
    });