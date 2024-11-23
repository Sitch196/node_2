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

function readArticle(id, res) {
  const articles = readArticlesFile();
  const article = articles.find((a) => a.id === id);

  if (article) {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(article));
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ code: 404, message: "Article not found" }));
  }
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

function updateArticle(id, updatedData, res) {
  if (!validateArticle(updatedData)) {
    res.writeHead(400, { "Content-Type": "application/json" });
    return res.end(
      JSON.stringify({ code: 400, message: "Invalid article data" })
    );
  }

  const articles = readArticlesFile();
  const index = articles.findIndex((a) => a.id === id);

  if (index === -1) {
    res.writeHead(404, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ code: 404, message: "Article not found" }));
  }

  articles[index] = { ...articles[index], ...updatedData };
  writeArticlesFile(articles);

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(articles[index]));
}

function deleteArticle(id, res) {
  const articles = readArticlesFile();
  const filteredArticles = articles.filter((a) => a.id !== id);

  if (filteredArticles.length === articles.length) {
    res.writeHead(404, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ code: 404, message: "Article not found" }));
  }

  writeArticlesFile(filteredArticles);
  res.writeHead(204);
  res.end("Article Deleted ");
}

module.exports = {
  readAllArticles,
  readArticle,
  createArticle,
  updateArticle,
  deleteArticle,
};
