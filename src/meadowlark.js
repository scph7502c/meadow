const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const handlers = require('../lib/handlers');
const app = express();
const port = process.env.PORT || 3000;
const weatherMiddleware = require('../lib/middleware/weather');
const bodyParser = require('body-parser');
const multiparty = require('multiparty');
const { credentials } = require('../config');
const cookieParser = require('cookie-parser');
// Handlebars View Engine Configuration
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

app.use(express.static(path.join(__dirname, '../public')));

app.use(weatherMiddleware);

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', handlers.home);

app.get('/test', (req, res) => {
  res.render('section-test');
});

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

app.get('/contest/vacation-photo', (req, res) => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  res.render('contest/vacation-photo', {
    year: currentYear,
    month: currentMonth,
  });
});

app.post('/contest/vacation-photo/:year/:month', (req, res) => {
  const form = new multiparty.Form();
  form.parse(req, (err, fields, files) => {
    if (err) return res.status(500).send({ error: err.message });
    handlers.vacationPhotoContestProcess(req, res, fields, files);
  });
});

app.use(handlers.notFound);

app.use(handlers.serverError);

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
