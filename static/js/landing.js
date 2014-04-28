var xml;
var currencyData={};

function initData() {
	if (localStorage.length==0) {
		xml= new XMLHttpRequest();
		xml.open("GET", "http://api.coindesk.com/v1/bpi/currentprice.json", true);
		xml.send(null);
		xml.onreadystatechange= callback;
	}
	else {
		for (keys in localStorage) {
			$("#BPI-list").append("<strong><li>"+keys+localStorage[keys]+"</li></strong>");
		}
	}
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
		localStorage[currencyData["bpi"][keys]["symbol"]]=currencyData["bpi"][keys]["rate_float"];
	}
}

