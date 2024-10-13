const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const handlers = require('../lib/handlers');
const app = express();
const port = process.env.PORT || 3000;
const weatherMiddleware = require('../lib/middleware/weather');
const bodyParser = require('body-parser');

// Konfiguracja silnika widoków Handlebars
app.engine(
  'hbs',
  engine({
    layoutsDir: path.join(__dirname, '../views/layouts'),
    extname: '.hbs',
    defaultLayout: 'main',
    helpers: {
      section: function (name, options) {
        if (!this._sections) this._sections = {};
        this._sections[name] = options.fn(this);
        return null;
      },
    },
  })
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../views'));

// Ścieżka do katalogu public
app.use(express.static(path.join(__dirname, '../public')));
app.use(weatherMiddleware);
app.use(bodyParser.urlencoded({ extended: true }));

// Definiowanie trasy głównej
app.get('/', handlers.home);

app.get('/test', (req, res) => {
  res.render('section-test');
});

// Definiowanie trasy /about
app.get('/about', handlers.about);

app.get('/headers', (req, res) => {
  res.type('text/plain');
  const headers = Object.entries(req.headers).map(
    ([key, value]) => `${key}: ${value}`
  );
  res.send(headers.join('\n'));
});

app.get('greeting', (req, res) => {
  res.render('greeting');
});

app.get('/newsletter-signup', handlers.newsletterSignup);
app.post('/newsletter-signup/process', handlers.newsletterSignupProcess);
app.get('/newsletter-signup/thank-you', handlers.newsletterSignupThankYou);
app.get('/newsletter', handlers.newsletter);
app.post('/api/newsletter-signup', handlers.api.newsletterSignup);

// Obsługa błędu 404
app.use(handlers.notFound);

// Obsługa błędu 500
app.use(handlers.serverError);

// Uruchomienie serwera
if (require.main === module) {
  app.listen(port, () => {
    console.log(
      `Express został uruchomiony pod adresem http://localhost:${port}` +
        '; naciśnij Ctrl-C, aby zakończyć.'
    );
  });
} else {
  module.exports = app;
}

// Dodanie prostego logu ścieżki za pomocą __dirname
setTimeout(() => {
  console.log(__dirname);
}, 2000);
