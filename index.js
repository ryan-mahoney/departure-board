"use strict";
const port = 3000;
const http = require('http');
const csv = require('./csv.js');
const render = require('./render.js');

// universal request handler
const requestHandler = (request, response) => {

    // only respond to root
    if (request.url != '/') {
        response.writeHead(404, { "Content-Type": "text/plain" });
        response.end("File not found.");
        return;
    }

    // read external departure csv data
    http.get({host: 'developer.mbta.com', path: '/lib/gtrtfs/Departures.csv'}).
        on('response', (file) => {
            let body = '';
            file.on('data', (chunk) => {
                body += chunk;
            });
            file.on('end', () => {

                const lines = body.trim().split('\r\n');
                const header = lines.shift().split(',');
                const data = lines.map((line) => (csv(line, header)));

                response.end(render(data));
            });
        }).
        on('error', (e) => {
            response.writeHead(500, { "Content-Type": "text/plain" });
            response.end("Can not read data.");
        });
};

// run the server
const server = http.createServer(requestHandler);
server.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err);
    }
    console.log(`server is listening on ${port}`);
});
