const games = require('./games.json');

exports.list = function*() {
  this.body = games;
};
