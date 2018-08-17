const http = require('http'); 
var fs = require('fs'); 
const hostname = '127.0.0.1'; 
const port = 3000; 

const server = http.createServer((req, res) => { 
    if (req.method == 'GET') handleGet(req, res); 
    else handlePost(req, res); 

}); 

function handlePost(req, res){ 
    var body = ''; 
    req.on('data', function(data){ 
        body +=data; 
        console.log('partial body: ' + body); 
    }); 
    req.on('end', function(){ 
        console.log("body: " + body) 
    }); 
} 

function handleGet(req, res){ 
    var fpath ='./RegistrationFormWithTransitions.html'; 
    fs.readFile(fpath, function(error,content){ 
    if(!error){ 
        res.statusCode = 200; 
        res.setHeader('Content-type', 'text.html'); 
        res.end(content); 
    } 
    }); 
    } 

server.listen(port, hostname, () => { 
    console.log('Server running at http://${hostname}:${port}/');
});
    less than a minute ago

