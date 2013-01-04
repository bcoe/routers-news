
var jDistiller = require('jdistiller').jDistiller,
  Source = require('../../../source').Source;

exports.source = new Source({
  source: "Gizmodo",
  description: "Gizmodo is the go-to authority for gadget news and digital culture.",
  headlineURL: 'http://gizmodo.com/',
  headlineDistiller: new jDistiller()
    .set('headlines', 'h1 a,h2 a,h3 a', function(element) {

      if (element.attr('href').indexOf('gizmodo') === -1) return;

      return [{
        title: element.text(),
        href: element.attr('href')
      }]
    }),
  articleDistiller: new jDistiller()
    .set('title', 'h1')
    .set('img', '#page img:first', function(element) {
      return element.attr('src');
    })
    .set('body', '.post-body p', function(element, prev) {
      prev.body = prev.body || '';
      prev.body += element.text().trim() + '\n\n';
      return prev.body;
    })
});