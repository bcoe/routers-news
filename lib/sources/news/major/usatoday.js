var jDistiller = require('jdistiller').jDistiller,
  Source = require('../../../source').Source;

exports.source = new Source({
  source: "USAToday",
  description: "Power up with breaking news on personal technology, electronics, gaming and computers.",
  headlineURL: 'http://www.usatoday.com/tech/',
  headlineDistiller: new jDistiller()
    .set('headlines', '.hero-list-item a', function(element) {
      var title = element.text().split('\r\n')[1].trim();
      return [{
        title: title,
        href: 'http://www.usatoday.com' + element.attr('href') + '?ajax=true'
      }]
    }),
  articleDistiller: new jDistiller()
    .set('title', '.content h1')
    .set('img', '.content img:first', function(element) {
        return element.attr('src');
    })
    .set('body', '.content p', function(element, prev) {
      prev.body = prev.body || '';
      prev.body += element.text().trim() + '\n\n';
      return prev.body;
    })
});