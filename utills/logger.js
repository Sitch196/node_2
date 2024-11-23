const fs = require("fs");
const path = require("path");

function logRequest(req) {
  const logEntry = `${new Date().toISOString()} | ${req.method} | ${req.url}\n`;
  const logPath = path.join(__dirname, "..", "server.log");
  fs.appendFileSync(logPath, logEntry);
}

module.exports = { logRequest };
