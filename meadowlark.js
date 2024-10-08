const express = require("express");
const expressHandlebars = require("express-handlebars");
const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "handlebars");

app.get("/", (req, res) => {
  res.type("text/plain");
  res.send("Meadowlark Travel");
});

app.get("/about", (req, res) => {
  res.type("text/plain");
  res.send("O Meadowlark Travel");
});

app.use((req, res) => {
  res.type("text/plain");
  res.status(404);
  res.send("404 - not found");
});

app.use((err, req, res, next) => {
  console.error(err.message);
  res.type("text/plain");
  res.status(500);
  res.send("500 - server error");
});

app.listen(port, () =>
  console.log(
    `Express started at: http://localhost:${port}; ` + "press Ctrl-C to exit"
  )
);
