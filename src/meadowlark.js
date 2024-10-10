const express = require("express");
const { engine } = require("express-handlebars");

const app = express();
const port = process.env.PORT || 3000;

// Konfiguracja silnika widoków Handlebars
app.engine(
  "hbs",
  engine({
    layoutsDir: __dirname + "/views/layouts", // Ścieżka do układów (layouts)
    extname: ".hbs", // Ustawienie rozszerzenia na .hbs
  })
);
app.set("view engine", "hbs");
app.set("views", __dirname + "/views"); // Ścieżka do folderu z widokami

app.use(express.static(__dirname + "/public"));

// Definiowanie trasy głównej
app.get("/", (req, res) => res.render("home", { layout: "main" }));

// Definiowanie trasy /about
app.get("/about", (req, res) => {
  const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
  res.render("about", { fortune: randomFortune });
});

// Obsługa błędu 404
app.use((req, res) => {
  res.status(404);
  res.render("404");
});

// Obsługa błędu 500
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500);
  res.render("500");
});

// Uruchomienie serwera
app.listen(port, () =>
  console.log(
    `Express started at: http://localhost:${port}; press Ctrl-C to exit`
  )
);

const fortunes = [
  "Pokonaj swoje lęki albo one pokonają Ciebie.",
  "Rzeki potrzebują źródeł",
  "Nie obawiaj się nieznanego.",
  "Oczekuj przyjemnej niespodzianki.",
  "Zawsze szukaj prostego rozwiązania.",
];
