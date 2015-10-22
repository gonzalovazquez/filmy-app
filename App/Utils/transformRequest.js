var _ = require('underscore');
var transform = require('object-key-transform');

function convertToInt(value) {
  if (value === 'N/A') {
    return 0
  } else {
    var replaceComma = value.replace(',','');
    return parseInt(replaceComma);
  }
}

function convertToArray(value){
  return Array.new = value.split(',');
};

function lowerCase(key) {
  return key[0] ? key[0].toLowerCase() + key.slice(1) : key;
};

var transformPayload = function(payload){
      var newPayload =
        _.mapObject(payload, function(val, key) {
        key = lowerCase(key);
        if (key === 'year' || key === 'runtime' || key === 'metascore' || key === 'imdbVotes') {
          val = convertToInt(val);
        }
        if (key === 'imdbRating') {
          val = parseFloat(val);
        }
        if (key === 'genre' || key === 'writer' || key === 'actors' || key === 'language') {
          val = convertToArray(val);
        }
        return key, val;
      });
      var interator = function(key) {
        return lowerCase(key);
      }
      transform(newPayload, interator, true);
      return newPayload;
};

module.exports = transformPayload;
