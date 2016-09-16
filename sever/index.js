const path = require('path');
const express = require('express');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const bodyParser = require('body-parser');
const db = require('./db');
const searchData = require('./search.json');

const PORT = 8000;

passport.use(new Strategy((username, password, cb) => {
  db.findByUsername(username, (err, user) => {
    if (err) { return cb(err); }
    if (!user) { return cb(null, false); }
    if (user.password !== password) { return cb(null, false); }
    return cb(null, user);
  });
}));

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  db.findById(id, (err, user) => {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

const app = express();

app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());

const renderHtml = loginRequired => (req, res) => {
  if (req.user) return res.sendFile(path.resolve('public/app.html'));
  if (loginRequired) return res.status(400).send('Not found');

  return res.sendFile(path.resolve('public/guest.html'));
};

const apiOK = (results) => ({ status: 200, errors: [], results });
const apiError = (errors) => ({ status: 200, errors, results: [] });

const apiUnexpected = () => ({ status: 200, test: 'test', test2: {} });

app.get('/', renderHtml());
app.get('/about', renderHtml());
app.get('/login', renderHtml());
app.get('/logout', renderHtml());

app.get('/account', renderHtml(true));
app.get('/search', renderHtml(true));
app.get('/search/:id', renderHtml(true));

app.post('/api/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (!user || err) {
      return next(res.json(apiError([{
        code: 401,
        message: 'Unauthorised'
      }])));
    }

    req.logIn(user, err => {
      if (err) { return next(err); }
      res.json(apiOK([{
        'user_id': user.id
      }]));
    });
  })(req, res, next);
});

app.post('/api/logout', (req, res) => {
  req.logout();
  res.json(apiOK([{
    'user': {}
  }]));
});

app.get('/api/user', (req, res, next) => {
  if (!req.user) {
    return res.json(apiError([{
      code: 401,
      message: 'Unauthorised'
    }]));
  }

  return res.json(apiOK([ req.user ]));
});

app.get('/api/search', require('connect-ensure-login').ensureLoggedIn(), (req, res) => {
  // res.json(apiOK(searchData));
  res.json(apiUnexpected());
});

app.get('/api/search/:coords', require('connect-ensure-login').ensureLoggedIn(), (req, res) => {
  res.json(apiOK(searchData.reverse()));
});

app.listen(PORT);

console.log(`Listening on http://localhost:${PORT}`);
