var jDistiller = require('jdistiller').jDistiller,
  Source = require('../../../source').Source;

exports.source = new Source({
  source: "FastCoLabs",
  description: "Code + Community by FastCompany",
  headlineURL: 'http://www.fastcolabs.com/',
  headlineDistiller: new jDistiller()
    .set('headlines', 'h1.title,h2.title a', function(element) {

      var href = element.attr('href');
      if (href.indexOf('http://') === -1) {
        href = 'http://www.fastcolabs.com' + href;
      }

      if (href.indexOf('fastcolabs') === -1) {
       return;
      }

      return [{
        title: element.text(),
        href: href
      }]

    }),

  articleDistiller: new jDistiller()
    .set('title', 'h1.title', function(element) {
      return element.text();
    })
    .set('img', 'figure.poster img:first', function(element) {
      var img = element.attr('src');

      if (img.indexOf('http://') === -1) {
        img = 'http://www.fastcolabs.com' + img;
      }

      return img;
    })
    .set('body', 'span.deck,.body', function(element, prev) {
      prev.body = prev.body || '';
      prev.body += element.text().trim() + '\n\n';
      return prev.body;
    })
});