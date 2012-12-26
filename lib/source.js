var _ = require('underscore'),
  crypto = require('crypto');

function Source(opts) {
  _.extend(this, {
    source: null, // name of the news source, e.g., TechCrunch.
    description: null, // description of news source.
    headlineURL: null// URL to fetch headlines from.
  }, opts);
};

// Given an URL from the headline listing, load the article:
//
// {
//  title: 'More Cats than Ever Using iPads',
//  body: 'in a recent study it has been shown that more owners are...',
//  img: 'http://techcrunch.com/cats.jpg'
// }
//
Source.prototype.loadArticle = function(headline, callback) {
  // articleDistiller must be created in subclass.
  this.articleDistiller.distill(headline.href, function(err, distilledPage) {
    callback(err, distilledPage);
  });
};

// Use jDistiller to parse a eadline listing for this new source.
//
// [{title: 'More Cats Than Ever Using iPads', href: 'http://techcrunch.com/cats'}, ...]
//
Source.prototype.listHeadlines = function(callback) {
  // headlineDistiller must be created in subclass.
  this.headlineDistiller.distill(this.headlineURL, function(err, distilledPage) {
    callback(err, (distilledPage.headlines || []) );
  });
};

// Create a hash for the current headline listing.
Source.prototype.hash = function(callback) {
  var _this = this;

  this.listHeadlines(function(err, headlines) {
    
    if (err) {
      callback(err);
      return;
    }

    var hash = crypto.createHash('md5')
     .update(JSON.stringify(headlines))
     .digest('hex');

    callback(null, hash);
  });
};

exports.Source = Source;