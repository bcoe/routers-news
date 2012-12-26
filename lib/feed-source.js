var Source = require('./source').Source,
    util = require('util'),
    _ = require('underscore'),
    jQuery = require('jquery');

function FeedSource(opts) {
  _.extend(this, {
    source: null, // name of the news source, e.g., TechCrunch.
    description: null, // description of news source.
    feedURL: null, // a path to the News feed.,
    type: 'rss', // type of feed, either rss or atom.
    headlineDistiller: new jDistiller()
      .set('headlines', 'item', function(element) {

        // link is a reserved word in HTML, and is
        // collapsed by JSDom into a self-closing
        // element, we can grab the link out by looking
        // for a dangling text node.
        var link = element
          .contents()
          .filter(function() {
            return this.nodeType === 3;
          });

        return [{
          title: element.find('title').text().trim(),
          href: link.text().trim()
        }]
      })
  }, opts);
}

util.inherits(FeedSource, Source);

// Given an URL from the headline listing, load the article:
//
// {
//  title: 'More Cats than Ever Using iPads',
//  body: 'in a recent study it has been shown that more owners are...',
//  img: 'http://techcrunch.com/cats.jpg'
// }
//
FeedSource.prototype.loadArticle = function(headline, callback) {

  var articleDistiller = new jDistiller()
    .set('articles', 'item', function(element) {
      
      var title = element.find('title').text().trim();

      // Only return the article requested.
      if (title !== headline.title) return;

      var innerElement = jQuery( '<div>' + element.find('description').text() + '</div>' ),
        body = '';

      // If the content has paragraphs, pull together
      // all the paragraphs.
      innerElement.find('p').each(function() {
        body += jQuery(this).text() + '\n\n';
      });

      // If the content is just text, grab the text.
      if (!body) {
        innerElement.find('*').each(function() {
          body += jQuery(this).text() + ' ';
        });
      }

      var article = {
        title: title,
        body: body
      };

      // If possible, grab a thumbnail image.
      var img = innerElement.find('img:first');
      if (img.length) {
        article.img = img.attr('src');
      }

      return [article];
    });

  articleDistiller.distill(this.feedURL, function(err, distilledPage) {
    if (!distilledPage || !distilledPage.articles.length) {
      callback(new Error('article not found.'));
    } else {
      callback(err, distilledPage.articles.pop());
    }
  });
};

// Use jDistiller to parse a eadline listing for this new source.
//
// [{title: 'More Cats Than Ever Using iPads', href: 'http://techcrunch.com/cats'}, ...]
//
FeedSource.prototype.listHeadlines = function(callback) {
  // headlineDistiller must be created in subclass.
  this.headlineDistiller.distill(this.feedURL, function(err, distilledPage) {
    callback(err, (distilledPage.headlines || []) );
  });
};

exports.FeedSource = FeedSource;
  