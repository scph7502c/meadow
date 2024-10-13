const fortune = require('./fortune');
exports.home = (req, res) => res.render('home');

exports.about = (req, res) => {
  res.render('about', { fortune: fortune.getFortune() });
};

exports.notFound = (req, res) => {
  res.render('404');
};

exports.serverError = (err, req, res) => {
  res.render('500');
};

exports.newsletterSignup = (req, res) => {
  res.render('newsletter-signup', { csrf: 'miejsce na token CSRF' });
};

exports.newsletterSignupProcess = (req, res) => {
  console.log('Formularz (z ciągu zapytania): ' + req.query.form);
  console.log('Token CSRF (z ukrytego pola formularza): ' + req.body._csrf);
  console.log('Imię (z widocznego pola formularza): ' + req.body.name);
  console.log('E-mail (z widocznego pola formularza): ' + req.body.email);
  res.redirect(303, '/newsletter-signup/thank-you');
};
exports.newsletterSignupThankYou = (req, res) =>
  res.render('newsletter-signup-thank-you');
exports.newsletter = (req, res) => {
  // W dalszej części książki dowiesz się, czym jest CSRF, a na razie
  // podamy zmyśloną wartość
  res.render('newsletter', { csrf: 'miejsce na token CSRF' });
};
exports.api = {
  newsletterSignup: (req, res) => {
    console.log('Token CSRF (z ukrytego pola formularza): ' + req.body._csrf);
    console.log('Imię (z widocznego pola formularza): ' + req.body.name);
    console.log('E-mail (z widocznego pola formularza): ' + req.body.email);
    res.send({ result: 'success' });
  },
};
