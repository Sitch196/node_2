const {
  readArticlesFile,
  writeArticlesFile,
} = require("../utills/fileHandler");
const { validateArticle } = require("../utills/validator");

function generateId() {
  return Date.now().toString();
}

function readAllArticles(res) {
  const articles = readArticlesFile();
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(articles));
}

function createArticle(articleData, res) {
  if (!validateArticle(articleData)) {
    res.writeHead(400, { "Content-Type": "application/json" });
    return res.end(
      JSON.stringify({ code: 400, message: "Invalid article data" })
    );
  }

  const articles = readArticlesFile();
  const newArticle = {
    ...articleData,
    id: generateId(),
    date: new Date().toISOString(),
    comments: [],
  };

  articles.push(newArticle);
  writeArticlesFile(articles);

  res.writeHead(201, { "Content-Type": "application/json" });
  res.end(JSON.stringify(newArticle));
}
module.exports = {
  readAllArticles,
  createArticle,
};
