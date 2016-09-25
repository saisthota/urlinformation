var rest = require('restify');
var server = rest.createServer();
var http = require('request');

var bodyParser = require('body-parser');
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

/* Set a route for listening request */
server.post('api/fetch', function(req, res, next) {
    var reqURL = req.body.url;

    http(reqURL, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            /* Convert response to String */
            var data = body.toString();

            /* Get Title */
            var title_reg = new RegExp("<title>(.*?)</title>", "i");

            /* Get Description */
            var description_reg = new RegExp('<meta name="description" content="(.*)">');

            var title = data.match(title_reg)[1];
            var description = data.match(description_reg)[1];

            if(description == null) {
                description_reg = new RegExp('<meta content="(.*)" name="description">');
                description = data.match(description_reg)[1];
            }

            console.log(title);
            console.log(description);

            res.send(JSON.stringify({"title": title, "description": description}));
        }
        else {
            console.log("Error! Please try again!!");
        }
    })
});

/* Set Server to listen on PORT 3000 */
server.listen(3000, function() {
    console.log('Listening on port 3000');
});