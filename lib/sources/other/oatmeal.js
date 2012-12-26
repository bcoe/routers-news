var jDistiller = require('jdistiller').jDistiller,
  Source = require('../../source').Source;

exports.source = new Source({
  source: "Oatmeal",
  description: 'Tastes better than stale skittles found under the couch cushions',
  headlineURL: 'http://feeds.feedburner.com/oatmealfeed.atom',
  headlineDistiller: new jDistiller()
    .set('headlines', 'item', function(element) {
      return [{
        title: element.find('title').text(),
        href: element.attr('rdf:about')
      }]
    }),
  articleDistiller: new jDistiller()
    .set('title', 'title', function(element) {
      return element.text();
    })
    .set('body', '.post_body img,.post_body p,.panel img', function(element, prev) {
      prev.body = prev.body || '';

      var newBody = '';

      if (element.is('p')) {
        newBody += element.text();
      } else {
        if (element.attr('alt')) newBody = '[IMG "' + element.attr('alt') + '"]';
        else if (element.attr('id')) newBody = '[IMG "' + element.attr('id') + '"]';
        else newBody = '[IMG ' + element.attr('src') + ']';
      }
      
      if (!newBody) return prev.body;
      
      return (prev.body += newBody + '\n\n');
    })
    .set('img', '#meat img:first', function(element) {
      return element.attr('src');
    })
});
