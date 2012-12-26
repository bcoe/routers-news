Routers News
------------------

Routers is a collection of web-crawlers for various popular technology news sources.

It exposes a command-line interface to these crawlers, allowing for the distinguishing tech-news enthusiast to avoid leaving the comfort of their terminal.

It Currently Supports:

* New York Times
* Ars Technica
* USA Today
* L.A. Times
* TechCrunch
* Wired.com
* Github

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

  other:
    Github: Trending and featured repos on Github.com
  news:
  blogs:
    tech:
      TechCrunch: A network of technology-oriented blogs and other web properties.
      Wired.com: Wired magazine is a monthly US technology publication.
    major:
```

__Displaying Headlines__

```bash
routers-news --headlines=github
```

__Outputs__

```bash
routers-news --headlines=github
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
routers-news --article=5 --source=github
```

__Outputs:__

```bash
bcoe / routers-news:


A crawler for various popular tech news sources. Read technology news from the comfort of your CLI.
      — Read more
---------
https://github.com/bcoe/routers-news
```

Contributing
----------

It's easy to add a new news source:

* fork the routers news repo.
* check it out locally (git clone git@github.com:your-username/routers-news.git).
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