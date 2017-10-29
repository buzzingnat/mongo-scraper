const request = require('supertest');
const mongoose = require(`mongoose`);
// var server = require(`../../server.js`).server;

describe('test database', function () {
  let server, Note, Article, mongoose;
  beforeEach(function () {
    delete require.cache[require.resolve('../../server.js')];
    server = require(`../../server.js`);
    mongoose.connect('mongodb://localhost/testDatabase');
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function() {
      console.log('We are connected to test database!');
      done();
    });
    Note = mongoose.model('Note');
    Article = mongoose.model('Article');
  });
  afterEach(function (done) {
    server.close(done);
    mongoose.connection.db.dropDatabase(function(){
      mongoose.connection.close(done);
    });
    // mongoose.disconnect();
  });
  /*
  // articleController paths
  it(`creates a new article`, function(done) {
    // code
  });
  // noteController paths
  it('responds to /notes/article/:id', function testPath(done) {
  request(server)
    .get('/notes')
    .expect(200, done);
  });
  */
});
