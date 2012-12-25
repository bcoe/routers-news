var jDistiller = require('jdistiller').jDistiller,
  Source = require('../../../source').Source;

exports.source = new Source({
  source: "Bits",
  pollFrequency: 60000,
  description: "The New York Times Bits blog.",
  headlineURL: 'http://bits.blogs.nytimes.com',
  headlineDistiller: new jDistiller()
    .set('headlines', '.postHeading', function(element) {

      var href = element.find('a').attr('href');

      if (href.indexOf('bits.blogs.nytimes.com') === -1) return;

      return [{
        title: element.text().trim().replace('|', ''),
        href: href
      }]
    }),
  articleDistiller: new jDistiller()
    .set('title', 'h1:first')
    .set('img', '.image img:first', function(element) {
        return element.attr('src');
    })
    .set('body', '.postContent p', function(element, prev) {
      prev.body = prev.body || '';
      prev.body += element.text().trim() + '\n\n';
      return prev.body;
    })
});