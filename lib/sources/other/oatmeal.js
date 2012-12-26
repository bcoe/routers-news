var jDistiller = require('jdistiller').jDistiller,
  FeedSource = require('../../feed-source').FeedSource;

exports.source = new FeedSource({
  source: "Oatmeal",
  description: "Tastes better than stale skittles found under the couch cushions.",
  feedURL: 'http://feeds.feedburner.com/oatmealfeed.atom',
  type: 'atom'
});