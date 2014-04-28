var xml;
var exchangeData={};

function initData() {
	xml= new XMLHttpRequest();
	xml.open("GET", "https://blockchain.info/ticker?cors=true", true);
	xml.send(null);
	xml.onreadystatechange= callback;
}

function callback() {
	if (xml.readyState==4 && xml.status==200) {
		exchangeData=JSON.parse(xml.responseText);
		createTable();
	}
}
function createTable() {
	for (keys in exchangeData) {
		$("#data").append("<tr><td>"+keys+"</td><td>"+exchangeData[keys]["symbol"]+exchangeData[keys]["15m"]+"</td><td>"+exchangeData[keys]["symbol"]+exchangeData[keys]["buy"]+"</td><td>"+exchangeData[keys]["symbol"]+exchangeData[keys]["sell"]+"</td></tr>");	
	}
}