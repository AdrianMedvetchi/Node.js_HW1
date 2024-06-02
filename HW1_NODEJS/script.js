const http = require('http');

const pageViews = {
    '/': 0,
    '/about': 0,
    'Main Page': 0,
    'About': 0
};

const pageTemplate = (title, link, linkText) => `
<!DOCTYPE html>
<html>
    <head>
        <title>${title}</title>
    </head>
    <body>
        <h1>${title}</h1>
        <p>Просмотры: ${pageViews[title]}</p>
        <a href="${link}">${linkText}</a>
    </body>
</html>
`;

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        pageViews['Main Page']++;
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(pageTemplate('Main Page', '/about', 'See about'));
    }
    else if (req.url === '/about') {
        pageViews['About']++;
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(pageTemplate('About', '/', 'Go to main page'));
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`<h1>Error 404</h1>`);
    }
});

const port = 3000;

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

console.log(pageViews);