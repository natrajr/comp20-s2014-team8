//powered by coindesk
var xml;
var marketData={};
var xmlSpec;
var rangeData={};
var urlParam;
var startDate;
var endDate;

function specData() {
    if ($("#startDate").val()!="" && $("#endDate").val()!="") {
        document.getElementById("dateForm").submit();
        urlParam="http://api.coindesk.com/v1/bpi/historical/close.json?start="+startDate+"&end="+endDate;
        xmlSpec=new XMLHttpRequest();
        xmlSpec.open("GET", urlParam, true);
        xmlSpec.send(null);
        xmlSpec.onreadystatechange=rangeCallback();
    }
}

function rangeCallback() {
    if (xmlSpec.readyState==4 && xmlSpec.status==200) {
        rangeData=JSON.parse(xmlSpec.responseText);
        rangeGraph();
    } 
}
function rangeGraph() {
    var dates=[["Date", "Price"]];
    var count=1;
    for (var key in rangeData["bpi"]) {
        dates[count]=new Array(key, rangeData["bpi"][key]);
        count++;
    }
    google.load("visualization", "1", {packages: ["corechart"],callback: drawChart});

    function drawChart() {
        var data=google.visualization.arrayToDataTable(dates);
        
        var options= {
            title: "Bitcoin Price Index",
            curveType: "function"
        };
        var chart = new google.visualization.LineChart(document.getElementById('chart'));
        chart.draw(data, options);
    }
}
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
    var dates=[["Date", "Price"]];
    var count=1;
    for (var key in marketData["bpi"]) {
        dates[count]=new Array(key, marketData["bpi"][key]);
        count++;
    }
    google.load("visualization", "1", {packages: ["corechart"],callback: drawChart});

    function drawChart() {
        var data=google.visualization.arrayToDataTable(dates);
        
        var options= {
            title: "Bitcoin Price Index",
            curveType: "function"
        };
        var chart = new google.visualization.LineChart(document.getElementById('chart'));
        chart.draw(data, options);
    }
}
function getStart() {
    if ($("#startDate").val()!="") {
        startDate=$("#startDate").val();
    }
}
function getEnd() {
    if ($("#endDate").val()!="") {
        endDate=$("#endDate").val();
    }
}