var rest = require('restify');
var server = rest.createServer();

var bodyParser = require('body-parser');
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

/* Set a route for listening request */
server.post('api/fetch', function(req, res, next) {
   res.send(200, JSON.stringify("Response: "+req.body.url));
});


/* Set Server to listen on PORT 3000 */
server.listen(3000, function() {
    console.log('Listening on port 3000');
});