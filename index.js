var rest = require('restify');
var server = rest.createServer();
var http = require('request');

var bodyParser = require('body-parser');
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

/* Set a route for listening request */
server.post('api/fetch', function(req, res, next) {
   //res.send(200, JSON.stringify("Response: "+req.body.url));
    http('http://www.google.com', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body) // Show the HTML for the Google homepage.
        }
    })
});

/* Set Server to listen on PORT 3000 */
server.listen(3000, function() {
    console.log('Listening on port 3000');
});