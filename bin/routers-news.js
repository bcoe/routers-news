#!/usr/bin/env node

var exec = require('child_process').exec,
  optimist = require('optimist'),
  Loader = require('../lib').Loader,
  Source = require('../lib').Source,
  Grabber = require('../lib').Grabber;

var argv = optimist
  .options('S', {
    alias: 'sources',
    describe: 'List sources'
  })
  .options('s', {
    alias: 'source',
    describe: 'List articles from a source'
  })
  .options('a', {
    alias: 'article',
    describe: 'Select an article number'
  })
  .options('o', {
    alias: 'output',
    describe: 'Output format: default, json, url'
  })
  .options('O', {
    alias: 'open',
    describe: 'open the article in your browser'
  })
  .argv;

var actions = {
  sources: sources,
  articles: listArticles,
  article: showArticle
};

function sources () {
  var loader = new Loader(),
    categories = [{
      name: '\033[1;30mRouters News Sources:\033[m\n',
      data: loader.loadNewsSourcesHierarchical(),
      indent: ''
    }];

  while (categories.length) {
    var category = categories.pop();
    console.log(category.indent + category.name);
    Object.keys(category.data).forEach(function(key) {
      if (category.data[key] instanceof Source) {
        console.log(category.indent + '  ' + category.data[key].source + ': ' + category.data[key].description);
      } else {
        categories.push({
          name: '\033[32m' + key + ':\033[m',
          data: category.data[key],
          indent: category.indent + '  '
        });
      }
    });
  }
}

function listArticles (source) {
  var grabber = new Grabber();

  grabber.grabHeadlines((source), function(err, headlines) {
    if (err) {
      console.log(err.message);
      return;
    }

    for (var i = 0, headline; (headline = headlines[i]) != null; i++) {
      console.log('[' + (i + 1) + ']\t' + headline.title);
      console.log('\t\033[32m' + headline.href + '\033[m\n');
    }
  });
}

function showArticle (source, index) {
  var grabber = new Grabber();
  index = parseInt(index) - 1;

  grabber.grabHeadlines(source, function(err, headlines) {

    if (err) {
      console.log(err.message);
      return;
    }

    if (!headlines[index]) {
      console.log('headline does not exist.');
      return;
    }

    grabber.grabArticle(source, headlines[index], function(err, article) {

      if (err) {
        console.log(err.message);
        return;
      }

      article.href = headlines[index].href;

      if (argv.open) {
        var command = 'open ' + article.href;
        console.log(command);
        exec(command);
        return;
      }

      if (argv.output === 'json') {
        console.log(JSON.stringify(article));
      } else if (argv.output === 'url') {
        console.log(article.href);
      } else {
        console.log('\033[1;30m' + article.title + ':\033[m');
        if (article.img) console.log('\n[' + article.img + ']');
        console.log('\n' + article.body + '\n---------' );
        console.log('\033[32m' + article.href + '\033[m\n');
      }

    });
  });
}

if (argv.debug) {
  console.log('argv', argv)
}

// Route actions
if (argv.sources) {

  // Display all the news sources Routers currently parses.
  return actions.sources();

} else if (argv.source && !argv.article) {

  // List the headlines for a source.
  return actions.articles(argv.source);

} else if (argv.article) {

  return actions.article(argv.source, argv.article);

} else {

  console.log("Usage:\n\
    \trouters-news --sources\tlist the news sources available.\n\
    \trouters-news --source=[source]\tlist the headlines for a news source.\n\
    \trouters-news --source=[source] --article=[id]\tload an article by integer id.\n\
  ");

}