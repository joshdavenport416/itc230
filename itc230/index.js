const http = require("http");
http.createServer((req, res) => {
    const path = req.url.toLowerCase();
    const fs = require("fs");
    switch (path) {
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
        case '/contact':
            fs.readFile("public/contact.html", (err, data) => {
                if (err) return console.error(err);
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data.toString());
            });
            break;
        default:
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404: Page Not Found');
            break;
    }
}).listen(process.env.PORT || 3000);


