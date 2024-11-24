const http = require("http");
const { initArticlesFile } = require("./utills/fileHandler");
const { logRequest } = require("./utills/logger");
const { handleRoute } = require("./routes");

const server = http.createServer((req, res) => {
  logRequest(req);
  handleRoute(req, res);
});

const PORT = 4400;
const HOSTNAME = "127.0.0.1";
initArticlesFile();

server.listen(PORT, () => {
  console.log(`Server running on http://${HOSTNAME}:${PORT}`);
});
