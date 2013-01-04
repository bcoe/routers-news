Routers News
------------------

Routers is a collection of web-crawlers for various popular technology news sources.

It exposes a command-line interface to these crawlers, allowing for the distinguishing tech-news enthusiast to avoid leaving the comfort of their terminal.

It Currently Supports:

__Technology News Sources__
* Ars Technica
* Wired.com

__Major Technology Blogs__

* TechCrunch
* Mashable
* Gizmodo

__Personal Technology Blogs__

* Codes From The Underground, my blog

__Mainstream News Sources__

* New York Times
* USA Today
* L.A. Times

__Other Random Stuff__

* Github
* The Oatmeal
* xkcd

_(this categorization is loose, please feel free to shuffle stuff around.)_

It's Also An Experiment
------------

It is my hope that, by open-sourcing a collection of news scrapers, a community can be built around building a powerful set of real-time news aggregation tools.


Installation
------------

```bash
npm install routers-news -g
```

Usage
-----

__Listing News Sources__

```bash
routers-news --sources
```

__Outputs__

```bash
Routers News Sources:

  news:
    major:
      NewYorkTimes: The New York Times Bits blog.
      LATimes: The business and culture of our digital lives, from the L.A. Times.
      USAToday: Power up with breaking news on personal technology, electronics, gaming and computers.
    tech:
      Wired.com: Wired magazine is a monthly US technology publication.
      ArsTechnica: Ars Technica is a technology news site catering to PC enthusiasts.
      TechCrunch: A network of technology-oriented blogs and other web properties.
  other:
    Github: Trending and featured repos on Github.com
```

__Displaying Headlines__

```bash
routers-news --source=github
```

__Outputs__

```bash
[1] MacLemon / CongressChecklist
  https://github.com/MacLemon/CongressChecklist

[2] dejan / rails_panel
  https://github.com/dejan/rails_panel

[3] feross / md5-password-cracker.js
  https://github.com/feross/md5-password-cracker.js

[4] shadowsocks / shadowsocks-go
  https://github.com/shadowsocks/shadowsocks-go

[5] bcoe / routers-news
  https://github.com/bcoe/routers-news

[6] andrew / 24pullrequests
  https://github.com/andrew/24pullrequests

[7] nkohari / jwalk
  https://github.com/nkohari/jwalk

[8] lockitron / selfstarter
  https://github.com/lockitron/selfstarter

[9] twitter / bower
  https://github.com/twitter/bower

[10]  Spaceman-Labs / SMPageControl
  https://github.com/Spaceman-Labs/SMPageControl
```

__Loading Articles__

```bash
routers-news --source=github --article=5
```

__Outputs:__

```bash
bcoe / routers-news:


A crawler for various popular tech news sources. Read technology news from the comfort of your CLI.
      — Read more
---------
https://github.com/bcoe/routers-news
```

The Crawlers
----------

The news crawlers used by Routers come in two varieties:

* Page scrapers which use CSS selectors to extract content from news sources.
* RSS/Atom feed parsers, which crawl articles using an RSS or Atom news feed.

Examples of both can be found in the __lib/sources__ directory.

Contributing
----------

It's easy to add a new news source:

* fork the routers news repo.
* clone it locally.
* run __npm install__ to install the libraries locally.
* create a new crawler in the __lib/sources__ directory (everything in this hierarchy is automatically loaded).
* to test your crawler run: __node ./bin/routers-news.js__.

You can also help a ton by:

* reporting when crawlers are broken.
* extending on the crawelrs, I'd love to have:
  * Dates.
  * Authors.
  * Better image extraction.
* improving on the CLI client.

Help make our dreams of a collaborative web-crawler a reality :)

Copyright
---------

Copyright (c) 2012 Benjamin Coe and Joshua Hull and Gabriel Silk. See LICENSE.txt for further details.