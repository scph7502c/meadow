const express = require("express");
const { engine } = require("express-handlebars");
const path = require("path"); // Importowanie modułu path dla bezpiecznej obsługi ścieżek
const fortune = require("../lib/fortune");
const handlers = require("../lib/handlers");
const app = express();
const port = process.env.PORT || 3000;

// Konfiguracja silnika widoków Handlebars
app.engine(
  "hbs",
  engine({
    layoutsDir: path.join(__dirname, "../views/layouts"), // Ścieżka do układów (layouts)
    extname: ".hbs", // Ustawienie rozszerzenia na .hbs
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../views")); // Ścieżka do folderu z widokami

// Ścieżka do katalogu public
app.use(express.static(path.join(__dirname, "../public"))); // Poprawiona ścieżka do katalogu public

// Definiowanie trasy głównej
app.get("/", handlers.home);

// Definiowanie trasy /about
app.get("/about", handlers.about);

// Obsługa błędu 404
app.use(handlers.notFound);

// Obsługa błędu 500
app.use(handlers.serverError);

// Uruchomienie serwera
if (require.main === module) {
  app.listen(port, () => {
    console.log(
      `Express został uruchomiony pod adresem http://localhost:${port}` +
        "; naciśnij Ctrl-C, aby zakończyć."
    );
  });
} else {
  module.exports = app;
}

// Dodanie prostego logu ścieżki za pomocą __dirname
setTimeout(() => {
  console.log(__dirname);
}, 2000);
