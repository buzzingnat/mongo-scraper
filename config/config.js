const path = require('path');
const rootPath = path.normalize(__dirname + '/..');
const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    root: rootPath,
    app: {
      name: 'mongo-scraper'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/scraperDB'
  },

  test: {
    root: rootPath,
    app: {
      name: 'mongo-scraper'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/mongo-scraper-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'mongo-scraper'
    },
    port: process.env.PORT || 3000,
    db: process.env.MONGODB_URI
  }
};

module.exports = config[env];
