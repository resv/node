const http = require('http');
var fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
	if (req.method == 'GET') handleGet(req, res); 
		else handlePost(req,res);
});

function handlePost(req, res) {
	var body = '';
    req.on('data', function (data) {
      body += data;
      console.log("Body: " + body);
    });
	req.on('end', function () {
	  var snippet = '<h1>Thank you, {userId}, for registering with us!</h1>';
	  var userId= extractUserId(body);
	  if (userId != 'Jimmy') {
		  snippet = snippet.replace('{userId}', extractUserId(body));
		  res.statusCode = 200;
		  res.setHeader('Content-Type', 'text/plain');
		  res.end(snippet);
		}
		else {
			res.statusCode = 403;
			res.end('User not allowed.');
		}
    });
}

function extractUserId(body) {
	body = decodeURI(body);
	var nvPairs = body.split('&');
	for(var i=0;i<nvPairs.length;++i) {
		if (nvPairs[i].startsWith('userId')) {
			return nvPairs[i].split('=')[1];
		}
	}
}

function handleGet(req, res) {
  var fpath = './RegistrationFormWithTransitions.html';
  fs.readFile(fpath, function(error, content) {
    if (!error) {
    	res.statusCode = 200;
    	res.setHeader('Content-Type', 'text/html');
    	res.end(content);
    }
  });
}

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});