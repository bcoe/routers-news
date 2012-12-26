var jDistiller = require('jdistiller').jDistiller,
  Source = require('../../../source').Source;

exports.source = new Source({
  source: "ArsTechnica",
  description: "Ars Technica is a technology news site catering to PC enthusiasts.",
  headlineURL: 'http://arstechnica.com/',
  headlineDistiller: new jDistiller()
    .set('headlines', '.heading', function(element) {

      var href = element.parents('a').attr('href') || element.find('a').attr('href') || element.attr('href');

      return [{
        title: element.text().trim(),
        href: href
      }]
    }),
  articleDistiller: new jDistiller()
    .set('title', 'h1.heading:first')
    .set('img', 'figure img', function(element) {
        return element.attr('src');
    })
    .set('body', '.article-content p', function(element, prev) {
      prev.body = prev.body || '';
      prev.body += element.text().trim() + '\n\n';
      return prev.body;
    })
});