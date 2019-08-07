const bcrypt = require('bcrypt');
const db = require('../../db');
const logger = require('../../logger');

async function getUserForLoginData(email, password) {
  const { User } = db;
  const user = await User.findOne({ email });

  if (!user) {
    return null;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return null;
  }

  return {
    // eslint-disable-next-line no-underscore-dangle
    id: user._id,
    username: user.email,
    created_at: user.created_at,
  };
}

async function getUser(query) {
  const { User } = db;
  return User.findOne(query);
}

async function getUserById(id) {
  return getUser({ _id: id });
}

async function authByGoogle(profile) {
  const { User } = db;
  let user;
  user = await User.findOne({ email: profile.email });
  if (user) {
    if (user.googleId == null) {
      // Connecting google id to existing user
      logger.info('Setting google id to user %s', user.email);
      user.googleId = profile.id;
      await user.save();
    } else {
      logger.warn('User googleId is not equal to profile.id!');
    }
  } else {
    user = await User.create({
      name: profile.displayName,
      email: profile.email,
      password: '',
      googleId: profile.id,
    });
  }
  return user;
}

module.exports = {
  getUserForLoginData,
  getUserById,
  authByGoogle,
};
