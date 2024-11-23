const { v4: uuidv4 } = require("uuid");
const {
  readArticlesFile,
  writeArticlesFile,
} = require("../utills/fileHandler");
const { validateComment } = require("../utills/validator");

function generateId() {
  return uuidv4();
}

function createComment(commentData, res) {
  if (!validateComment(commentData)) {
    res.writeHead(400, { "Content-Type": "application/json" });
    return res.end(
      JSON.stringify({ code: 400, message: "Invalid comment data" })
    );
  }

  const articles = readArticlesFile();
  const articleIndex = articles.findIndex(
    (a) => a.id === commentData.articleId
  );

  if (articleIndex === -1) {
    res.writeHead(404, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ code: 404, message: "Article not found" }));
  }

  const newComment = {
    ...commentData,
    id: generateId(),
    date: new Date().toISOString(),
  };

  articles[articleIndex].comments.push(newComment);
  writeArticlesFile(articles);

  res.writeHead(201, { "Content-Type": "application/json" });
  res.end(JSON.stringify(newComment));
}

function deleteComment(id, res) {
  const articles = readArticlesFile();

  let commentFound = false;
  const updatedArticles = articles.map((article) => {
    const initialCommentsLength = article.comments.length;
    article.comments = article.comments.filter((comment) => comment.id !== id);

    if (article.comments.length !== initialCommentsLength) {
      commentFound = true;
    }

    return article;
  });

  if (!commentFound) {
    res.writeHead(404, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ code: 404, message: "Comment not found" }));
  }

  writeArticlesFile(updatedArticles);
  res.writeHead(204);
  res.end();
}

module.exports = {
  createComment,
  deleteComment,
};
