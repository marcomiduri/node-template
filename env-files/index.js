const path = require('path');

const fileName = `./${process.env.NODE_ENV || 'development'}.env`;
const fullPath = path.resolve(__dirname, fileName);
const env = require('dotenv').config({
  path: fullPath,
});
const logger = require('../logger');

if (env.error) {
  logger.error('Error loading enviroment files: %s', env.error);
}
