var rest = require('restify');
var server = rest.createServer();
var http = require('request');

var bodyParser = require('body-parser');
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

/* Set a route for listening request */
server.post('api/fetch', function(req, res, next) {
   //res.send(200, JSON.stringify("Response: "+req.body.url));
    http('http://www.github.com/saisthota', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            /* Convert response to String */
            var data = body.toString();

            /* Get Title */
            var title = new RegExp("<title>(.*?)</title>", "i");

            /* Get Description */
            var description = new RegExp('<meta name="description" content="(.*)">');

            console.log(data.match(title)[1]);
            console.log(data.match(description)[1]);
            res.send(JSON.stringify({"title": title}));
        }
        else {
            console.log("Error");
        }
    })
});

/* Set Server to listen on PORT 3000 */
server.listen(3000, function() {
    console.log('Listening on port 3000');
});