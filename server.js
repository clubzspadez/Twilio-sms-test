var http = require('http');
var fs = require('fs');
var formidable = require("formidable");
var util = require('util');
var port=Number(process.env.PORT || 3000)

var server = http.createServer(function (req, res) {
    if (req.method.toLowerCase() == 'get') {
        displayForm(res);
    } else if (req.method.toLowerCase() == 'post') {
        processAllFieldsOfTheForm(req, res);
    }

});

function displayForm(res) {
    fs.readFile('form.html', function (err, data) {
        res.writeHead(200, {
            'Content-Type': 'text/html',
                'Content-Length': data.length
        });
        res.write(data);
        res.end();

    });
}

function processAllFieldsOfTheForm(req, res) {
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {
        //Store the data from the fields in your data store.
        //The data store could be a file or database or any other store based
        //on your application.
        res.writeHead(200, {
            'content-type': 'text/plain'
        });
        res.write('Your message has been sent:\n\n');
        res.end(util.inspect({
            fields: fields,
            files: files
        }));
        sendMessage(fields.name, fields.number, fields.message);
        // sendMessage();
    });

}


var client = require('twilio')(
  '___ENV', '_____ENV'
);

function sendMessage(name, number, message){
  client.messages.create({
    from: '+15087446008',
    to: 1 + number,
    body:  name + " is sending a message. Message : " + message
  }, function(err, message) {
    if(err) {
      console.error(err.message);
    }
  });
};



server.listen(port);
console.log("server listening on " + port);
