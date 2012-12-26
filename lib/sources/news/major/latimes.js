var jDistiller = require('jdistiller').jDistiller,
  Source = require('../../../source').Source;

exports.source = new Source({
  source: "LATimes",
  description: "The business and culture of our digital lives, from the L.A. Times.",
  headlineURL: 'http://www.latimes.com/business/technology/',
  headlineDistiller: new jDistiller()
    .set('headlines', '.headline a', function(element) {
      return [{
        title: element.text().trim(),
        href: 'http://www.latimes.com' + element.attr('href')
      }]
    }),
  articleDistiller: new jDistiller()
    .set('title', '.story h1')
    .set('img', '.story img:first', function(element) {
        return element.attr('src');
    })
    .set('body', '#story-body-text p', function(element, prev) {
      prev.body = prev.body || '';
      if (element.children().length) return;
      prev.body += element.text().trim() + '\n\n';
      return prev.body;
    })
});