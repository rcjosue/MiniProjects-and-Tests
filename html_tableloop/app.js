const http = require("http");
const nunjucks = require("nunjucks");
const { buildNunjucksTest } = require("./emails-connections");

const hostname = "127.0.0.1";
const port = 3000;

const htmlString = buildNunjucksTest({ var1: "test" });

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.end(htmlString);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
