const freeze = require('deep-freeze'),
      copy = require('deepcopy'),
      shortid = require('shortid');

const Default_Square = freeze({
  id: null,
  version: 1,
  size: 10,
  top: null,
  left: null,
  squares: {}
});

exports.create = function*() {
  const new_square = copy(Default_Square);

  new_square.id = shortid.generate();

  this.body = new_square;
};

exports.getById = function*() {
  this.body = Default_Square;
};

exports.update = function*() {

};
