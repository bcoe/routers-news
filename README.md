Routers News
------------------

A web-crawler for various popular technology news sources. Read tech news from the comfort of your CLI.

Installation
------------

```bash
npm install routers-news
```

Usage
-----

__Listing News Sources__

```bash
node bin/routers-news.js --sources

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
 node bin/routers-news.js --headlines=techcrunch

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
node bin/routers-news.js --article=2 --source=techcrunch

TechCrunch Crunched: Exposing The Latest Tech Trends:

Editor’s note: Yvo Schaap is a 27-year-old entrepreneur from Amsterdam who loves data and code. He’s founder of Directlyrics.com and Fanity.com and has been featured on TechCrunch regarding major security holes or new Google and Facebook products. Follow him on Twitter @yvoschaap.

 TechCrunch has always been the most authoritative news outlet on what’s hot in Silicon Valley regarding startup trends, early and late investments, product launches, celeb founders and, of course, geeky drama. Although some frequently praised startups were eventually exposed as fads (Badgeville, Groupon), others were expertly picked early on (Twitter, Airbnb).

 It’s again time for end-of-year recaps, and I’ve developed research focused on analyzing TechCrunch’s editorial posts, with an aim to expose this year’s trends in tech. And while I was at it, I even went all the way back into the archives from when TechCrunch was launched.

 I analyzed all 106,664 posts made from January 2006 onwards, looking for interesting data hidden in the individual posts. Quickly my focus moved toward mentions – to be more precise, mentions of firms and people throughout time that could imply certain trends. My argument to focus on mentions is that a startup being covered by TechCrunch has a certain value due to its exposure to tech-savvy users, investors and other entrepreneurs. Getting your startup covered is seen as an achievement, hence mentions are a valuable key indicator. And what holds value for startups also holds up for buzzwords, people, brands, products and even old dinosaur tech firms.

 Quantitative data itself is a bit static, so I hereby present my findings as a fun Q&A:

 1. Google, Apple or Microsoft?

 Obviously Apple has been releasing a lot of products the past year. But also Google (with Android) and, more recently, Microsoft’s Windows 8 launch gave TC’s writers lots to write about. Can my data expose whether TC’s writers are Apple fan boys? I’ve grouped every company’s major products together to find out.

 My results show an ongoing attention fight between Google and Apple, where over the past year Google was mentioned 12 percent more often (1626x) compared to Apple (1455x). Microsoft came only close to reaching them in the month of October, when they launched Windows 8 and their Surface tablet, but in total they were mentioned only 48 percent of the time compared to Apple mentions.

 The big three tech firms competing for attention in TechCrunch’s archives.
---------
http://techcrunch.com/2012/12/24/techcrunch-crunched-exposing-the-latest-tech-trends/
```