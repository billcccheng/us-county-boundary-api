var express = require("express");
var app = express()
var fs = require("fs");
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};

app.configure(function () {
  app.use(express.bodyParser());
  app.use(allowCrossDomain);
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

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

var server = app.listen(process.env.PORT||8080, function(){
//	var host = server.address().address;
	var port = server.address().port;
	console.log("App running on port %s ",port);
});

