const bcrypt = require('bcrypt');
const db = require('../../db');

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
  const userOld = await User.findOne({ googleId: profile.id });
  if (userOld) {
    return userOld;
  }
  return User.create({
    name: profile.displayName,
    email: profile.email,
    password: '',
    googleId: profile.id,
  });
}

module.exports = {
  getUserForLoginData,
  getUserById,
  authByGoogle,
};
