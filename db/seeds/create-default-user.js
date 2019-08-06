const bcrypt = require('bcrypt');
const database = require('../index');
const logger = require('../../logger');

const DEFAULT_PASSWORD = 'secret';

const createDefaultUser = async db => {
  const { User } = db;
  const any = await User.findOne();
  if (any) {
    logger.info('Warning: "users" is not empty.');
  } else {
    const hashedPass = await bcrypt.hash(DEFAULT_PASSWORD, 5);
    await User.create({
      name: 'admin admin',
      email: 'admin@argon.com',
      password: hashedPass,
    });
    logger.info('Default user was successfully created.');
  }
};

createDefaultUser(database)
  .catch(error => logger.error('Error inserting default user: %s', error))
  .finally(() => {
    const { mongoose } = database;
    mongoose.disconnect();
  });
