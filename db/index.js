const debug = require('debug')('db:init');
const mongoose = require('mongoose');
const mongooseConfig = require('./mongoose');
const logger = require('../logger');

const config = mongooseConfig[process.env.NODE_ENV];
mongoose.connect(config.uri, config.options);

const db = mongoose.connection;
db.on('error', err => {
  debug('Mongoose error:', err);
  logger.error('Mongoose error: %s', err);
});
db.once('open', () => {
  const info = 'Connected to mongo...';
  debug(info);
  logger.info(info);
});

const User = require('./models/User')(mongoose);

module.exports = {
  mongoose,
  User,
};
