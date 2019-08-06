const bcrypt = require('bcrypt');
const db = require('../../db');

async function createUser({ name, username: email, password }) {
  const hashedPass = await bcrypt.hash(password, 5);
  const { User } = db;
  await User.create({
    name,
    email,
    password: hashedPass,
  });
  return {
    email,
    name,
  };
}

module.exports = {
  createUser,
};
