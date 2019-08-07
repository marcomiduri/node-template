const { Storage } = require('@google-cloud/storage');
const exec = require('child_process').execSync;

const { GOOGLE_CLOUD_PROJECT } = process.env;
const logger = require('./logger');

const downloadEnvFile = async () => {
  if (!GOOGLE_CLOUD_PROJECT) {
    logger.info('Google Platform not detected.');
  } else {
    logger.info('Running on Google Platform.');
    const bucketName = `${GOOGLE_CLOUD_PROJECT}_envs`;
    logger.info('Bucket name: %s', bucketName);
    try {
      const storage = new Storage();
      await storage
        .bucket(bucketName)
        .file('.env')
        .download({ destination: '.env' });
      logger.info('getEnv.js: .env downloaded successfully');
    } catch (e) {
      if (e.code === 404) {
        logger.warn('.env file is missing in the bucket, ignoring.');
      } else {
        logger.error(`getEnv.js: There was an error: ${JSON.stringify(e, undefined, 2)}`);
      }
    }
  }
};

const run = async () => {
  await downloadEnvFile();

  if (process.env.NODE_ENV === 'production') {
    logger.info('Production environment detected, running gulp to build dist.');
    try {
      exec('npm run gulp build', { stdio: 'inherit' });
    } catch (e) {
      logger.error('Error while building dist: %s', e);
    }
  }
};

run();
