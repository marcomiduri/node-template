// const debug = require('debug')('express:login');

async function loadPage(req, res) {
  // Too much info
  // debug('login:loadPage', req, res);
  res.render('pages/login');
}

module.exports = loadPage;
