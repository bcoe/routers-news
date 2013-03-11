var jDistiller = require('jdistiller').jDistiller,
  Source = require('../../../source').Source;

exports.source = new Source({
  source: "FastCompany",
  description: "Business media brand with a unique editorial focus on innovation in technology, ethical economics, leadership, and design.",
  headlineURL: 'http://www.fastcompany.com/',
  headlineDistiller: new jDistiller()
    .set('headlines', 'h1 a,h2 a', function(element) {

      var href = element.attr('href');
      if (href.indexOf('http://') === -1) {
        href = 'http://www.fastcompany.com' + href;
      }

      if (href.indexOf('fastcompany') === -1) {
       return;
     }

      return [{
        title: element.text(),
        href: href
      }]

    }),

  articleDistiller: new jDistiller()
    .set('title', 'h1', function(element) {
      return element.text();
    })
    .set('img', '.node-poster img:first', function(element) {
      return element.attr('src');
    })
    .set('body', '.node-content', function(element, prev) {
      prev.body = prev.body || '';
      prev.body += element.text().trim() + '\n\n';
      return prev.body;
    })
});