function validateArticle(article) {
  return article.title && article.text && article.author;
}

function validateComment(comment) {
  return comment.articleId && comment.text && comment.author;
}
module.exports = { validateArticle, validateComment };
