var xml;
var marketData={};

function initData() {
    xml= new XMLHttpRequest();
    xml.open("GET", "http://api.coindesk.com/v1/bpi/historical/close.json", true);
    xml.send(null);
    xml.onreadystatechange= callback;
}
function callback() {
    if (xml.readyState==4 && xml.status==200) {
        marketData=JSON.parse(xml.responseText);
        initGraph();
    }
}

function initGraph() {
    var dates=[];

    for (keys in marketData[keys]) {
        dates=marketData[keys];
    }
    console.log(dates);
    //google.load("visualization", "1", {packages:["corechart"]});
    //google.setOnLoadCallback(drawChart);
}