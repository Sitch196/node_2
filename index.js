const http = require("http");
const { logRequest } = require("./utills/logger");

const server = http.createServer((req, res) => {
  logRequest(req);
  res.end("Jello");
});

const PORT = 4400;
const HOSTNAME = "127.0.0.1";

server.listen(PORT, () => {
  console.log(`Server running on http://${HOSTNAME}:${PORT}`);
});
