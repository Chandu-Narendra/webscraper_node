var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/', function(req, res){
  console.log("Data")
});

app.get('/scrape', function(req, res){
  url = 'https://www.99acres.com/property-in-hyderabad-ffid';

  request(url, function(error, response, html){
    if(!error){
      var $ = cheerio.load(html);
      var json = [];

      $('.srpTuple__tupleTable').filter(function(){
        var data = $(this);
        let propData = {  property_name : "", property_type : "", price : ""}
        console.log("chandu test",data.children().children().next().next().children().first().text())
        property_name = data.children().children().next().first().text().trim();
        property_type = data.children().children().first().text().trim();
        price = data.children().children().next().next().children().first().text();

        propData.property_name = property_name;
        propData.property_type = property_type;
        propData.price = price;
        json.push(propData)
      })

    }

    fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
      console.log('File successfully written! - Check your project directory for the output.json file');
    })

    res.send('Check your console!')
  })
})

app.listen('4500')
console.log('Server running on port 4500. Browse http://localhost:4500/scrape');
exports = module.exports = app;
