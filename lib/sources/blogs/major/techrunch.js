
var jDistiller = require('jdistiller').jDistiller,
  Source = require('../../../source').Source;

exports.source = new Source({
  source: "TechCrunch",
  description: "A network of technology-oriented blogs and other web properties.",
  headlineURL: 'http://techcrunch.com',
  headlineDistiller: new jDistiller()
    .set('headlines', 'h2.headline', function(element) {
      return [{
        title: element.text().trim(),
        href: element.find('a').attr('href')
      }]
    }),
  articleDistiller: new jDistiller()
    .set('title', 'h1.headline')
    .set('img', '.wp-post-image', function(element) {
      return element.attr('src');
    })
    .set('body', '.body-copy:first p', function(element, prev) {

      prev.body = prev.body || '';

      // Don't include the text crunchbase bio.
      if ( !element.parents('.leftgreen').length ) {
        prev.body += element.text().trim() + '\n\n';
      }
      
      return prev.body;
    })
});