var jDistiller = require('jdistiller').jDistiller,
  FeedSource = require('../../../feed-source').FeedSource;

exports.source = new FeedSource({
  source: "bencoe",
  description: "Code's from the Underground, Ben's blog.",
  feedURL: 'http://bencoe.tumblr.com/rss'
});
