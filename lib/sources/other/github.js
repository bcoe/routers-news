var jDistiller = require('jdistiller').jDistiller,
  Source = require('../../source').Source,
  headlineDistiller = new jDistiller()
    .set('headlines', '#trending-repositories li h3, .ranked-repositories li h3', function(element) {
      return [{
        title: element.text().trim(),
        href: 'https://github.com' + element.find('a:last').attr('href')
      }]
    }),
  articleDistiller = new jDistiller()
    .set('title', '.entry-title', function(element) {
      return element.find('.author').text().trim() + ' / ' + element.find('strong').text().trim();
    })
    .set('body', '#repository_description p');

exports.source = new Source({
  source: "Github",
  description: 'Trending and featured repos on Github.com',
  pollFrequency: 60000,
  headlineURL: 'https://github.com/explore',
  loadArticle: function(href, callback) {
    articleDistiller.distill(href, function(err, distilledPage) {
      if (err) {
        callback(err);
      } else {
        callback(null, distilledPage);
      }
    });
  },
  listHeadlines: function(callback) {
    headlineDistiller.distill(this.headlineURL, function(err, distilledPage) {
      if (err) {
        callback(err);
      } else {
        callback(null, (distilledPage.headlines || []) );
      }
    });
  }
});
