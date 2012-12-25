var fs = require('fs'),
  _ = require('underscore');

function Loader(opts) {
  _.extend(this, {
    sources: {}
  }, opts);
}; 

Loader.prototype._loadNewsSourcesShared = function(directories, directory, node) {
  fs.readdirSync(directory).forEach(function(source) {
    var path = directory + '/' + source;

    if ( fs.statSync(path).isDirectory() ) {
      directories.push(path)
    } else if (source.indexOf('.js') > -1 ) {
      var requirePath = path.replace('.js', ''),
        source = require(requirePath).source;

      node[source.source.toLowerCase()] = source;
    }
  });
}

Loader.prototype.loadNewsSourcesHierarchical = function() {
  var directories = [__dirname + '/sources'];

  this.sources = {};

  while (directories.length) {

    var directory = directories.pop(),
      node = this._getCurrentNode(directory);

    this._loadNewsSourcesShared(directories, directory, node);
  }

  return this.sources;
};

Loader.prototype._getCurrentNode = function(directory) {
  var node = this.sources;

  directory = directory.replace(__dirname + '/sources', '');

  directory.split('/').forEach(function(key) {
    if (!key.length) return;
    node[key] = node[key] || {};
    node = node[key];
  });

  return node;
};

Loader.prototype.loadNewsSources = function() {
  var directories = [__dirname + '/sources'];

  this.sources = {};

  while (directories.length) {

    var directory = directories.pop();

    this._loadNewsSourcesShared(directories, directory, this.sources);
  }

  return this.sources;
};

exports.Loader = Loader;