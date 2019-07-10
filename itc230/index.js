const cheeses = require("./lib/data");

const http = require("http");
http.createServer((req, res) => {
    const url = req.url.toLowerCase().split("?");
    const fs = require("fs");
    switch (url[0]) {
        case '/':            
            fs.readFile("public/home.html", (err, data) => {
                if (err) return console.error(err);
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data.toString());
            });
            break; 
        case '/about':
            fs.readFile("public/about.html", (err, data) => {
                if (err) return console.error(err);
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data.toString());
            });
            break;
        case '/detail':
            if(url[1] === undefined) {
                fss.readFile("public/error.html", (err, dat) => {
                    if (err) return console.error(err);
                    res.writeHead(200, {'Constant-Type': 'text/html'});
                    res.end(data.toString());
                });
            } else {
                let params = url[1].split("=");
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end(JSON.stringify(cheeses.getItem(params[1]))
            )
            }
            break;
        case '/delete':
            if(url[1] === undefined) {
                fs.readFile("public/error.html", (err, data) => {
                    if (err) return console.error(err);
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.end(data.toString());
                });
            } else {
                let paramsDelete = url[1].split("=");
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(JSON.stringify(cheeses.getItem(paramsDelete[1])) + ' has been deleted.');
            cheeses.deleteItem(paramsDelete[1]);
            }
                console.log(cheeses.getAll());
            break;
        default:
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404: Page Not Found');
            break;
    }
}).listen(process.env.PORT || 3000);

// const data = require("./lib/data")

// console.log(data.getAll())
// console.log(data.getItem('Cheddar, sharp'));
