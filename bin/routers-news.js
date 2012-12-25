#!/usr/bin/env node

var  argv = require('optimist').argv,
  Loader = require('../lib').Loader,
  Source = require('../lib').Source,
  Grabber = require('../lib').Grabber;

if (argv.sources) { // Display al lthe news sources Routers currently parses.

  var loader = new Loader(),
    categories = [{
      name: '\033[1;30mRouters News Sources:\033[m\n',
      data: loader.loadNewsSourcesHierarchical(),
      indent: ''
    }];

  while (categories.length) {
    var category = categories.shift();
    console.log(category.indent + category.name)
    Object.keys(category.data).forEach(function(key) {
      if (category.data[key] instanceof Source) {
        console.log(category.indent + '  ' + category.data[key].source + ': ' + category.data[key].description);
      } else {
        categories.push({
          name: '\033[32m' + key + ':\033[m',
          data: category.data[key],
          indent: category.indent + '  '
        })
      }
    });
  }
} else if (argv.headlines) { // List the headlines for a source.
  var grabber = new Grabber();

  grabber.grabHeadlines((argv.source || argv.headlines), function(err, headlines) {
    if (err) {
      console.log(err.message);
      return;
    }

    for (var i = 0, headline; (headline = headlines[i]) != null; i++) {
      console.log('[' + (i + 1) + ']\t' + headline.title);
      console.log('\t\033[32m' + headline.href + '\033[m\n')
    }
  });
} else if (argv.article) {
  var grabber = new Grabber(),
    index = parseInt(argv.article) - 1;

  grabber.grabHeadlines(argv.source, function(err, headlines) {
    if (err) {
      console.log(err.message);
      return;
    }

    grabber.grabArticle(argv.source, headlines[index].href, function(err, article) {
      
      if (err) {
        console.log(err.message);
        return;
      }

      console.log('\033[1;30m' + article.title + ':\033[m\n\n')
      console.log(article.body + '\n---------' )
      console.log('\033[32m' + headlines[index].href + '\033[m\n')
    });
  });
} else {
  console.log("Usage:\n\
    \trouters-news --sources\tlist the news sources available.\n\
    \trouters-news --headlines=[source]\tlist the headlines for a news source.\n\
    \trouters-news --article=[id] --source=[source]\tload an article by integer id.\n\
  ")
}