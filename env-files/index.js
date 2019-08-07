const path = require('path');
const fs = require('fs')
const dotenv = require('dotenv')

const fileName = `./${process.env.NODE_ENV || 'development'}.env`;
const fullPath = path.resolve(__dirname, fileName);
const env = dotenv.config({
  path: fullPath,
});
const logger = require('../logger');

if (env.error) {
  logger.error('Error loading enviroment files: %s', env.error);
}

const deployedFileName = '.env';
const fullDeployedPath = path.resolve(__dirname, '..', deployedFileName);

try {
  const envConfig = dotenv.parse(fs.readFileSync(fullDeployedPath));
  // eslint-disable-next-line guard-for-in,no-restricted-syntax
  for (const k in envConfig) {
    process.env[k] = envConfig[k];
  }
} catch (e) {
  if (e.code === 'ENOENT') {
    logger.warn('Deployed .env file is missing, skipping.');
  } else {
    logger.error('Error loading environment files: %s', env.error);
  }
}
