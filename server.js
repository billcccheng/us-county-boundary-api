var express = require("express");
var app = express()
var fs = require("fs");

app.get('/api',function(req, res){
	fs.readFile(__dirname + '/states/' + req.query.state + '.json', function(err, data){
		if(err){
//			console.log("No Such State");
			res.send("No such State");
			return;
		}
		console.log(req.query);
		jsonData = JSON.parse(data.toString());
		var response = "No such county";
		for(x in jsonData){
			if(jsonData[x]['County Name'] === req.query.county){
			  var coordinates = getCoordinates(jsonData[x].geometry);
				var countyBoundary = new Object();
				countyBoundary.state = req.query.state;
				countyBoundary.county = req.query.county;
				countyBoundary.shape = coordinates;
				response = countyBoundary;
				break;
			}
		}
		res.setHeader('Content-Type', 'application/json');
		res.json(response);
	}) 	
});

function getCoordinates(data){
	var rawCoordinates = data.split(' ');
	var polishedCoordinates = []
	for(x in rawCoordinates){
    coord = rawCoordinates[x].split(",");
		polishedCoordinates.push(coord.reverse());
	}
	return polishedCoordinates;
}

var server = app.listen(3000, function(){
	var host = server.address().address;
	var port = server.address().port;
	console.log("Listening at http://%s:%s",host,port);
});

