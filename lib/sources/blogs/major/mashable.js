
var jDistiller = require('jdistiller').jDistiller,
  Source = require('../../../source').Source;

exports.source = new Source({
  source: "Mashable",
  description: "Mashable covers the top social media news on topics like Facebook, YouTube, Gmail, Twitter, Amazon, Pinterest and More.",
  headlineURL: 'http://mashable.com/tech/',
  headlineDistiller: new jDistiller()
    .set('headlines', 'h1 a', function(element) {
      return [{
        title: element.text().trim(),
        href: element.attr('href')
      }]
    }),
  articleDistiller: new jDistiller()
    .set('title', 'h1.title')
    .set('img', '.article-image img:first', function(element) {
      return element.attr('src');
    })
    .set('body', '.article-content p', function(element, prev) {
      prev.body = prev.body || '';
      prev.body += element.text().trim() + '\n\n';
      return prev.body;
    })
});