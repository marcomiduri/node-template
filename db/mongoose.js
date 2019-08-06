require('../env-files');

module.exports = {
  development: {
    uri: process.env.DATABASE_URL,
    options: {
      useNewUrlParser: true,
      useCreateIndex: true,
    },
  },
  staging: {
    uri: process.env.DATABASE_URL,
    options: {
      useNewUrlParser: true,
      useCreateIndex: true,
    },
  },
  production: {
    uri: process.env.DATABASE_URL,
    options: {
      useNewUrlParser: true,
      useCreateIndex: true,
    },
  },
  test: {
    uri: process.env.DATABASE_URL,
    options: {
      useNewUrlParser: true,
      useCreateIndex: true,
    },
  },
};
