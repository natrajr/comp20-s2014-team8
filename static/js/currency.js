var xml;
var exchangeData={};
var xml;
var currencyData= {};


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
		initData2();
	}
}
function createTable() {
	for (keys in exchangeData) {
		$("#data").append("<tr><td>"+keys+"</td><td>"+exchangeData[keys]["symbol"]+exchangeData[keys]["15m"].toFixed(6)+"</td><td>"+exchangeData[keys]["symbol"]+exchangeData[keys]["buy"].toFixed(6)+"</td><td>"+exchangeData[keys]["symbol"]+exchangeData[keys]["sell"].toFixed(6)+"</td></tr>");	
	}
}

function initData2() {
	if (localStorage.getItem("data")===null || (new Date().getTime() - JSON.parse(localStorage.getItem("data"))["time"]) > 600000){
		xml= new XMLHttpRequest();
		xml.open("GET", "http://www.cryptocoincharts.info/v2/api/listCoins", true);
		xml.send(null);
		xml.onreadystatechange= callback2;
	}
	else {
		currencyData = JSON.parse(localStorage.getItem("data"))["data"];
		fillDropDown();
	}
}


function callback2() {
	if (xml.readyState==4 && xml.status==200) {
		currencyData=JSON.parse(xml.responseText);
		fillDropDown();
		
		localStorage.setItem("data",JSON.stringify({"data":currencyData,"time":new Date().getTime()}));
	}
	else {
	}
}

function fillDropDown() {
	for (var i=0; i<currencyData.length; i++) {
		$("#currencyList").append("<option>"+currencyData[i]["name"]+"</option>");
	}
	$("#currencyList").val('Bitcoin');
	displayData();
}

function displayData() {
	var coinPrice=0;
	var coinVolume=0;

	$("#currencyList").change(function() {
		var coinName=$(this).find("option:selected").text();
		$("#detailSection").text("The Details for "+ coinName+":");
		for (var i=0; i<currencyData.length; i++) {
			if (coinName==currencyData[i]["name"]) {
				coinPrice=currencyData[i]["price_btc"];
				coinVolume=currencyData[i]["volume_btc"];
			}
		}
		var newData = "";
		for (keys in exchangeData) {
			newData+="<tr><td>"+keys+"</td><td>"+exchangeData[keys]["symbol"]+(exchangeData[keys]["15m"]*coinPrice).toFixed(6)+"</td><td>"+exchangeData[keys]["symbol"]+(exchangeData[keys]["buy"]*coinPrice).toFixed(6)+"</td><td>"+exchangeData[keys]["symbol"]+(exchangeData[keys]["sell"]*coinPrice).toFixed(6)+"</td></tr>";	
		}
		$("#data").html(newData);
	});
}