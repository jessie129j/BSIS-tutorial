//index.js
const http = require("http");

const app = http.createServer((req, res) => {
  if (req.url === "/") {
    html = `hello world`;
  } else {
    return res.writeHead(404);
  }
  res.writeHead(200);
  res.end(html);
});

app.listen(5000, function () {
  console.log("Server listening on port 5000");
});
