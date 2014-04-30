var xml;
var currencyData={};

function initData() {
	xml= new XMLHttpRequest();
	xml.open("GET", "http://api.coindesk.com/v1/bpi/currentprice.json", true);
	xml.send(null);
	xml.onreadystatechange= callback;
}
function callback() {
	if (xml.readyState==4 && xml.status==200) {
		currencyData=JSON.parse(xml.responseText);
		displayBPI();
	}
}
	
function displayBPI() {
	for (var keys in currencyData["bpi"]) {
		$("#BPI-list").append("<strong><li>"+currencyData["bpi"][keys]["symbol"]+currencyData["bpi"][keys]["rate_float"]+ "</li></strong>");
	}
}

