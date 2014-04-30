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
    }
}

function initGraph() {
    var dates=[];
    var count=0;
    for (var key in marketData["bpi"]) {
        dates[count]=new Array(key, marketData["bpi"][key]);
        count++;
    }

    google.load("visualization", "1", {packages: ["corechart"],callback: drawChart});

    function drawChart() {
        var data=google.visualization.arrayToDataTable([["Date", "Price"], ['2004', 1000],
          ['2005', 1170],
          ['2006', 660],
          ['2007',  1030]]);
        
        var options= {
            title: "Bitcoin Price Index"
        };
        var chart = new google.visualization.LineChart(document.getElementById('chart'));
        chart.draw(data, options);
    }
}