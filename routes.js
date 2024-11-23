const url = require("url");
const articleController = require("./controllers/articleController");

function handleRoute(req, res) {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  // article routes
  if (pathname === "/api/articles/readall" && method === "GET") {
    return articleController.readAllArticles(res);
  }

  if (pathname === "/api/articles/read" && method === "GET") {
    const id = parsedUrl.query.id;
    return articleController.readArticle(id, res);
  }

  if (pathname === "/api/articles/create" && method === "POST") {
    return handleBodyParsing(req, res, articleController.createArticle);
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ code: 404, message: "Not Found" }));
}

function handleBodyParsing(req, res, callback) {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", () => {
    try {
      const data = JSON.parse(body);
      callback(data, res);
    } catch (error) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ code: 400, message: "Invalid JSON" }));
    }
  });
}

module.exports = { handleRoute };
