const {
  readArticlesFile,
  writeArticlesFile,
} = require("../utills/fileHandler");

const { validateComment } = require("../utills/validator");

function generateId() {
  return Date.now().toString();
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

module.exports = {
  createComment,
};
