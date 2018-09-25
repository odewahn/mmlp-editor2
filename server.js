const express = require("express");
const next = require("next");
var fetch = require("node-fetch");
var buildUrl = require("build-url");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // provides a path to the search endpoint
  // indexer-falcon.sfo.safaribooks.com
  //    var url = buildUrl("http://index-01.qa.falcon.safaribooks.com:8983", {
  // var url = buildUrl("http://indexer-falcon.sfo.safaribooks.com:8983", {

  server.get("/search", (req, res) => {
    var url = buildUrl("http://falcon-app2.prod.safaribooks.com:8983", {
      path: "/solr/collection2/select",
      queryParams: req.query
    });
    console.log(url);
    fetch(url)
      .then(res => {
        if (!res.ok) {
          throw res;
        }
        return res.json();
      })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        throw new Error(err);
      });
  });

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`>>>>>> Ready on http://localhost:${port}`);
  });
});
