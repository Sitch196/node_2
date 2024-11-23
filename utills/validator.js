function validateArticle(article) {
  return article.title && article.text && article.author;
}

module.exports = { validateArticle };
