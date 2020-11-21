const http = require("http");
const fs = require("fs").promises;

const host = "localhost";
const port = 8000;

const requestListener = function (req, res) {
  console.log(req.url);
  let fileToServe;
  if (req.url === "/") {
    fileToServe = __dirname + "/index.html";
  } else {
    fileToServe = __dirname + req.url;
  }
  fs.readFile(fileToServe).then((contents) => {
    if (fileToServe.endsWith(".html")) {
      res.setHeader("Content-Type", "text/html");
    } else {
      res.setHeader("Content-Type", "application/javascript");
    }
    res.writeHead(200);
    res.end(contents);
  });
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
