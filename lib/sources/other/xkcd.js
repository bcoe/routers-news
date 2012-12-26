var jDistiller = require('jdistiller').jDistiller,
  Source = require('../../source').Source;

exports.source = new Source({
  source: "xkcd",
  description: 'A webcomic of romance and math humor.',
  headlineURL: 'http://xkcd.com/atom.xml',
  headlineDistiller: new jDistiller()
    .set('headlines', 'entry', function(element) {
      return [{
        title: element.find('title').text(),
        href: element.find('link').attr('href')
      }]
    }),
  articleDistiller: new jDistiller()
    .set('title', '#ctitle')
    .set('body', '#comic img', function(element) {
      return element.attr('title');
    })
    .set('img', '#comic img', function(element) {
      return element.attr('src');
    })
});
