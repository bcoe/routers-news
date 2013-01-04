var jDistiller = require('jdistiller').jDistiller,
  Source = require('../../source').Source;

exports.source = new Source({
  source: "Github",
  description: 'Trending and featured repos on Github.com',
  headlineURL: 'https://github.com/explore',
  headlineDistiller: new jDistiller()
    .set('headlines', '#trending-repositories li h3, .ranked-repositories li h3', function(element) {
      return [{
        title: element.text().trim(),
        href: 'https://github.com' + element.find('a:last').attr('href')
      }]
    }),
  articleDistiller: new jDistiller()
    .set('title', '.entry-title', function(element) {
      return element.find('.author').text().trim() + ' / ' + element.find('strong').text().trim();
    })
    .set('body', '.markdown-body p', function(element, prev) {
      prev.body = prev.body || '';
      prev.body += element.text().trim() + '\n\n';
      return prev.body
    })
});
