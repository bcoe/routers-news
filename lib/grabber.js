var _ = require('underscore'),
  Loader = require('./loader').Loader;

function Grabber(opts) {
  _.extend(this, {
    sources: (new Loader()).loadNewsSources()
  }, opts);
}

Grabber.prototype.grabHeadlines = function(source, callback) {
  if (typeof source === 'string') source = source.toLowerCase();
  
  if (!this.sources[source]) {
    callback(new Error('News source ' + source + ' not found.'));
    return;
  }

  this.sources[source].listHeadlines(function(err, headlines) {
    if (!err && (!headlines || !headlines.length)) {
      callback(new Error('failed to list headlines'));
    } else {
      callback(err, headlines);
    }
  });
};

Grabber.prototype.grabArticle = function(source, href, callback) {
  if (typeof source === 'string') source = source.toLowerCase();

  if (!this.sources[source]) {
    callback(new Error('News source ' + source + ' not found.'));
    return;
  }

  this.sources[source].loadArticle(href, function(err, article) {
    if (!err && (!article.title.length || !article.body.length)) {
      callback(new Error('failed to load article'))
    } else {
      callback(err, article);
    }
  });
};

exports.Grabber = Grabber;