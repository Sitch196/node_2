const { readArticlesFile } = require("../utills/fileHandler");

function readAllArticles(res) {
  const articles = readArticlesFile();
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(articles));
}

module.exports = {
  readAllArticles,
};
