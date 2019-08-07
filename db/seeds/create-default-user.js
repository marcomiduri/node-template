const bcrypt = require('bcrypt');
const database = require('../index');
const logger = require('../../logger');

const DEFAULT_PASSWORD = 'secret';
const DEFAULT_USER = {
  name: 'admin admin',
  email: 'admin@argon.com',
};

const createDefaultUser = async db => {
  const { User } = db;
  const user = await User.findOne({ email: DEFAULT_USER.email });
  if (user) {
    logger.warn('Default user already created. Abort.');
  } else {
    DEFAULT_USER.password = await bcrypt.hash(DEFAULT_PASSWORD, 5);
    await User.create(DEFAULT_USER);
    logger.info('Default user was successfully created.');
  }
};

createDefaultUser(database)
  .catch(error => logger.error('Error inserting default user: %s', error))
  .finally(() => {
    const { mongoose } = database;
    mongoose.disconnect();
  });
