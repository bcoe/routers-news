Routers News
------------------

Routers is a collection of web-crawlers for various popular technology news sources.

It exposes a command-line interface to these crawlers, allowing for the distinguishing tech-news enthusiast to avoid leaving the comfort of their terminal.

It Currently Supports:

* New York Times.
* Ars Technica
* USA Today
* Wired.com
* Github (featured/popular libraries)

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
routers-news --headlines=techcrunch
```

__Outputs__

```bash
[1] China Now Has 1.104B Mobile Users, While Mobile Communications Revenue Totaled $116.26B Over First 11 Months of 2012
    http://techcrunch.com/2012/12/24/china-now-has-1-104b-mobile-users-while-mobile-communications-revenue-totaled-116-26b-over-first-11-months-of-2012/

[2] TechCrunch Crunched: Exposing The Latest Tech Trends
    http://techcrunch.com/2012/12/24/techcrunch-crunched-exposing-the-latest-tech-trends/

[3] Singaporean Maritime Tech Firm Ascenz Gets $482K In Funding From Red Dot Ventures As It Sails Toward The Chinese Market
    http://techcrunch.com/2012/12/24/singaporean-maritime-tech-firm-ascenz-gets-482k-in-funding-from-red-dot-ventures-as-it-sails-toward-the-chinese-market/

[4] Instagram Hit With Class Action Lawsuit Related To Last Week’s Change Of Service Terms
    http://techcrunch.com/2012/12/24/instagram-hit-with-class-action-lawsuit-related-to-last-weeks-change-of-service-terms/
```

__Loading Articles__

```bash
routers-news --article=2 --source=techcrunch
```

__Outputs:__

```bash

TechCrunch Crunched: Exposing The Latest Tech Trends:

Editor’s note: Yvo Schaap is a 27-year-old entrepreneur from Amsterdam who loves data and code. He’s founder of Directlyrics.com and Fanity.com and has been featured on TechCrunch regarding major security holes or new Google and Facebook products. Follow him on Twitter @yvoschaap.
---------
http://techcrunch.com/2012/12/24/techcrunch-crunched-exposing-the-latest-tech-trends/
```

Contribute Why Don't You?
------------------

* Tell us when crawlers are broken.
* Submit new crawlers (look in the sources directory, they're super easy to write.)