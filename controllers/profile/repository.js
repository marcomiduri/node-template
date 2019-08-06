const db = require('../../db');

async function getUser(id) {
  const { User } = db;
  return User.findById(id, 'email name');
}

async function updateUserInfo({ name, username: email, id }) {
  const { User } = db;
  const user = await User.findByIdAndUpdate()(id, { name, email, updated_at: new Date() });
  return {
    email: user.email,
    name: user.name,
  };
}

module.exports = {
  getUser,
  updateUserInfo,
};
