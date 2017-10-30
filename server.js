// npm install --save express-handlebars body-parser cheerio request
const express = require(`express`);
const handlebars = require(`express-handlebars`);
const bodyParser = require(`body-parser`);
const cheerio = require(`cheerio`);
const request = require(`request`);
const config = require(`./config/config`);
const glob = require(`glob`);
const mongoose = require(`mongoose`);

mongoose.Promise = Promise;
mongoose.connect(config.db, {
	keepAlive: 1,
	connectTimeoutMS: 30000,
	reconnectTries: 30,
	reconnectInterval: 5000,
    useMongoClient: true
});
const db = mongoose.connection;
db.on(`error`, () => {
  throw new Error(`unable to connect to database at ` + config.db);
});


const models = glob.sync(config.root + `/app/models/*.js`);
models.forEach(function (model) {
  require(model);
});
const app = express();

module.exports = require(`./config/express`)(app, config);

const server = app.listen(config.port, () => {
  console.log(`Express server listening on port ` + config.port);
});

module.exports = server;
