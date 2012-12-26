var jDistiller = require('jdistiller').jDistiller,
  Source = require('../../../source').Source;

exports.source = new Source({
  source: "Wired.com",
  description: "Wired magazine is a monthly US technology publication.",
  headlineURL: 'http://wired.com',
  headlineDistiller: new jDistiller()
    .set('headlines', '.headline1 a, .headline2 a', function(element) {
      return [{
        title: element.text(),
        href: element.attr('href')
      }]
    }),
  articleDistiller: new jDistiller()
    .set('title', '.post h1')
    .set('img', '.entry img', function(element) {
        return element.attr('src');
    })
    .set('body', '.entry p', function(element, prev) {
      prev.body = prev.body || '';
      prev.body += element.text().trim() + '\n\n';
      return prev.body;
    })
});