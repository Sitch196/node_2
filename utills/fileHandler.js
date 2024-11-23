const fs = require("fs");
const path = require("path");

const ARTICLES_FILE = path.join(__dirname, "..", "articles.json");

function readArticlesFile() {
  try {
    const data = fs.readFileSync(ARTICLES_FILE, "utf8");
    return JSON.parse(data || "[]");
  } catch (error) {
    return [];
  }
}

function writeArticlesFile(articles) {
  fs.writeFileSync(ARTICLES_FILE, JSON.stringify(articles, null, 2), "utf8");
}

function initArticlesFile() {
  if (!fs.existsSync(ARTICLES_FILE)) {
    fs.writeFileSync(ARTICLES_FILE, "[]", "utf8");
  }
}

module.exports = {
  readArticlesFile,
  writeArticlesFile,
  initArticlesFile,
};
