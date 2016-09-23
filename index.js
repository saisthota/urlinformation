var rest = require('restify');
var server = rest.createServer();

server.listen(3000, function() {
    console.log('Listening on port 3000');
});