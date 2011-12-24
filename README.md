Tinchy
======

Uh, so... tinchy
----------------

**tin·chy** _adj._ smaller than tiny.

Yep, it's a ridiculously simple and compact (less than 40 lines) personal URL
shortener that takes fatty URLS and makes them tinchy.

Tinchy urls are in the form of http://domain.com/abc

Dependancies
------------

Just Node 0.6+ and the [Express][express] framework. No database needed, tinchy
persists URLs on the filesystem using JSON, so no database is needed.

I also wrote a [python version][tinchy-py] of Tinchy.

Give it to me in bullets
------------------------

* Personal URL shortener.
* <40 lines of code.
* [Express][express] is the only dependency.
* No database needed, files are persisted to the filesystem as JSON files.
* Good for storing a few thousand personal URLs, if you expect to be storing
tens of thousands then look somewhere else. This is not a bitly clone :).
* Do whatever you want with it.
* I hope it wont blow up but if it does then sorry :(

  [express]: http://expressjs.com/
  [tinchy-py]: https://github.com/davej/tinchy