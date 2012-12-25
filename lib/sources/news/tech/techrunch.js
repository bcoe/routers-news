
var jDistiller = require('jdistiller').jDistiller,
  Source = require('../../../source').Source,
  headlineDistiller = new jDistiller()
    .set('headlines', 'h2.headline', function(element) {
      return [{
        title: element.text().trim(),
        href: element.find('a').attr('href')
      }]
    }),
  articleDistiller = new jDistiller()
    .set('title', 'h1.headline')
    .set('img', '.wp-post-image', function(element) {
      return element.attr('src');
    })
    .set('body', '.body-copy:first p', function(element, prev) {

      if (prev.body) {
        prev.body += ' ';
      } else {
        prev.body = '';
      }

      // Don't include the text crunchbase bio.
      if ( !element.parents('.leftgreen').length ) {
        prev.body += element.text().trim() + '\n\n';
      }
      
      return prev.body;
    });

exports.source = new Source({
  source: "TechCrunch",
  pollFrequency: 60000,
  description: "A network of technology-oriented blogs and other web properties.",
  headlineURL: 'http://techcrunch.com',
  loadArticle: function(href, callback) {
    articleDistiller.distill(href, function(err, distilledPage) {
      callback(err, distilledPage)
    });
  },
  listHeadlines: function(callback) {
    headlineDistiller.distill(this.headlineURL, function(err, distilledPage) {      
      callback(err, distilledPage.headlines);
    });
  }
});