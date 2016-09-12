const path = require('path');
const express = require('express');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const bodyParser = require('body-parser');
const db = require('./db');

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

const renderHtml = (req, res) => {
  if (req.user) {
    return res.sendFile(path.resolve('public/app.html'));
  }
  return res.sendFile(path.resolve('public/guest.html'));
};

app.get('/', renderHtml);
app.get('/about', renderHtml);
app.get('/login', renderHtml);
app.get('/logout', renderHtml);
app.get('/account', renderHtml);
app.get('/search', renderHtml);
app.get('/search/:id', renderHtml);

app.post('/api/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (!user || err) {
      return next(res.json({
        status: 401,
        error: [
          'Incorrect password'
        ]
      }));
    }

    req.logIn(user, err => {
      if (err) { return next(err); }
      return res.json({
        status: 200,
        results: [{
          'user_id': user.id
        }]
      });
    });
  })(req, res, next);
});

app.post('/api/logout', (req, res) => {
  req.logout();
  return res.json({
    status: 200,
    results: [{
      'user': {}
    }]
  });
});

app.get('/api/user', require('connect-ensure-login').ensureLoggedIn(), (req, res) => {
  res.json({
    status: 200,
    results: [{
      'user': req.user
    }]
  });
});

app.listen(PORT);

console.log(`Listening on http://localhost:${PORT}`);
