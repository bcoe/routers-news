var jDistiller = require('jdistiller').jDistiller,
  FeedSource = require('../../../feed-source').FeedSource;

exports.source = new FeedSource({
  source: "bencoe",
  description: "Codes from the Underground, Ben's blog.",
  feedURL: 'http://bencoe.tumblr.com/rss'
});
