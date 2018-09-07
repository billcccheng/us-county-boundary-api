let express = require("express");
let app = express()
let fs = require("fs");
let allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.send(200);
  } else {
    next();
  }
};

app.use(allowCrossDomain);

app.get('/api',function(req, res){
  fs.readFile(__dirname + '/states/' + req.query.state + '.json', function(err, data){
    if(err){
      res.send("No such State");
      return;
    }
    console.log(req.query);
    jsonData = JSON.parse(data.toString());
    let response = "No such county";
    for(x in jsonData){
      if(jsonData[x]['County Name'] === req.query.county){
        let coordinates = getCoordinates(jsonData[x].geometry);
        let countyBoundary = new Object();
        countyBoundary.state = req.query.state;
        countyBoundary.county = req.query.county;
        countyBoundary.shape = coordinates;
        response = countyBoundary;
        break;
      }
    }
    res.setHeader('Content-Type', 'application/json');
    res.json(response);
  });
});

function getCoordinates(data){
  let rawCoordinates = data.split(' ');
  let polishedCoordinates = []
  for(x in rawCoordinates){
    coord = rawCoordinates[x].split(",");
    polishedCoordinates.push(coord.reverse());
  }
  return polishedCoordinates;
}

let server = app.listen(process.env.PORT || 8080, function(){
  let port = server.address().port;
  console.log("App running on port %s ",port);
});

