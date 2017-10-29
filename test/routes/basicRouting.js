var request = require('supertest');
// var server = require(`../../server.js`).server;

describe('loading express', function () {
  var server;
  beforeEach(function () {
    delete require.cache[require.resolve('../../server.js')];
    server = require(`../../server.js`);
  });
  afterEach(function (done) {
    server.close(done);
  });
  // home paths
  it('responds to /', function testSlash(done) {
  request(server)
    .get('/')
    .expect(200, done);
  });
  // noteController paths
  it('responds to /notes', function testPath(done) {
  request(server)
    .get('/notes')
    .expect(200, done);
  });
  it('responds to /populatedArticles', function testPath(done) {
  request(server)
    .get('/populatedArticles')
    .expect(200, done);
  });
  // failing path
  it('404 everything else', function testPath(done) {
    request(server)
      .get('/foo/bar')
      .expect(404, done);
  });
});
