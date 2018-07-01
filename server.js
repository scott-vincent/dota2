var readline = require('readline');
var fs = require('fs');
var http = require('http');

var heroes = [];

function startServer() {
    http.createServer(function (request, response) {
        response.writeHead(200, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        });
        response.end(JSON.stringify(heroes));
    }).listen(8080);

    console.log("Server running on port 8080");
}

function init(filename) {
    var rl = readline.createInterface({
        input: fs.createReadStream(filename)
    });

    rl.on("line", function (line) {
        if (line.length > 0 && line.charAt(0) !== "," && !line.startsWith("7.13b") && !line.startsWith("AVERAGE")) {
            var cols = line.split(",");
            var hero = {
                name: cols[0],
                attr: cols[1],
                str: cols[3]
            };
            heroes.push(hero);
        }
    });

    rl.on("close", function () {
        console.log("Found " + heroes.length + " heroes");
        startServer();
    });
}

init("stats.csv");
