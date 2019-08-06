const express = require('express');

const router = express.Router();

const mountRegisterRoutes = require('../controllers/register/routes');
const mountLoginRoutes = require('../controllers/login/routes');
const mountLogoutRoutes = require('../controllers/logout/routes');
const mountResetPasswordRoutes = require('../controllers/reset-password/routes');
const mountProfileRoutes = require('../controllers/profile/routes');

function isAuthenticated(req, res, next) {
  if (req.user && req.isAuthenticated()) {
    return next();
  }

  return res.redirect('/login');
}

/* GET home page. */
router.get('/', isAuthenticated, (req, res) => {
  res.render('pages/dashboard');
});

mountRegisterRoutes(router);
mountLoginRoutes(router);
mountLogoutRoutes(router, [isAuthenticated]);
mountResetPasswordRoutes(router);
mountProfileRoutes(router, [isAuthenticated]);

module.exports = router;
