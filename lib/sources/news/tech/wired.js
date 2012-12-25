var jDistiller = require('jdistiller').jDistiller,
  Source = require('../../../source').Source,
  headlineDistiller = new jDistiller()
    .set('headlines', '.headline1 a, .headline2 a', function(element) {
      return [{
        title: element.text(),
        href: element.attr('href')
      }]
    }),
  articleDistiller = new jDistiller()
    .set('title', '.post h1')
    .set('img', '.entry img', function(element) {
        return element.attr('src');
    })
    .set('body', '.entry p');

exports.source = new Source({
  source: "Wired.com",
  pollFrequency: 60000,
  description: "Wired magazine is a monthly US technology publication.",
  headlineURL: 'http://wired.com',
  loadArticle: function(href, callback) {
    articleDistiller.distill(href, function(err, distilledPage) {
      if (err) {
        callback(err);
      } else {
        callback(null, distilledPage);
      }
    });
  },
  listHeadlines: function(callback) {
    headlineDistiller.distill(this.headlineURL, function(err, distilledPage) {
      if (err) {
        callback(err);
      } else {
        callback(null, (distilledPage.headlines || []) );
      }
    });
  }
});